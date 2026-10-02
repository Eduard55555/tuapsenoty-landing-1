import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { inputCls, inputStyle, uploadImage } from "./contentApi";

export function Field({
  label,
  value,
  onChange,
  multiline,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={`${inputCls} resize-y`}
          style={inputStyle}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} style={inputStyle} />
      )}
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  adminKey,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  adminKey: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const pick = async (f?: File) => {
    if (!f) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await uploadImage(adminKey, f));
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  };

  return (
    <div>
      <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>
        {label}
      </span>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="w-20 h-20 rounded-xl object-cover border" style={{ borderColor: "var(--sand)" }} />
        ) : (
          <div className="w-20 h-20 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--cream)" }}>
            <Icon name="ImageOff" size={22} style={{ color: "var(--muted-foreground)" }} />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={busy}
            className="rounded-lg px-3 py-2 text-sm font-semibold border flex items-center gap-2 disabled:opacity-60"
            style={{ borderColor: "var(--sand)", color: "var(--sea)" }}
          >
            <Icon name={busy ? "Loader2" : "Upload"} size={16} className={busy ? "animate-spin" : ""} />
            {value ? "Заменить фото" : "Загрузить фото"}
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} className="text-xs text-left" style={{ color: "#C0392B" }}>
              Убрать фото
            </button>
          )}
        </div>
        <input
          ref={ref}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            pick(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {err && <p className="text-sm mt-1" style={{ color: "#C0392B" }}>{err}</p>}
    </div>
  );
}

export function SaveBar({ onSave, dirty }: { onSave: () => Promise<void>; dirty: boolean }) {
  const [state, setState] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const save = async () => {
    setState("saving");
    try {
      await onSave();
      setState("ok");
      setTimeout(() => setState("idle"), 2500);
    } catch (e) {
      setMsg((e as Error).message);
      setState("err");
    }
  };

  return (
    <div className="sticky bottom-3 z-10 mt-6">
      <div className="rounded-2xl p-3 flex items-center gap-3 shadow-lg" style={{ backgroundColor: "#fff", border: "1px solid var(--sand)" }}>
        <button
          onClick={save}
          disabled={state === "saving" || !dirty}
          className="rounded-xl px-5 py-3 font-bold text-white flex items-center gap-2 disabled:opacity-50"
          style={{ backgroundColor: "var(--bronze)" }}
        >
          <Icon name={state === "saving" ? "Loader2" : "Save"} size={18} className={state === "saving" ? "animate-spin" : ""} />
          Сохранить на сайте
        </button>
        <span className="text-sm" style={{ color: state === "err" ? "#C0392B" : state === "ok" ? "#2E7D32" : "var(--muted-foreground)" }}>
          {state === "ok" ? "Сохранено! Уже видно на сайте." : state === "err" ? msg : dirty ? "Есть несохранённые изменения" : "Всё сохранено"}
        </span>
      </div>
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-4 sm:p-5 space-y-3" style={{ borderColor: "var(--sand)" }}>
      {children}
    </div>
  );
}

export function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-extrabold text-lg pt-2" style={{ color: "var(--sea)" }}>
      {children}
    </h3>
  );
}
