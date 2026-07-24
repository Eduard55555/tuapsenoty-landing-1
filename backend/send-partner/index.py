import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Отправка заявки «Стать партнёром» в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    company = body.get('company', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': False, 'error': 'name and phone required'})
        }

    lines = [
        "🤝 *Новая заявка на партнёрство!*\n",
        f"👤 *Имя:* {name}",
        f"📞 *Телефон:* {phone}",
    ]
    if company:
        lines.append(f"🏢 *Компания:* {company}")
    if email:
        lines.append(f"📧 *Email:* {email}")
    if message:
        lines.append(f"\n💬 *Сообщение:*\n{message}")

    text = '\n'.join(lines)

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
