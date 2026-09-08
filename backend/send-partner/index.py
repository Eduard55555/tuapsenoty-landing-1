import json

from notify import notify


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

    sent = notify('Заявка на партнёрство — Туапсеноты', text)

    if not sent['telegram'] and not sent['email']:
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': False, 'error': 'delivery failed'})
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, **sent})
    }