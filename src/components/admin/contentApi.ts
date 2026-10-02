import { CONTENT_URL, setContent, type ContentData } from "@/content/siteContent";

export async function saveContent<K extends keyof ContentData>(adminKey: string, key: K, value: ContentData[K]) {
  const res = await fetch(CONTENT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
    body: JSON.stringify({ key, value }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "Не удалось сохранить");
  setContent({ [key]: value } as ContentData);
}

export async function uploadImage(adminKey: string, file: File): Promise<string> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
  const res = await fetch(CONTENT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
    body: JSON.stringify({ action: "upload", contentType: file.type, data: dataUrl }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error || "Не удалось загрузить фото");
  return data.url;
}

export const inputCls = "w-full rounded-xl px-4 py-3 outline-none border";
export const inputStyle = { borderColor: "var(--sand)", color: "var(--warm-dark)" } as const;
