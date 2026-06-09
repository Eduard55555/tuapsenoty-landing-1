import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''Счётчик людей, нашедших Енотыча. GET — узнать число, POST — увеличить на 1.'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if method == 'POST':
        cur.execute('UPDATE finder_counter SET count = count + 1 WHERE id = 1 RETURNING count')
    else:
        cur.execute('SELECT count FROM finder_counter WHERE id = 1')

    row = cur.fetchone()
    count = row[0] if row else 1234

    if method == 'POST':
        conn.commit()

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'count': count}),
    }
