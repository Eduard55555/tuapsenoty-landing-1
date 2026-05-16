"""Склеивает 8 фото енотов в один коллаж 4x2 и сохраняет в S3"""
import os
import io
import json
import boto3
import requests
from PIL import Image

PHOTOS = [
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/61957535-c6fc-42ed-be30-235d0501d01a.png",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/7bd68cbe-1da1-45cf-bafd-0828c44078d6.png",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/d591b894-0720-4afe-9119-19877540c0b0.png",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/489b20a1-045b-4b22-bbd8-f91f8c07cc2b.png",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/26e030b8-8ffc-470b-9422-9d0f8875b67c.png",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/6c3bb954-3b8c-4404-ab87-eaab2dfc4b89.png",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/214a3f64-cbda-49f6-b733-689288c9ff6d.png",
    "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/a3981d6a-4ab5-4b95-88d5-fa6c9f1cf3d2.png",
]

COLS = 4
ROWS = 2
THUMB = 500
GAP = 8
BG_COLOR = (253, 246, 238)


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}, "body": ""}

    images = []
    for url in PHOTOS:
        resp = requests.get(url, timeout=15)
        img = Image.open(io.BytesIO(resp.content)).convert("RGB")
        img = img.resize((THUMB, THUMB), Image.LANCZOS)
        images.append(img)

    w = COLS * THUMB + (COLS + 1) * GAP
    h = ROWS * THUMB + (ROWS + 1) * GAP
    canvas = Image.new("RGB", (w, h), BG_COLOR)

    for idx, img in enumerate(images):
        col = idx % COLS
        row = idx // COLS
        x = GAP + col * (THUMB + GAP)
        y = GAP + row * (THUMB + GAP)
        canvas.paste(img, (x, y))

    buf = io.BytesIO()
    canvas.save(buf, format="JPEG", quality=90)
    buf.seek(0)

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    key = "collage/family.jpg"
    s3.put_object(Bucket="files", Key=key, Body=buf.read(), ContentType="image/jpeg")

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
        "body": json.dumps({"url": cdn_url}),
    }
