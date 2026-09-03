import json
import os
import re
import psycopg2

# rev: 2


def handler(event: dict, context) -> dict:
    '''Счётчик переходов на страницу персонажа. GET — узнать число, POST — увеличить на 1, PUT — админ меняет значение (нужен пароль X-Admin-Key). Параметр slug обязателен.'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method == 'PUT':
        headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
        admin_key = headers.get('x-admin-key', '')
        if not admin_key or admin_key != os.environ.get('NEWSLETTER_ADMIN_KEY'):
            return {
                'statusCode': 403,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'forbidden'}),
            }
        body = json.loads(event.get('body') or '{}')
        slug = str(body.get('slug', ''))
        if not re.fullmatch(r'[a-z0-9_-]{1,50}', slug):
            return {
                'statusCode': 400,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'invalid slug'}),
            }
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        if 'delta' in body:
            delta = int(body['delta'])
            cur.execute(
                "INSERT INTO character_counters (slug, count, updated_at) VALUES (%s, GREATEST(0, %s), now()) "
                "ON CONFLICT (slug) DO UPDATE SET count = GREATEST(0, character_counters.count + %s), updated_at = now() "
                "RETURNING count, updated_at",
                (slug, delta, delta),
            )
        else:
            value = max(0, int(body.get('count', 0)))
            cur.execute(
                "INSERT INTO character_counters (slug, count, updated_at) VALUES (%s, %s, now()) "
                "ON CONFLICT (slug) DO UPDATE SET count = %s, updated_at = now() "
                "RETURNING count, updated_at",
                (slug, value, value),
            )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'slug': slug, 'count': row[0], 'updated_at': row[1].isoformat() if row[1] else None}),
        }

    params = event.get('queryStringParameters') or {}
    slug = params.get('slug', '')

    if not slug or not re.fullmatch(r'[a-z0-9_-]{1,50}', slug):
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'invalid slug'}),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if method == 'POST':
        cur.execute(
            "INSERT INTO character_counters (slug, count, updated_at) VALUES (%s, 1, now()) "
            "ON CONFLICT (slug) DO UPDATE SET count = character_counters.count + 1, updated_at = now() "
            "RETURNING count, updated_at",
            (slug,),
        )
        row = cur.fetchone()
        conn.commit()
    else:
        cur.execute('SELECT count, updated_at FROM character_counters WHERE slug = %s', (slug,))
        row = cur.fetchone()

    count = row[0] if row else 0
    updated_at = row[1].isoformat() if row and row[1] else None

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'slug': slug, 'count': count, 'updated_at': updated_at}),
    }