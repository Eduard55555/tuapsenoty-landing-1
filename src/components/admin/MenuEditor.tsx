import { useState } from "react";
import Icon from "@/components/ui/icon";
import { DEFAULT_MENU, useContacts, useMenu, type MenuItem } from "@/content/siteContent";
import { inputCls, inputStyle, saveContent } from "./contentApi";
import { Card, Field, SaveBar } from "./EditorKit";

const btn = "rounded-lg p-2 border disabled:opacity-30";

const PAGES: [string, string][] = [
  ["/shop", "Магазин"],
  ["/contests", "Конкурсы"],
  ["/#about", "Главная — О проекте"],
  ["/#characters", "Главная — Персонажи"],
  ["/#news", "Главная — Новости"],
  ["/map", "Карта"],
  ["/gallery", "Галерея"],
  ["/sponsors", "Стать партнёром"],
  ["/delivery", "Доставка и оплата"],
  ["planeta", "Сбор на Planeta.ru"],
  ["/", "Главная"],
];

const STYLES: [NonNullable<MenuItem["style"]>, string][] = [
  ["auto", "Обычная (цвет по порядку)"],
  ["support", "Широкая бронзовая с сердечком"],
  ["partner", "Бирюзовая яркая"],
];

export default function MenuEditor({ adminKey }: { adminKey: string }) {
  const initial = useMenu();
  const contacts = useContacts();
  const [items, setItems] = useState<MenuItem[]>(initial);
  const [dirty, setDirty] = useState(false);

  const update = (next: MenuItem[]) => {
    setItems(next);
    setDirty(true);
  };
  const set = (i: number, patch: Partial<MenuItem>) => update(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    update(next);
  };
  const add = () => update([...items, { id: Date.now().toString(36), label: "Новая кнопка", href: "/", style: "auto" }]);

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Кнопки меню вверху сайта. Меняйте название, куда ведёт кнопка, порядок и цвет. После изменений нажмите «Сохранить».
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={add}
          className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2 text-white"
          style={{ backgroundColor: "var(--sea)" }}
        >
          <Icon name="Plus" size={18} />
          Добавить кнопку
        </button>
        <button
          onClick={() => confirm("Вернуть стандартный набор кнопок?") && update(DEFAULT_MENU)}
          className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2 border"
          style={{ borderColor: "var(--sand)", color: "var(--warm-text)" }}
        >
          <Icon name="RotateCcw" size={18} />
          Как было изначально
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-center py-6" style={{ color: "var(--muted-foreground)" }}>Кнопок нет — меню будет пустым.</p>
      )}

      {items.map((it, i) => {
        const known = PAGES.some(([v]) => v === it.href);
        return (
          <Card key={it.id}>
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold" style={{ color: "var(--sea)" }}>Кнопка {i + 1}</span>
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
                  onClick={() => confirm(`Удалить кнопку «${it.label}»?`) && update(items.filter((_, j) => j !== i))}
                  title="Удалить"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
            <Field label="Название на кнопке" value={it.label} onChange={(v) => set(i, { label: v })} />
            <label className="block">
              <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>Куда ведёт</span>
              <select
                value={known ? it.href : "custom"}
                onChange={(e) => set(i, { href: e.target.value === "custom" ? "https://" : e.target.value })}
                className={inputCls}
                style={inputStyle}
              >
                {PAGES.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
                <option value="custom">Своя ссылка…</option>
              </select>
            </label>
            {!known && (
              <Field label="Своя ссылка" value={it.href} onChange={(v) => set(i, { href: v })} placeholder="https://..." />
            )}
            <label className="block">
              <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>Вид кнопки</span>
              <select
                value={it.style ?? "auto"}
                onChange={(e) => set(i, { style: e.target.value as MenuItem["style"] })}
                className={inputCls}
                style={inputStyle}
              >
                {STYLES.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>
          </Card>
        );
      })}

      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await saveContent(adminKey, "contacts", { ...contacts, menu: items.filter((x) => x.label.trim()) });
          setDirty(false);
        }}
      />
    </div>
  );
}
