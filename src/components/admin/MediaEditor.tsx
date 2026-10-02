import { useState } from "react";
import { useMedia, type Media } from "@/content/siteContent";
import { saveContent } from "./contentApi";
import { Card, GroupTitle, ImageField, ImagesField, MapField, SaveBar } from "./EditorKit";

export default function MediaEditor({ adminKey }: { adminKey: string }) {
  const initial = useMedia();
  const [m, setM] = useState<Media>(initial);
  const [dirty, setDirty] = useState(false);

  const set = <K extends keyof Media>(k: K, v: Media[K]) => {
    setM((p) => ({ ...p, [k]: v }));
    setDirty(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Фото и карты на главной и на странице «Карта». Карты отдельных енотов меняются во вкладке «Еноты».
      </p>

      <GroupTitle>Главная страница</GroupTitle>
      <Card>
        <ImageField label="Круглое фото на главном экране" value={m.hero_image} onChange={(v) => set("hero_image", v)} adminKey={adminKey} />
        <ImageField label="Большое фото в блоке «О проекте»" value={m.about_image} onChange={(v) => set("about_image", v)} adminKey={adminKey} />
      </Card>

      <GroupTitle>Новость про Енотыча</GroupTitle>
      <Card>
        <ImagesField label="Фото" value={m.news_enotych_photos} onChange={(v) => set("news_enotych_photos", v)} adminKey={adminKey} />
        <MapField label="Карта" value={m.news_enotych_map} onChange={(v) => set("news_enotych_map", v)} />
      </Card>

      <GroupTitle>Новость про Ениру с Тыдочкой</GroupTitle>
      <Card>
        <ImagesField label="Фото" value={m.news_enira_photos} onChange={(v) => set("news_enira_photos", v)} adminKey={adminKey} />
        <MapField label="Карта" value={m.news_enira_map} onChange={(v) => set("news_enira_map", v)} />
      </Card>

      <GroupTitle>Страница «Карта»</GroupTitle>
      <Card>
        <MapField label="Общая карта всех енотов" value={m.common_map} onChange={(v) => set("common_map", v)} />
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Список енотов рядом с картой берётся из вкладки «Еноты»: у кого заполнено «Где установлен» — отмечен как «Уже здесь».
        </p>
      </Card>

      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await saveContent(adminKey, "media", m);
          setDirty(false);
        }}
      />
    </div>
  );
}
