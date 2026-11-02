import { inputCls, inputStyle } from "./contentApi";
import { Field } from "./EditorKit";

export const PAGES: [string, string][] = [
  ["/", "Главная"],
  ["/shop", "Магазин"],
  ["/contests", "Конкурсы"],
  ["/#about", "Главная — О проекте"],
  ["/#characters", "Главная — Персонажи"],
  ["/#news", "Главная — Новости"],
  ["/map", "Карта"],
  ["/gallery", "Галерея"],
  ["/sponsors", "Стать партнёром"],
  ["/delivery", "Доставка и оплата"],
  ["/cart", "Корзина"],
  ["planeta", "Сбор на Planeta.ru (из контактов)"],
  ["telegram", "Telegram (из контактов)"],
  ["vk", "ВКонтакте (из контактов)"],
  ["max", "MAX (из контактов)"],
];

export default function LinkPicker({
  value,
  onChange,
  label = "Куда ведёт",
  allowDefault,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  allowDefault?: boolean;
}) {
  const known = PAGES.some(([v]) => v === value) || (allowDefault && !value);
  return (
    <>
      <label className="block">
        <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>{label}</span>
        <select
          value={known ? value : "custom"}
          onChange={(e) => onChange(e.target.value === "custom" ? "https://" : e.target.value)}
          className={inputCls}
          style={inputStyle}
        >
          {allowDefault && <option value="">Как сейчас (не менять)</option>}
          {PAGES.map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
          <option value="custom">Своя ссылка…</option>
        </select>
      </label>
      {!known && <Field label="Своя ссылка" value={value} onChange={onChange} placeholder="https://..." />}
    </>
  );
}
