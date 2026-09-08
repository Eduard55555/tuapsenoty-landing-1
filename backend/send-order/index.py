import json
import os
import re
import smtplib
import urllib.request
from email.mime.text import MIMEText

import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
}


def _esc(v: str) -> str:
    return v.replace("'", "''")


def handler(event: dict, context) -> dict:
    """Приём заявки из магазина: сохраняет заказ в базу, шлёт в Telegram и дублирует на почту."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    name = str(body.get('name', '')).strip()
    phone = str(body.get('phone', '')).strip()
    email = str(body.get('email', '')).strip()
    delivery = str(body.get('delivery', '')).strip()
    address = str(body.get('address', '')).strip()
    items = body.get('items', [])
    total = int(body.get('total', 0) or 0)

    digits = re.sub(r'\D', '', phone)
    if len(name) < 2 or len(digits) < 10 or not items:
        return {
            'statusCode': 400,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': False, 'error': 'invalid data'}),
        }

    order_id = None
    try:
        schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        items_json = _esc(json.dumps(items, ensure_ascii=False))
        cur.execute(
            f"INSERT INTO {schema}.orders (customer_name, phone, email, delivery, address, items, total) "
            f"VALUES ('{_esc(name)}', '{_esc(phone)}', '{_esc(email)}', '{_esc(delivery)}', "
            f"'{_esc(address)}', '{items_json}'::jsonb, {total}) RETURNING id"
        )
        order_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print('DB save error:', repr(e))

    items_text = '\n'.join(
        f"  • {i.get('name', '')} × {i.get('qty', 1)} = {int(i.get('price', 0)) * int(i.get('qty', 1)):,} ₽"
        for i in items
    )

    delivery_text = ''
    if delivery:
        delivery_text += f"🚚 *Доставка:* {delivery}\n"
    if address:
        delivery_text += f"🏠 *Адрес:* {address}\n"

    head = '🦝 *Новая заявка из магазина!*' + (f' №{order_id}' if order_id else '')
    text = (
        f"{head}\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
        f"📧 *Email:* {email}\n"
        f"{delivery_text}\n"
        f"🛒 *Заказ:*\n{items_text}\n\n"
        f"💰 *Итого: {total:,} ₽*"
    )

    last_error = ''
    mail_ok = False
    smtp_email = os.environ.get('SMTP_EMAIL')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    if smtp_email and smtp_password:
        try:
            msg = MIMEText(text.replace('*', ''), 'plain', 'utf-8')
            msg['Subject'] = 'Заявка из магазина Туапсенотов' + (f' №{order_id}' if order_id else '')
            msg['From'] = smtp_email
            msg['To'] = smtp_email
            server = smtplib.SMTP_SSL('smtp.mail.ru', 465, timeout=15)
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, smtp_email, msg.as_string())
            server.quit()
            mail_ok = True
        except Exception as e:
            last_error = str(e)
            print('SMTP error:', repr(e))

    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = '300609957'
    telegram_ok = False
    if token:
        data = json.dumps({'chat_id': chat_id, 'text': text, 'parse_mode': 'Markdown'}).encode()
        req = urllib.request.Request(
            f'https://api.telegram.org/bot{token}/sendMessage',
            data=data,
            headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'},
        )
        try:
            urllib.request.urlopen(req, timeout=3)
            telegram_ok = True
        except Exception as e:
            print('Telegram error:', repr(e))

    if not telegram_ok and not mail_ok and order_id is None:
        return {
            'statusCode': 502,
            'headers': {**CORS, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': False, 'error': last_error}),
        }

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'order_id': order_id, 'telegram': telegram_ok, 'email': mail_ok}),
    }