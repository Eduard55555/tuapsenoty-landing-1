import json
import os
import re
import psycopg2

from notify import notify


def handler(event: dict, context) -> dict:
    """Подписка на новости проекта: сохраняет email в базу и шлёт уведомление в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': False, 'error': 'method not allowed'})}

    body = json.loads(event.get('body', '{}'))
    email = (body.get('email') or '').strip().lower()

    if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email):
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': False, 'error': 'invalid email'})}

    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    is_new = True
    try:
        cur = conn.cursor()
        safe_email = email.replace("'", "''")
        cur.execute(
            f"INSERT INTO {schema}.subscribers (email) VALUES ('{safe_email}') "
            f"ON CONFLICT (email) DO NOTHING RETURNING id"
        )
        is_new = cur.fetchone() is not None
        conn.commit()
        cur.close()
    finally:
        conn.close()

    if is_new:
        notify('Новый подписчик — Туапсеноты', f"📬 Новый подписчик на новости!\n\n📧 {email}")

    return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True})}