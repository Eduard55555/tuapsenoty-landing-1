import { useState } from "react";
import { TEXT_FIELDS, textDefault, useContent } from "@/content/siteContent";
import { saveContent } from "./contentApi";
import { Card, Field, GroupTitle, SaveBar } from "./EditorKit";

const GROUPS = Array.from(new Set(TEXT_FIELDS.map((f) => f.group)));

export default function TextsEditor({ adminKey }: { adminKey: string }) {
  const content = useContent();
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(TEXT_FIELDS.map((f) => [f.key, content.texts?.[f.key] || textDefault(f.key)])),
  );
  const [dirty, setDirty] = useState(false);

  const set = (k: string, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setDirty(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Исправьте текст и нажмите «Сохранить на сайте». Если поле очистить — вернётся исходный текст.
      </p>
      {GROUPS.map((g) => (
        <div key={g} className="space-y-3">
          <GroupTitle>{g}</GroupTitle>
          <Card>
            {TEXT_FIELDS.filter((f) => f.group === g).map((f) => (
              <Field
                key={f.key}
                label={f.label}
                value={values[f.key] ?? ""}
                onChange={(v) => set(f.key, v)}
                multiline={f.multiline}
                rows={f.key === "about_text" ? 12 : 4}
              />
            ))}
          </Card>
        </div>
      ))}
      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await saveContent(adminKey, "texts", values);
          setDirty(false);
        }}
      />
    </div>
  );
}
