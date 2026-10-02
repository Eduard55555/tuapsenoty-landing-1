import { useState } from "react";
import Icon from "@/components/ui/icon";
import { mergeCharacters, useContent, type CharacterOverride } from "@/content/siteContent";
import { saveContent } from "./contentApi";
import { Card, Field, ImageField, SaveBar } from "./EditorKit";

type Form = Required<CharacterOverride>;

export default function CharactersEditor({ adminKey }: { adminKey: string }) {
  const content = useContent();
  const [forms, setForms] = useState<Record<string, Form>>(() =>
    Object.fromEntries(
      mergeCharacters(content.characters).map((c) => [
        c.slug,
        { name: c.name, role: c.role, description: c.description, ritual: c.ritual, location: c.location ?? "", image: c.image },
      ]),
    ),
  );
  const [open, setOpen] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const set = (slug: string, k: keyof Form, v: string) => {
    setForms((p) => ({ ...p, [slug]: { ...p[slug], [k]: v } }));
    setDirty(true);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Нажмите на енота, чтобы изменить его описание, ритуал, место или фото.
      </p>
      {Object.entries(forms).map(([slug, f]) => {
        const isOpen = open === slug;
        return (
          <div key={slug} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--sand)" }}>
            <button onClick={() => setOpen(isOpen ? null : slug)} className="w-full flex items-center gap-3 p-3 text-left">
              <img src={f.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate" style={{ color: "var(--warm-dark)" }}>{f.name}</div>
                <div className="text-sm" style={{ color: "var(--bronze)" }}>{f.role}</div>
              </div>
              <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} />
            </button>
            {isOpen && (
              <div className="px-3 pb-3">
                <Card>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Имя" value={f.name} onChange={(v) => set(slug, "name", v)} />
                    <Field label="Роль в семье" value={f.role} onChange={(v) => set(slug, "role", v)} />
                  </div>
                  <Field label="Описание" value={f.description} onChange={(v) => set(slug, "description", v)} multiline rows={5} />
                  <Field label="Ритуал" value={f.ritual} onChange={(v) => set(slug, "ritual", v)} multiline rows={3} />
                  <Field
                    label="Где установлен (пусто — «Скоро появится в городе»)"
                    value={f.location}
                    onChange={(v) => set(slug, "location", v)}
                    placeholder="Например: Набережная"
                  />
                  <ImageField label="Фото" value={f.image} onChange={(v) => set(slug, "image", v)} adminKey={adminKey} />
                </Card>
              </div>
            )}
          </div>
        );
      })}
      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await saveContent(adminKey, "characters", forms);
          setDirty(false);
        }}
      />
    </div>
  );
}
