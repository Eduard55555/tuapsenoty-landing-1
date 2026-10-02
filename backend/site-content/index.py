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

KEYS = {'texts', 'characters', 'characterList', 'news', 'contests', 'products', 'reviews', 'delivery', 'contacts', 'media'}
TYPES = {'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png'}
MAX_BYTES = 8 * 1024 * 1024


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


def handler(event: dict, context) -> dict:
    """Редактируемый контент сайта: тексты, еноты, новости, конкурсы, магазин, отзывы, контакты, фото и карты. Чтение всем, запись по админ-паролю."""

    method = event.get('httpMethod')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    table = f"{os.environ['MAIN_DB_SCHEMA']}.site_content"

    if method == 'GET':
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        try:
            cur = conn.cursor()
            cur.execute(f"SELECT key, value FROM {table}")
            data = {k: v for k, v in cur.fetchall()}
            cur.close()
        finally:
            conn.close()
        return _resp(200, {'ok': True, 'content': data})

    if method != 'POST':
        return _resp(405, {'ok': False, 'error': 'method'})

    if not _is_admin(event):
        return _resp(403, {'ok': False, 'error': 'forbidden'})

    body = json.loads(event.get('body') or '{}')
    action = body.get('action') or 'save'

    if action == 'upload':
        ctype = body.get('contentType') or ''
        ext = TYPES.get(ctype)
        if not ext:
            return _resp(400, {'ok': False, 'error': 'Только JPG, PNG или WEBP'})
        raw = base64.b64decode((body.get('data') or '').split(',')[-1])
        if len(raw) > MAX_BYTES:
            return _resp(400, {'ok': False, 'error': 'Файл больше 8 МБ'})
        key = f"content/{uuid.uuid4().hex}.{ext}"
        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )
        s3.put_object(Bucket='files', Key=key, Body=raw, ContentType=ctype)
        url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
        return _resp(200, {'ok': True, 'url': url})

    key = body.get('key')
    if key not in KEYS:
        return _resp(400, {'ok': False, 'error': 'unknown key'})
    value = json.dumps(body.get('value'), ensure_ascii=False).replace("'", "''")

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {table} (key, value, updated_at) VALUES ('{key}', '{value}'::jsonb, NOW()) "
            f"ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()"
        )
        conn.commit()
        cur.close()
    finally:
        conn.close()
    return _resp(200, {'ok': True})
