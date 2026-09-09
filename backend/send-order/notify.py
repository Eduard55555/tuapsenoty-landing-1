import json
import os
import smtplib
import urllib.request
from email.mime.text import MIMEText

CHAT_ID = '300609957'


def send_telegram(text: str) -> bool:
    """Отправка уведомления в Telegram через мост Albato."""
    hook = os.environ.get('TELEGRAM_WEBHOOK_URL', '').strip()
    if hook:
        payload = json.dumps({'text': text, 'chat_id': CHAT_ID}, ensure_ascii=False).encode()
        req = urllib.request.Request(
            hook,
            data=payload,
            headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'},
        )
        try:
            urllib.request.urlopen(req, timeout=25)
            return True
        except TimeoutError:
            return True
        except Exception as e:
            if 'timed out' in str(e):
                return True
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
    return {'telegram': send_telegram(text), 'email': send_email(subject, text)}