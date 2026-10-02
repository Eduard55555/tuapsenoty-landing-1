import { useState } from "react";
import Icon from "@/components/ui/icon";
import { mergeCharacters, useContent, type Character } from "@/content/siteContent";
import { saveContent } from "./contentApi";
import { AddButton, Card, Field, ImageField, ListToolbar, MapField, SaveBar, moveItem } from "./EditorKit";

const COLORS = [
  "from-amber-100 to-yellow-100",
  "from-rose-100 to-orange-100",
  "from-blue-100 to-teal-100",
  "from-cyan-100 to-blue-100",
  "from-pink-100 to-violet-100",
  "from-green-100 to-emerald-100",
  "from-sky-100 to-indigo-100",
  "from-slate-100 to-gray-100",
];

const translit = (s: string) => {
  const map: Record<string, string> = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ы: "y", э: "e", ю: "yu", я: "ya" };
  return s
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

export default function CharactersEditor({ adminKey }: { adminKey: string }) {
  const content = useContent();
  const [list, setList] = useState<Character[]>(() => mergeCharacters(content).map((c) => ({ ...c, location: c.location ?? "", map: c.map ?? "" })));
  const [open, setOpen] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const update = (next: Character[]) => {
    setList(next);
    setDirty(true);
  };
  const set = (i: number, k: keyof Character, v: string) => update(list.map((c, j) => (j === i ? { ...c, [k]: v } : c)));

  const add = () => {
    const slug = `enot-${Date.now().toString(36)}`;
    update([
      ...list,
      { slug, name: "Новый енот", emoji: "🦝", icon: "Sparkles", role: "", description: "", ritual: "", location: "", color: COLORS[list.length % COLORS.length], image: "", map: "" },
    ]);
    setOpen(slug);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Нажмите на енота, чтобы изменить текст, фото, место и карту. Можно добавить нового енота или удалить.
      </p>
      {list.map((c, i) => {
        const isOpen = open === c.slug;
        return (
          <div key={c.slug} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--sand)" }}>
            <button onClick={() => setOpen(isOpen ? null : c.slug)} className="w-full flex items-center gap-3 p-3 text-left">
              {c.image ? (
                <img src={c.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: "var(--cream)" }}>
                  {c.emoji}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate" style={{ color: "var(--warm-dark)" }}>{c.name}</div>
                <div className="text-sm truncate" style={{ color: "var(--bronze)" }}>
                  {c.role} {c.location ? `· 📍 ${c.location}` : "· скоро"}
                </div>
              </div>
              <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} />
            </button>
            {isOpen && (
              <div className="px-3 pb-3">
                <Card>
                  <ListToolbar
                    title="Порядок и удаление"
                    index={i}
                    total={list.length}
                    onMove={(d) => update(moveItem(list, i, d))}
                    onDelete={() => confirm(`Удалить «${c.name}» с сайта?`) && update(list.filter((_, j) => j !== i))}
                  />
                  <div className="grid sm:grid-cols-[1fr_1fr_90px] gap-3">
                    <Field label="Имя" value={c.name} onChange={(v) => set(i, "name", v)} />
                    <Field label="Роль в семье" value={c.role} onChange={(v) => set(i, "role", v)} />
                    <Field label="Эмодзи" value={c.emoji} onChange={(v) => set(i, "emoji", v)} />
                  </div>
                  <Field label="Описание" value={c.description} onChange={(v) => set(i, "description", v)} multiline rows={5} />
                  <Field label="Ритуал" value={c.ritual} onChange={(v) => set(i, "ritual", v)} multiline rows={3} />
                  <Field
                    label="Где установлен (пусто — «Скоро появится в городе»)"
                    value={c.location ?? ""}
                    onChange={(v) => set(i, "location", v)}
                    placeholder="Например: Набережная"
                  />
                  <MapField label="Карта «Где меня найти»" value={c.map ?? ""} onChange={(v) => set(i, "map", v)} />
                  <ImageField label="Фото" value={c.image} onChange={(v) => set(i, "image", v)} adminKey={adminKey} />
                  <Field
                    label="Видео для «Оживить в AR» (ссылка, необязательно)"
                    value={c.video ?? ""}
                    onChange={(v) => set(i, "video", v)}
                    placeholder="https://...mp4"
                  />
                  <div>
                    <span className="block mb-1 text-sm font-semibold" style={{ color: "var(--warm-text)" }}>
                      Цвет карточки
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => set(i, "color", col)}
                          className={`w-9 h-9 rounded-full bg-gradient-to-br ${col}`}
                          style={{ border: c.color === col ? "3px solid var(--bronze)" : "1px solid var(--sand)" }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Адрес страницы: tuapsenoty.ru/characters/{c.slug}
                  </p>
                </Card>
              </div>
            )}
          </div>
        );
      })}
      <AddButton onClick={add}>Добавить енота</AddButton>
      <SaveBar
        dirty={dirty}
        onSave={async () => {
          const used = new Set<string>();
          const clean = list.map((c) => {
            let slug = c.slug.startsWith("enot-") && c.name.trim() ? translit(c.name) || c.slug : c.slug;
            while (used.has(slug)) slug += "-2";
            used.add(slug);
            return { ...c, slug, map: c.map?.trim() || undefined, video: c.video?.trim() || undefined };
          });
          await saveContent(adminKey, "characterList", clean);
          setList(clean.map((c) => ({ ...c, map: c.map ?? "", location: c.location ?? "" })));
          setDirty(false);
        }}
      />
    </div>
  );
}
