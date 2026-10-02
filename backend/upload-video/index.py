import base64
import json
import os
import urllib.request

import boto3


def handler(event: dict, context) -> dict:
    '''Загружает видео по внешней ссылке в S3-хранилище и возвращает CDN-URL'''
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

    try:
        body = json.loads(event.get('body') or '{}')
    except (ValueError, TypeError):
        body = {}
    params = event.get('queryStringParameters') or {}
    source_url = body.get('source_url') or params.get('source_url')
    key = body.get('key') or params.get('key') or 'videos/clip.mp4'
    action = body.get('action')

    if action in ('chunk', 'finish'):
        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )
        cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        if action == 'chunk':
            idx = int(body.get('index', 0))
            s3.put_object(Bucket='files', Key=f"tmp-chunks/{key}.{idx:04d}", Body=base64.b64decode(body['data']))
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'index': idx})}
        count = int(body.get('count', 0))
        parts = []
        for i in range(count):
            obj = s3.get_object(Bucket='files', Key=f"tmp-chunks/{key}.{i:04d}")
            parts.append(obj['Body'].read())
        data = b''.join(parts)
        s3.put_object(Bucket='files', Key=key, Body=data, ContentType='video/mp4')
        for i in range(count):
            s3.delete_object(Bucket='files', Key=f"tmp-chunks/{key}.{i:04d}")
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'url': cdn_url, 'size': len(data)})}

    if not source_url:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'source_url is required'}),
        }

    req = urllib.request.Request(source_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        data = resp.read()

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=key, Body=data, ContentType='video/mp4')

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'url': cdn_url, 'size': len(data)}),
    }