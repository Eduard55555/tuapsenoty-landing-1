import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''Счётчик людей, нашедших Енотыча. GET — узнать число, POST — увеличить на 1, PUT — админ меняет значение (нужен пароль X-Admin-Key).'''
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
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        if 'delta' in body:
            delta = int(body['delta'])
            cur.execute(
                'UPDATE finder_counter SET count = GREATEST(0, count + %s), updated_at = now() '
                'WHERE id = 1 RETURNING count, updated_at',
                (delta,),
            )
        else:
            value = max(0, int(body.get('count', 0)))
            cur.execute(
                'UPDATE finder_counter SET count = %s, updated_at = now() '
                'WHERE id = 1 RETURNING count, updated_at',
                (value,),
            )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'count': row[0], 'updated_at': row[1].isoformat() if row[1] else None}),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if method == 'POST':
        cur.execute('UPDATE finder_counter SET count = count + 1, updated_at = now() WHERE id = 1 RETURNING count, updated_at')
    else:
        cur.execute('SELECT count, updated_at FROM finder_counter WHERE id = 1')

    row = cur.fetchone()
    count = row[0] if row else 1234
    updated_at = row[1].isoformat() if row and row[1] else None

    if method == 'POST':
        conn.commit()

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'count': count, 'updated_at': updated_at}),
    }