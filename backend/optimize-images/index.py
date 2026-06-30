import json
import os
import io
import urllib.request
import uuid

import boto3
from PIL import Image


def handler(event: dict, context) -> dict:
    '''Скачивает изображения по списку URL, сжимает в WebP и заливает на CDN. Возвращает карту старый_url -> новый_url.'''
    method = event.get('httpMethod', 'POST')
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    urls = body.get('urls') or []
    max_width = int(body.get('max_width', 1000))
    quality = int(body.get('quality', 80))

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    secret_key = os.environ['AWS_SECRET_ACCESS_KEY']

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
    )

    results = {}
    errors = {}

    for url in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=20) as resp:
                raw = resp.read()
            original_size = len(raw)

            img = Image.open(io.BytesIO(raw))
            if img.mode in ('P', 'LA'):
                img = img.convert('RGBA')
            has_alpha = img.mode == 'RGBA'
            if not has_alpha and img.mode != 'RGB':
                img = img.convert('RGB')

            if img.width > max_width:
                ratio = max_width / float(img.width)
                new_h = int(img.height * ratio)
                img = img.resize((max_width, new_h), Image.LANCZOS)

            out = io.BytesIO()
            img.save(out, format='WEBP', quality=quality, method=6)
            data = out.getvalue()

            key = f'opt/{uuid.uuid4().hex}.webp'
            s3.put_object(
                Bucket='files',
                Key=key,
                Body=data,
                ContentType='image/webp',
                CacheControl='public, max-age=31536000, immutable',
            )
            new_url = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{key}'
            results[url] = {
                'new_url': new_url,
                'original_kb': round(original_size / 1024, 1),
                'new_kb': round(len(data) / 1024, 1),
            }
        except Exception as e:
            errors[url] = str(e)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'results': results, 'errors': errors}, ensure_ascii=False),
    }
