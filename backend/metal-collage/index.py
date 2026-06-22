"""Склеивает 3 фото металлического Енотыча в горизонтальный коллаж и сохраняет в S3"""
import os
import io
import json
import boto3
import requests
from PIL import Image

PHOTOS = [
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/8b9ec8f7-4d91-4280-814c-aeabad36d941.jpg",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/8d85eaf0-aa21-4a0f-a0c0-fbccb2e3a7dd.jpg",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/985f599e-0d5f-4226-8dde-c4d8685ececa.jpg",
]

THUMB = 600
GAP = 10
BG_COLOR = (245, 240, 235)


def handler(event: dict, context) -> dict:
    """Собирает коллаж 3x1 из фото металлической фигурки и возвращает CDN-ссылку."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}, "body": ""}

    images = []
    for url in PHOTOS:
        resp = requests.get(url, timeout=20)
        img = Image.open(io.BytesIO(resp.content)).convert("RGB")
        side = min(img.width, img.height)
        left = (img.width - side) // 2
        top = (img.height - side) // 2
        img = img.crop((left, top, left + side, top + side))
        img = img.resize((THUMB, THUMB), Image.LANCZOS)
        images.append(img)

    cols = len(images)
    w = cols * THUMB + (cols + 1) * GAP
    h = THUMB + 2 * GAP
    canvas = Image.new("RGB", (w, h), BG_COLOR)

    for idx, img in enumerate(images):
        x = GAP + idx * (THUMB + GAP)
        canvas.paste(img, (x, GAP))

    buf = io.BytesIO()
    canvas.save(buf, format="JPEG", quality=90)
    buf.seek(0)

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    key = "collage/metal-raccoon.jpg"
    s3.put_object(Bucket="files", Key=key, Body=buf.read(), ContentType="image/jpeg")

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
        "body": json.dumps({"url": cdn_url}),
    }
