import json
import os
import re
import psycopg2


def handler(event: dict, context) -> dict:
    '''Счётчик переходов на страницу персонажа. GET — узнать число, POST — увеличить на 1. Параметр slug обязателен.'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

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
