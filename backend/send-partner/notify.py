import json
import os
import socket
import smtplib
import urllib.parse
import urllib.request
from email.mime.text import MIMEText

CHAT_ID = '300609957'


TELEGRAM_IPS = [
    '149.154.167.220',
    '149.154.167.197',
    '149.154.166.110',
    '149.154.171.5',
    '149.154.175.50',
    '91.108.56.130',
]


def _pin_telegram_dns(ip: str) -> None:
    """Из облака доступны не все адреса Telegram — пробуем конкретный."""
    original = getattr(socket, '_tg_orig_getaddrinfo', None)
    if original is None:
        original = socket.getaddrinfo
        socket._tg_orig_getaddrinfo = original

    def patched(host, port, *args, **kwargs):
        if host == 'api.telegram.org':
            return [(socket.AF_INET, socket.SOCK_STREAM, 6, '', (ip, port))]
        return original(host, port, *args, **kwargs)

    socket.getaddrinfo = patched


def send_telegram(text: str) -> bool:
    """Отправка уведомления в Telegram напрямую через бота."""
    token = os.environ.get('TELEGRAM_BOT_TOKEN', '').strip()
    if token:
        query = urllib.parse.urlencode({'chat_id': CHAT_ID, 'text': text})
        url = f'https://api.telegram.org/bot{token}/sendMessage?{query}'
        for ip in TELEGRAM_IPS:
            _pin_telegram_dns(ip)
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=2) as r:
                    if r.status == 200:
                        return True
            except Exception as e:
                print('Telegram error', ip, repr(e))

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
    tg_ok = send_telegram(text)
    return {'telegram': tg_ok, 'email': send_email(subject, text)}