import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useNews, type NewsItem } from "@/content/siteContent";
import { saveContent } from "./contentApi";
import { Card, Field, ImageField, SaveBar } from "./EditorKit";

const btn = "rounded-lg p-2 border disabled:opacity-30";

export default function NewsEditor({ adminKey }: { adminKey: string }) {
  const initial = useNews();
  const [items, setItems] = useState<NewsItem[]>(initial);
  const [dirty, setDirty] = useState(false);

  const update = (next: NewsItem[]) => {
    setItems(next);
    setDirty(true);
  };
  const set = (i: number, k: keyof NewsItem, v: string) => update(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    update(next);
  };
  const add = () => {
    const month = new Date().toLocaleDateString("ru-RU", { month: "long", year: "numeric" }).replace(" г.", "");
    update([{ id: Date.now().toString(36), emoji: "📰", date: month[0].toUpperCase() + month.slice(1), title: "", text: "" }, ...items]);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Это карточки новостей под большими новостями о енотах на главной. Тексты больших новостей правятся во вкладке «Тексты».
      </p>
      <button
        onClick={add}
        className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2 text-white"
        style={{ backgroundColor: "var(--sea)" }}
      >
        <Icon name="Plus" size={18} />
        Добавить новость
      </button>

      {items.length === 0 && (
        <p className="text-center py-6" style={{ color: "var(--muted-foreground)" }}>Новостей пока нет.</p>
      )}

      {items.map((it, i) => (
        <Card key={it.id}>
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold" style={{ color: "var(--sea)" }}>Новость {i + 1}</span>
            <div className="flex gap-1">
              <button className={btn} style={{ borderColor: "var(--sand)" }} disabled={i === 0} onClick={() => move(i, -1)} title="Выше">
                <Icon name="ArrowUp" size={16} />
              </button>
              <button className={btn} style={{ borderColor: "var(--sand)" }} disabled={i === items.length - 1} onClick={() => move(i, 1)} title="Ниже">
                <Icon name="ArrowDown" size={16} />
              </button>
              <button
                className={btn}
                style={{ borderColor: "#C0392B", color: "#C0392B" }}
                onClick={() => confirm("Удалить эту новость?") && update(items.filter((_, j) => j !== i))}
                title="Удалить"
              >
                <Icon name="Trash2" size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <Field label="Эмодзи" value={it.emoji} onChange={(v) => set(i, "emoji", v)} />
            <Field label="Дата" value={it.date} onChange={(v) => set(i, "date", v)} placeholder="Октябрь 2026" />
          </div>
          <Field label="Заголовок" value={it.title} onChange={(v) => set(i, "title", v)} />
          <Field label="Текст" value={it.text} onChange={(v) => set(i, "text", v)} multiline rows={4} />
          <Field label="Ссылка «Подробнее» (необязательно)" value={it.link ?? ""} onChange={(v) => set(i, "link", v)} placeholder="https://..." />
          <ImageField label="Фото (необязательно)" value={it.image ?? ""} onChange={(v) => set(i, "image", v)} adminKey={adminKey} />
        </Card>
      ))}

      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await saveContent(adminKey, "news", items.filter((x) => x.title.trim() || x.text.trim()));
          setDirty(false);
        }}
      />
    </div>
  );
}
