import json
import os
import socket
import smtplib
import urllib.request
from email.mime.text import MIMEText

CHAT_ID = '300609957'
TELEGRAM_IP = '149.154.167.220'


def _pin_telegram_dns() -> None:
    """Из облака часть адресов Telegram недоступна — направляем запросы на рабочий."""
    if getattr(socket, '_tg_pinned', False):
        return
    original = socket.getaddrinfo

    def patched(host, port, *args, **kwargs):
        if host == 'api.telegram.org':
            return [(socket.AF_INET, socket.SOCK_STREAM, 6, '', (TELEGRAM_IP, port))]
        return original(host, port, *args, **kwargs)

    socket.getaddrinfo = patched
    socket._tg_pinned = True


def send_telegram(text: str) -> bool:
    """Отправка уведомления в Telegram напрямую через бота."""
    token = os.environ.get('TELEGRAM_BOT_TOKEN', '').strip()
    if token:
        _pin_telegram_dns()
        payload = json.dumps({'chat_id': CHAT_ID, 'text': text}, ensure_ascii=False).encode()
        req = urllib.request.Request(
            f'https://api.telegram.org/bot{token}/sendMessage',
            data=payload,
            headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'},
        )
        try:
            urllib.request.urlopen(req, timeout=5)
            return True
        except Exception as e:
            print('Telegram error:', repr(e))

    hook = os.environ.get('TELEGRAM_WEBHOOK_URL', '').strip()
    if hook:
        payload = json.dumps({'text': text, 'chat_id': CHAT_ID}, ensure_ascii=False).encode()
        req = urllib.request.Request(
            hook, data=payload,
            headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'},
        )
        try:
            urllib.request.urlopen(req, timeout=3)
            return True
        except Exception as e:
            print('Webhook error:', repr(e))

    return False


def send_email(subject: str, text: str) -> bool:
    """Дублирование уведомления на почту владельца."""
    smtp_email = os.environ.get('SMTP_EMAIL')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    if not smtp_email or not smtp_password:
        return False
    try:
        msg = MIMEText(text.replace('*', ''), 'plain', 'utf-8')
        msg['Subject'] = subject
        msg['From'] = smtp_email
        msg['To'] = smtp_email
        server = smtplib.SMTP_SSL('smtp.mail.ru', 465, timeout=15)
        server.login(smtp_email, smtp_password)
        server.sendmail(smtp_email, smtp_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print('SMTP error:', repr(e))
        return False


def notify(subject: str, text: str) -> dict:
    """Уведомление владельца по всем доступным каналам."""
    mail_ok = send_email(subject, text)
    return {'telegram': send_telegram(text), 'email': mail_ok}