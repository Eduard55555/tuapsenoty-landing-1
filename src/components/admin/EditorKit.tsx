import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { inputCls, inputStyle, uploadImage } from "./contentApi";
import { normalizeMapUrl } from "@/content/siteContent";

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

export function SaveBar({ onSave, dirty, sticky = true }: { onSave: () => Promise<void>; dirty: boolean; sticky?: boolean }) {
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
    <div className={sticky ? "sticky bottom-3 z-10 mt-6" : "mt-2 mb-6"}>
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

export function ImagesField({
  label,
  value,
  onChange,
  adminKey,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  adminKey: string;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(0);
  const [err, setErr] = useState("");

  const pick = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setErr("");
    const list = Array.from(files);
    setBusy(list.length);
    const urls: string[] = [];
    for (const f of list) {
      try {
        urls.push(await uploadImage(adminKey, f));
      } catch (e) {
        setErr((e as Error).message);
      }
      setBusy((n) => n - 1);
    }
    onChange([...value, ...urls]);
  };

  const move = (i: number, d: number) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };

  return (
    <div>
      <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>
        {label}
      </span>
      {hint && (
        <p className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>
          {hint}
        </p>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {value.map((src, i) => (
          <div key={src + i} className="relative group rounded-xl overflow-hidden border" style={{ borderColor: "var(--sand)" }}>
            <img src={src} alt="" className="w-full aspect-square object-cover" />
            {i === 0 && (
              <span className="absolute top-1 left-1 text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: "var(--bronze)" }}>
                Главное
              </span>
            )}
            <div className="absolute bottom-0 inset-x-0 flex justify-between p-1 bg-black/45">
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="text-white disabled:opacity-30 p-0.5" title="Левее">
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                type="button"
                onClick={() => confirm("Удалить это фото?") && onChange(value.filter((_, j) => j !== i))}
                className="text-white p-0.5"
                title="Удалить"
              >
                <Icon name="Trash2" size={16} />
              </button>
              <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="text-white disabled:opacity-30 p-0.5" title="Правее">
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy > 0}
          className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 text-xs font-semibold disabled:opacity-60"
          style={{ borderColor: "var(--sand)", color: "var(--sea)" }}
        >
          <Icon name={busy ? "Loader2" : "Plus"} size={22} className={busy ? "animate-spin" : ""} />
          {busy ? `Загрузка… ${busy}` : "Добавить"}
        </button>
      </div>
      <input
        ref={ref}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          pick(e.target.files);
          e.target.value = "";
        }}
      />
      {err && <p className="text-sm mt-1" style={{ color: "#C0392B" }}>{err}</p>}
    </div>
  );
}

export function MapField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  const url = normalizeMapUrl(value);
  return (
    <div>
      <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>
        {label}
      </span>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Вставьте ссылку или код карты из Яндекс Карт"
          className={inputCls}
          style={inputStyle}
        />
        {value && (
          <button
            type="button"
            onClick={() => confirm("Убрать карту?") && onChange("")}
            className="rounded-xl px-3 border shrink-0"
            style={{ borderColor: "#C0392B", color: "#C0392B" }}
            title="Убрать карту"
          >
            <Icon name="Trash2" size={16} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-3 mt-1.5">
        {url && (
          <button type="button" onClick={() => setShow((v) => !v)} className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--sea)" }}>
            <Icon name={show ? "EyeOff" : "Eye"} size={14} />
            {show ? "Скрыть карту" : "Показать карту"}
          </button>
        )}
        <details className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          <summary className="cursor-pointer">Как получить ссылку?</summary>
          <p className="mt-1 leading-relaxed">
            Откройте yandex.ru/map-constructor, отметьте точку и нажмите «Сохранить и продолжить» → «Получить код карты» → скопируйте код и вставьте сюда.
            Можно вставить и обычную ссылку на место из Яндекс Карт.
          </p>
        </details>
      </div>
      {show && url && (
        <iframe src={url} width="100%" height="220" frameBorder={0} title={label} className="rounded-xl mt-2 border" style={{ borderColor: "var(--sand)" }} />
      )}
    </div>
  );
}

export function ListToolbar({
  index,
  total,
  onMove,
  onDelete,
  title,
}: {
  index: number;
  total: number;
  onMove: (d: number) => void;
  onDelete: () => void;
  title: string;
}) {
  const btn = "rounded-lg p-2 border disabled:opacity-30";
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-bold truncate" style={{ color: "var(--sea)" }}>
        {title}
      </span>
      <div className="flex gap-1 shrink-0">
        <button className={btn} style={{ borderColor: "var(--sand)" }} disabled={index === 0} onClick={() => onMove(-1)} title="Выше">
          <Icon name="ArrowUp" size={16} />
        </button>
        <button className={btn} style={{ borderColor: "var(--sand)" }} disabled={index === total - 1} onClick={() => onMove(1)} title="Ниже">
          <Icon name="ArrowDown" size={16} />
        </button>
        <button className={btn} style={{ borderColor: "#C0392B", color: "#C0392B" }} onClick={onDelete} title="Удалить">
          <Icon name="Trash2" size={16} />
        </button>
      </div>
    </div>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2 text-white" style={{ backgroundColor: "var(--sea)" }}>
      <Icon name="Plus" size={18} />
      {children}
    </button>
  );
}

export function moveItem<T>(arr: T[], i: number, d: number): T[] {
  const next = [...arr];
  [next[i], next[i + d]] = [next[i + d], next[i]];
  return next;
}
