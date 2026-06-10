import json
import os
import urllib.request
# v6


def handler(event: dict, context) -> dict:
    """Отправка заявки из магазина в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '')
    phone = body.get('phone', '')
    email = body.get('email', '')
    items = body.get('items', [])
    total = body.get('total', 0)

    items_text = '\n'.join(
        f"  • {i['name']} × {i['qty']} = {i['price'] * i['qty']:,} ₽"
        for i in items
    )

    text = (
        f"🦝 *Новая заявка из магазина!*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
        f"📧 *Email:* {email}\n\n"
        f"🛒 *Заказ:*\n{items_text}\n\n"
        f"💰 *Итого: {total:,} ₽*"
    )

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '300609957'

    data = json.dumps({'chat_id': chat_id, 'text': text, 'parse_mode': 'Markdown'}).encode()

    last_error = ''
    sent = False
    for attempt in range(2):
        req = urllib.request.Request(
            f'https://api.telegram.org/bot{token}/sendMessage',
            data=data,
            headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
        )
        try:
            urllib.request.urlopen(req, timeout=5)
            sent = True
            break
        except Exception as e:
            last_error = str(e)

    if not sent:
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': False, 'error': last_error})
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }