import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# v3


def handler(event: dict, context) -> dict:
    """Отправка заявки из магазина на почту владельца"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '')
    phone = body.get('phone', '')
    email = body.get('email', '')
    items = body.get('items', [])
    total = body.get('total', 0)

    items_html = ''.join(
        f"<tr><td style='padding:6px 12px'>{i['name']}</td><td style='padding:6px 12px'>{i['qty']} шт.</td><td style='padding:6px 12px'><b>{i['price'] * i['qty']:,} ₽</b></td></tr>"
        for i in items
    )

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#B8732F">🦝 Новая заявка из магазина Туапсенотов</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
        <tr><td style="padding:6px 12px;color:#888">Имя</td><td style="padding:6px 12px"><b>{name}</b></td></tr>
        <tr style="background:#fdf6ee"><td style="padding:6px 12px;color:#888">Телефон</td><td style="padding:6px 12px"><b>{phone}</b></td></tr>
        <tr><td style="padding:6px 12px;color:#888">Email</td><td style="padding:6px 12px"><b>{email}</b></td></tr>
      </table>
      <h3 style="color:#3d2b1f">Состав заказа:</h3>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee">
        <thead><tr style="background:#f5e6d3"><th style="padding:8px 12px;text-align:left">Товар</th><th style="padding:8px 12px">Кол-во</th><th style="padding:8px 12px">Сумма</th></tr></thead>
        <tbody>{items_html}</tbody>
        <tfoot><tr style="background:#f5e6d3"><td colspan="2" style="padding:8px 12px;font-weight:bold">Итого</td><td style="padding:8px 12px;font-weight:bold;color:#B8732F">{total:,} ₽</td></tr></tfoot>
      </table>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'🦝 Новый заказ от {name} на {total:,} ₽'
    msg['From'] = 'sen555551@mail.ru'
    msg['To'] = 'sen555551@mail.ru'
    msg.attach(MIMEText(html, 'html'))

    smtp = smtplib.SMTP_SSL('smtp.mail.ru', 465)
    smtp.login('sen555551@mail.ru', os.environ['SMTP_PASSWORD'])
    smtp.sendmail('sen555551@mail.ru', 'sen555551@mail.ru', msg.as_string())
    smtp.quit()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }