import json
import os
import qrcode
import boto3
from io import BytesIO

CHARACTERS = [
    "enotych",
    "enofya",
    "tuapsey",
    "enira",
    "tydochka",
    "enovey",
    "enosik",
    "enosha",
]

BASE_URL = "https://tuapsenoty.ru/characters/"


def handler(event: dict, context) -> dict:
    """Генерирует QR-коды для всех персонажей и сохраняет их в хранилище, возвращает ссылки на картинки"""
    method = event.get('httpMethod', 'GET')
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

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=access_key,
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    results = []
    for slug in CHARACTERS:
        url = f"{BASE_URL}{slug}?qr=1"
        qr = qrcode.QRCode(box_size=12, border=2)
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="#2E5C6E", back_color="white")

        buf = BytesIO()
        img.save(buf, format='PNG')
        buf.seek(0)

        key = f"qr/{slug}.png"
        s3.put_object(
            Bucket='files',
            Key=key,
            Body=buf.getvalue(),
            ContentType='image/png',
        )
        cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"
        results.append({'slug': slug, 'target': url, 'qr': cdn_url})

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'qrcodes': results}, ensure_ascii=False),
    }