import json
import os

import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
    'Access-Control-Max-Age': '86400',
}


def _resp(code: int, payload: dict) -> dict:
    return {
        'statusCode': code,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(payload, ensure_ascii=False),
    }


def handler(event: dict, context) -> dict:
    """Список заказов магазина для владельца. Доступ только по админ-паролю."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    headers = event.get('headers') or {}
    admin_key = headers.get('X-Admin-Key') or headers.get('x-admin-key')
    expected_key = os.environ.get('NEWSLETTER_ADMIN_KEY')
    if not expected_key or admin_key != expected_key:
        return _resp(403, {'ok': False, 'error': 'forbidden'})

    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    orders = []
    total_sum = 0
    try:
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, customer_name, phone, email, delivery, address, items, total, created_at "
            f"FROM {schema}.orders ORDER BY created_at DESC LIMIT 300"
        )
        for row in cur.fetchall():
            orders.append({
                'id': row[0],
                'name': row[1],
                'phone': row[2],
                'email': row[3] or '',
                'delivery': row[4] or '',
                'address': row[5] or '',
                'items': row[6] or [],
                'total': row[7],
                'created_at': row[8].isoformat() if row[8] else None,
            })
            total_sum += row[7] or 0
        cur.close()
    finally:
        conn.close()

    return _resp(200, {'ok': True, 'count': len(orders), 'sum': total_sum, 'orders': orders})
