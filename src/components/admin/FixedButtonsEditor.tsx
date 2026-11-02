import { useState } from "react";
import { FIXED_BUTTONS, type ButtonOverride } from "@/content/siteContent";
import { Card, Field, GroupTitle, SaveBar } from "./EditorKit";
import LinkPicker from "./LinkPicker";

const NO_HIDE = ["home_shop_buy", "shop_buy", "subscribe"];

export default function FixedButtonsEditor({
  initial,
  onSave,
}: {
  initial: Record<string, ButtonOverride>;
  onSave: (v: Record<string, ButtonOverride>) => Promise<void>;
}) {
  const [data, setData] = useState<Record<string, ButtonOverride>>(initial);
  const [dirty, setDirty] = useState(false);

  const set = (key: string, patch: Partial<ButtonOverride>) => {
    setData((d) => ({ ...d, [key]: { ...d[key], ...patch } }));
    setDirty(true);
  };

  const groups = [...new Set(FIXED_BUTTONS.map((b) => b.group))];

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Кнопки внутри блоков сайта. Можно поменять надпись, ссылку или скрыть кнопку. Пустое поле — останется стандартный текст.
      </p>
      {groups.map((g) => (
        <div key={g} className="space-y-3">
          <GroupTitle>{g}</GroupTitle>
          {FIXED_BUTTONS.filter((b) => b.group === g).map((b) => {
            const o = data[b.key] ?? {};
            return (
              <Card key={b.key}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-sm" style={{ color: "var(--sea)" }}>{b.place}</span>
                  {!NO_HIDE.includes(b.key) && (
                    <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--warm-text)" }}>
                      <input type="checkbox" checked={!o.hidden} onChange={(e) => set(b.key, { hidden: !e.target.checked })} />
                      Показывать
                    </label>
                  )}
                </div>
                <Field label="Надпись" value={o.label ?? ""} onChange={(v) => set(b.key, { label: v })} placeholder={b.label} />
                {b.href && <LinkPicker value={o.href ?? ""} onChange={(v) => set(b.key, { href: v })} allowDefault />}
              </Card>
            );
          })}
        </div>
      ))}
      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await onSave(data);
          setDirty(false);
        }}
      />
    </div>
  );
}
