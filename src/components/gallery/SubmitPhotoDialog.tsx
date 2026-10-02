import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { compressImage } from "@/lib/compressImage";
import func2url from "../../../backend/func2url.json";

const URL = (func2url as Record<string, string>)["gallery-photos"];

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export default function SubmitPhotoDialog({ open, onOpenChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const reset = () => {
    setPreview("");
    setComment("");
    setError("");
    setDone(false);
    setSending(false);
  };

  const handleOpenChange = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(reset, 200);
  };

  const onFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Нужен файл с фотографией");
      return;
    }
    setError("");
    try {
      setPreview(await compressImage(file));
    } catch {
      setError("Не удалось открыть фото, попробуйте другое");
    }
  };

  const submit = async () => {
    if (!preview) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", image: preview, contentType: "image/jpeg", comment }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Ошибка");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error && e.message !== "Failed to fetch" ? e.message : "Ошибка соединения, попробуйте ещё раз");
    }
    setSending(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md rounded-2xl" style={{ backgroundColor: "#fff" }}>
        {done ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🦝</div>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              Спасибо!
            </h3>
            <p className="font-body mb-6" style={{ color: "#5A3E2B" }}>
              Фото отправлено. После проверки оно появится в галерее.
            </p>
            <button
              onClick={() => handleOpenChange(false)}
              className="btn-bronze px-6 py-3 rounded-full font-body font-semibold text-white"
              style={{ background: "var(--bronze)" }}
            >
              Отлично
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl" style={{ color: "var(--warm-dark)" }}>
                Прислать фото
              </DialogTitle>
              <DialogDescription className="font-body" style={{ color: "#5A3E2B" }}>
                Встретили енота в Туапсе? Поделитесь снимком — после проверки он появится в галерее.
              </DialogDescription>
            </DialogHeader>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />

            {preview ? (
              <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid rgba(184,115,51,0.2)" }}>
                <img src={preview} alt="Ваше фото" className="w-full max-h-72 object-contain" style={{ background: "#f7f1ea" }} />
                <button
                  onClick={() => inputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full text-sm font-body font-semibold bg-white/90"
                  style={{ color: "var(--warm-dark)" }}
                >
                  Заменить
                </button>
              </div>
            ) : (
              <button
                onClick={() => inputRef.current?.click()}
                className="w-full rounded-xl py-10 flex flex-col items-center gap-2 transition-colors hover:bg-orange-50"
                style={{ border: "2px dashed rgba(184,115,51,0.4)", color: "var(--bronze)" }}
              >
                <Icon name="ImagePlus" size={36} />
                <span className="font-body font-semibold">Выбрать фото</span>
              </button>
            )}

            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              placeholder="Комментарий (необязательно): где и какого енота нашли"
              className="font-body"
            />

            {error && <p className="text-sm font-body text-red-600">{error}</p>}

            <button
              onClick={submit}
              disabled={!preview || sending}
              className="w-full py-3 rounded-full font-body font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "var(--bronze)" }}
            >
              {sending ? <Icon name="Loader2" size={18} className="animate-spin" /> : <Icon name="Send" size={18} />}
              {sending ? "Отправляю…" : "Отправить"}
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
