import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Диагностика моста Albato: показывает ответ вебхука на тестовое сообщение."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': ''}

    hook = os.environ.get('TELEGRAM_WEBHOOK_URL', '').strip()
    out = {'hook_set': bool(hook)}

    if hook:
        payload = json.dumps({'text': 'Проверка моста Albato', 'chat_id': '300609957'}, ensure_ascii=False).encode()
        req = urllib.request.Request(
            hook,
            data=payload,
            headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'},
        )
        try:
            with urllib.request.urlopen(req, timeout=4) as r:
                out['status'] = r.status
                out['response'] = r.read().decode('utf-8', 'replace')[:500]
        except Exception as e:
            out['error'] = repr(e)[:300]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps(out, ensure_ascii=False),
    }