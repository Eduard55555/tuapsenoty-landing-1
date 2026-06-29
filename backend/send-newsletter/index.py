import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
import psycopg2


def handler(event: dict, context) -> dict:
    """Рассылка новости всем подписчикам по email. Доступ только по админ-ключу."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = event.get('headers') or {}
    admin_key = headers.get('X-Admin-Key') or headers.get('x-admin-key')
    expected_key = os.environ.get('NEWSLETTER_ADMIN_KEY')
    if not expected_key or admin_key != expected_key:
        return _resp(403, {'ok': False, 'error': 'forbidden'})

    if event.get('httpMethod') == 'GET':
        schema = os.environ['MAIN_DB_SCHEMA']
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        try:
            cur = conn.cursor()
            cur.execute(f"SELECT COUNT(*) FROM {schema}.subscribers")
            count = cur.fetchone()[0]
            cur.close()
        finally:
            conn.close()
        return _resp(200, {'ok': True, 'count': count})

    if event.get('httpMethod') != 'POST':
        return _resp(405, {'ok': False, 'error': 'method not allowed'})

    body = json.loads(event.get('body', '{}'))
    subject = (body.get('subject') or '').strip()
    message = (body.get('message') or '').strip()

    if not subject or not message:
        return _resp(400, {'ok': False, 'error': 'subject and message required'})

    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    emails = []
    try:
        cur = conn.cursor()
        cur.execute(f"SELECT email FROM {schema}.subscribers ORDER BY id")
        emails = [row[0] for row in cur.fetchall()]
        cur.close()
    finally:
        conn.close()

    if not emails:
        return _resp(200, {'ok': True, 'sent': 0, 'failed': 0, 'total': 0})

    smtp_email = os.environ['SMTP_EMAIL']
    smtp_password = os.environ['SMTP_PASSWORD']

    html_body = _build_html(subject, message)

    sent = 0
    failed = 0
    try:
        server = smtplib.SMTP_SSL('smtp.mail.ru', 465, timeout=30)
        server.login(smtp_email, smtp_password)
        for to_email in emails:
            try:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = subject
                msg['From'] = formataddr(('Туапсеноты', smtp_email))
                msg['To'] = to_email
                msg.attach(MIMEText(message, 'plain', 'utf-8'))
                msg.attach(MIMEText(html_body, 'html', 'utf-8'))
                server.sendmail(smtp_email, to_email, msg.as_string())
                sent += 1
            except Exception as e:
                failed += 1
                print(f'Failed to send to {to_email}:', repr(e))
        server.quit()
    except Exception as e:
        print('SMTP connection error:', repr(e))
        return _resp(500, {'ok': False, 'error': 'smtp error', 'sent': sent, 'failed': failed})

    return _resp(200, {'ok': True, 'sent': sent, 'failed': failed, 'total': len(emails)})


def _build_html(subject: str, message: str) -> str:
    safe_message = (
        message.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('\n', '<br>')
    )
    safe_subject = subject.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    return f"""<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:'Nunito',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <tr><td style="background:#2e5c6e;padding:28px 32px;text-align:center;">
          <span style="color:#ffffff;font-size:24px;font-weight:800;letter-spacing:0.5px;">🦝 Туапсеноты</span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;color:#2e5c6e;font-size:22px;line-height:1.3;">{safe_subject}</h1>
          <div style="color:#3a3a3a;font-size:16px;line-height:1.6;">{safe_message}</div>
        </td></tr>
        <tr><td style="padding:20px 32px;background:#f4f1ea;text-align:center;">
          <a href="https://tuapsenoty.ru" style="color:#2e5c6e;font-weight:700;text-decoration:none;font-size:15px;">tuapsenoty.ru</a>
          <p style="margin:12px 0 0;color:#999;font-size:12px;">Вы получили это письмо, потому что подписались на новости проекта Туапсеноты.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


def _resp(status: int, payload: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps(payload),
    }