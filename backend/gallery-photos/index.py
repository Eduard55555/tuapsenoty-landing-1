import base64
import json
import os
import uuid

import boto3
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
    'Access-Control-Max-Age': '86400',
}

MAX_BYTES = 3 * 1024 * 1024
TYPES = {'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png'}


def _resp(code: int, payload: dict) -> dict:
    return {
        'statusCode': code,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(payload, ensure_ascii=False),
    }


def _is_admin(event: dict) -> bool:
    headers = event.get('headers') or {}
    key = headers.get('X-Admin-Key') or headers.get('x-admin-key')
    expected = os.environ.get('NEWSLETTER_ADMIN_KEY')
    return bool(expected) and key == expected


def _s3():
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )


def _esc(value: str) -> str:
    return value.replace("'", "''")


def handler(event: dict, context) -> dict:
    """Фото от посетителей для галереи: приём, список одобренных и модерация владельцем."""

    method = event.get('httpMethod')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    schema = os.environ['MAIN_DB_SCHEMA']
    table = f"{schema}.gallery_submissions"
    params = event.get('queryStringParameters') or {}

    if method == 'GET':
        status = params.get('status') or 'approved'
        if status != 'approved' and not _is_admin(event):
            return _resp(403, {'ok': False, 'error': 'forbidden'})
        if status not in ('approved', 'pending'):
            status = 'approved'
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        try:
            cur = conn.cursor()
            cur.execute(
                f"SELECT id, url, comment, created_at FROM {table} "
                f"WHERE status = '{status}' ORDER BY created_at DESC LIMIT 500"
            )
            rows = cur.fetchall()
            cur.close()
        finally:
            conn.close()
        photos = [
            {'id': r[0], 'url': r[1], 'comment': r[2] or '', 'created_at': r[3].isoformat() if r[3] else None}
            for r in rows
        ]
        if status == 'approved' and not _is_admin(event):
            photos = [{'id': p['id'], 'url': p['url']} for p in photos]
        return _resp(200, {'ok': True, 'photos': photos})

    if method != 'POST':
        return _resp(405, {'ok': False, 'error': 'method not allowed'})

    try:
        body = json.loads(event.get('body') or '{}')
    except (ValueError, TypeError):
        return _resp(400, {'ok': False, 'error': 'bad json'})

    action = body.get('action') or 'submit'

    if action == 'submit':
        image = body.get('image') or ''
        content_type = body.get('contentType') or 'image/jpeg'
        if content_type not in TYPES:
            return _resp(400, {'ok': False, 'error': 'Неподдерживаемый формат'})
        if ',' in image[:100]:
            image = image.split(',', 1)[1]
        try:
            data = base64.b64decode(image)
        except (ValueError, TypeError):
            return _resp(400, {'ok': False, 'error': 'Не удалось прочитать фото'})
        if not data:
            return _resp(400, {'ok': False, 'error': 'Фото не выбрано'})
        if len(data) > MAX_BYTES:
            return _resp(400, {'ok': False, 'error': 'Фото слишком большое'})
        comment = str(body.get('comment') or '').strip()[:500]

        key = f"gallery-submissions/{uuid.uuid4().hex}.{TYPES[content_type]}"
        _s3().put_object(Bucket='files', Key=key, Body=data, ContentType=content_type)
        url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        try:
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO {table} (url, comment) VALUES ('{_esc(url)}', '{_esc(comment)}') RETURNING id"
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
        finally:
            conn.close()
        return _resp(200, {'ok': True, 'id': new_id})

    if action in ('approve', 'reject'):
        if not _is_admin(event):
            return _resp(403, {'ok': False, 'error': 'forbidden'})
        try:
            photo_id = int(body.get('id'))
        except (TypeError, ValueError):
            return _resp(400, {'ok': False, 'error': 'bad id'})
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        try:
            cur = conn.cursor()
            if action == 'approve':
                cur.execute(f"UPDATE {table} SET status = 'approved' WHERE id = {photo_id}")
            else:
                cur.execute(f"SELECT url FROM {table} WHERE id = {photo_id}")
                row = cur.fetchone()
                if row:
                    marker = '/bucket/'
                    if marker in row[0]:
                        _s3().delete_object(Bucket='files', Key=row[0].split(marker, 1)[1])
                    cur.execute(f"DELETE FROM {table} WHERE id = {photo_id}")
            conn.commit()
            cur.close()
        finally:
            conn.close()
        return _resp(200, {'ok': True})

    return _resp(400, {'ok': False, 'error': 'unknown action'})
