import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { LinkButton } from "@/content/siteContent";
import { inputCls, inputStyle } from "./contentApi";
import { Card, Field, SaveBar } from "./EditorKit";
import LinkPicker from "./LinkPicker";

const btn = "rounded-lg p-2 border disabled:opacity-30";

const ICONS: [string, string][] = [
  ["", "Без значка"],
  ["Heart", "Сердце"],
  ["ShoppingCart", "Корзина"],
  ["Store", "Магазин"],
  ["Map", "Карта"],
  ["Images", "Фото"],
  ["Trophy", "Кубок"],
  ["Gift", "Подарок"],
  ["Star", "Звезда"],
  ["Sparkles", "Искры"],
  ["Truck", "Доставка"],
  ["Phone", "Телефон"],
  ["Mail", "Почта"],
  ["Send", "Telegram"],
  ["Users", "ВКонтакте"],
  ["MessageCircle", "MAX / чат"],
  ["ExternalLink", "Внешняя ссылка"],
  ["ArrowRight", "Стрелка"],
];

export default function ButtonListEditor({
  hint,
  initial,
  defaults,
  styles,
  withIcon,
  onSave,
}: {
  hint: string;
  initial: LinkButton[];
  defaults: LinkButton[];
  styles: [string, string][];
  withIcon?: boolean;
  onSave: (items: LinkButton[]) => Promise<void>;
}) {
  const [items, setItems] = useState<LinkButton[]>(initial);
  const [dirty, setDirty] = useState(false);

  const update = (next: LinkButton[]) => {
    setItems(next);
    setDirty(true);
  };
  const set = (i: number, patch: Partial<LinkButton>) => update(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    update(next);
  };
  const add = () => update([...items, { id: Date.now().toString(36), label: "Новая кнопка", href: "/", style: styles[0][0] }]);

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        {hint} Меняйте название, куда ведёт кнопка, порядок и вид. После изменений нажмите «Сохранить».
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
          onClick={() => confirm("Вернуть стандартный набор кнопок?") && update(defaults)}
          className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2 border"
          style={{ borderColor: "var(--sand)", color: "var(--warm-text)" }}
        >
          <Icon name="RotateCcw" size={18} />
          Как было изначально
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-center py-6" style={{ color: "var(--muted-foreground)" }}>Кнопок нет — этот блок будет пустым.</p>
      )}

      {items.map((it, i) => (
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
          <LinkPicker value={it.href} onChange={(v) => set(i, { href: v })} />
          <div className={`grid gap-3 ${withIcon ? "sm:grid-cols-2" : ""}`}>
            <label className="block">
              <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>Вид кнопки</span>
              <select value={it.style ?? styles[0][0]} onChange={(e) => set(i, { style: e.target.value })} className={inputCls} style={inputStyle}>
                {styles.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>
            {withIcon && (
              <label className="block">
                <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>Значок</span>
                <select value={it.icon ?? ""} onChange={(e) => set(i, { icon: e.target.value })} className={inputCls} style={inputStyle}>
                  {ICONS.map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </Card>
      ))}

      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await onSave(items.filter((x) => x.label.trim()));
          setDirty(false);
        }}
      />
    </div>
  );
}
