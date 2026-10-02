import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useProducts } from "@/content/siteContent";
import type { Product } from "@/data/products";
import { saveContent } from "./contentApi";
import { AddButton, Card, Field, ImagesField, ListToolbar, SaveBar, moveItem } from "./EditorKit";

const BADGE_COLORS = ["#4CAF50", "#B8732F", "#8C6B3F", "#2E5C6E", "#E53935", "#7C4DFF"];

export default function ProductsEditor({ adminKey }: { adminKey: string }) {
  const initial = useProducts();
  const [items, setItems] = useState<Product[]>(initial);
  const [open, setOpen] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const update = (next: Product[]) => {
    setItems(next);
    setDirty(true);
  };
  const set = <K extends keyof Product>(i: number, k: K, v: Product[K]) => update(items.map((p, j) => (j === i ? { ...p, [k]: v } : p)));

  const photosOf = (p: Product) => (p.images && p.images.length ? p.images : p.image ? [p.image] : []);
  const setPhotos = (i: number, photos: string[]) =>
    update(items.map((p, j) => (j === i ? { ...p, image: photos[0] ?? "", images: photos.length > 1 ? photos : undefined } : p)));

  const add = () => {
    const id = `product-${Date.now().toString(36)}`;
    update([{ id, name: "Новый товар", price: 1000, emoji: "🦝", image: "", description: "", badge: "Новинка", badgeColor: "#4CAF50" }, ...items]);
    setOpen(id);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Первые три товара показываются на главной странице. Порядок меняется стрелками.
      </p>
      <AddButton onClick={add}>Добавить товар</AddButton>
      {items.map((p, i) => {
        const isOpen = open === p.id;
        const photos = photosOf(p);
        return (
          <div key={p.id} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--sand)" }}>
            <button onClick={() => setOpen(isOpen ? null : p.id)} className="w-full flex items-center gap-3 p-3 text-left">
              {photos[0] ? (
                <img src={photos[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: "var(--cream)" }}>
                  {p.emoji}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate" style={{ color: "var(--warm-dark)" }}>{p.name}</div>
                <div className="text-sm" style={{ color: "var(--bronze)" }}>
                  {p.price.toLocaleString("ru-RU")} ₽{i < 3 ? " · на главной" : ""}
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
                    total={items.length}
                    onMove={(d) => update(moveItem(items, i, d))}
                    onDelete={() => confirm(`Удалить товар «${p.name}»?`) && update(items.filter((_, j) => j !== i))}
                  />
                  <Field label="Название" value={p.name} onChange={(v) => set(i, "name", v)} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="Цена, ₽"
                      value={String(p.price)}
                      onChange={(v) => set(i, "price", Number(v.replace(/\D/g, "")) || 0)}
                    />
                    <Field label="Наличие" value={p.stock ?? ""} onChange={(v) => set(i, "stock", v || undefined)} placeholder="Осталось мало" />
                  </div>
                  <ImagesField
                    label="Фото товара"
                    hint="Первое фото — главное. Можно выбрать сразу несколько."
                    value={photos}
                    onChange={(v) => setPhotos(i, v)}
                    adminKey={adminKey}
                  />
                  <Field label="Описание" value={p.description} onChange={(v) => set(i, "description", v)} multiline rows={10} />
                  <Field
                    label="Сравнение с оригиналом (необязательно)"
                    value={p.compareNote ?? ""}
                    onChange={(v) => set(i, "compareNote", v || undefined)}
                    multiline
                    rows={2}
                  />
                  <div className="grid grid-cols-[1fr_90px] gap-3">
                    <Field label="Наклейка на фото" value={p.badge} onChange={(v) => set(i, "badge", v)} placeholder="Новинка" />
                    <Field label="Эмодзи" value={p.emoji} onChange={(v) => set(i, "emoji", v)} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold mr-1" style={{ color: "var(--warm-text)" }}>Цвет наклейки:</span>
                    {BADGE_COLORS.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => set(i, "badgeColor", col)}
                        className="w-8 h-8 rounded-full"
                        style={{ background: col, outline: p.badgeColor === col ? "3px solid var(--warm-dark)" : "none", outlineOffset: 2 }}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        );
      })}
      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await saveContent(adminKey, "products", items.filter((p) => p.name.trim()));
          setDirty(false);
        }}
      />
    </div>
  );
}
