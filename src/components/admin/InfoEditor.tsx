import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useContacts, useDelivery, useReviews, type Contacts } from "@/content/siteContent";
import type { Review } from "@/data/reviews";
import type { DeliveryFact } from "@/data/delivery";
import { saveContent } from "./contentApi";
import { AddButton, Card, Field, GroupTitle, ListToolbar, SaveBar, moveItem } from "./EditorKit";

const DELIVERY_ICONS = ["Truck", "Clock", "CreditCard", "Wallet", "Package", "MapPin", "Phone", "Gift"];

export default function InfoEditor({ adminKey }: { adminKey: string }) {
  const [contacts, setContacts] = useState<Contacts>(useContacts());
  const [reviews, setReviews] = useState<Review[]>(useReviews());
  const [delivery, setDelivery] = useState<DeliveryFact[]>(useDelivery());
  const [dirty, setDirty] = useState({ c: false, r: false, d: false });

  const setC = (k: keyof Contacts, v: string | string[]) => {
    setContacts((p) => ({ ...p, [k]: v }));
    setDirty((d) => ({ ...d, c: true }));
  };
  const updR = (next: Review[]) => {
    setReviews(next);
    setDirty((d) => ({ ...d, r: true }));
  };
  const updD = (next: DeliveryFact[]) => {
    setDelivery(next);
    setDirty((d) => ({ ...d, d: true }));
  };
  const setR = <K extends keyof Review>(i: number, k: K, v: Review[K]) => updR(reviews.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const setD = (i: number, k: keyof DeliveryFact, v: string) => updD(delivery.map((r, j) => (j === i ? { ...r, [k]: v } : r)));

  return (
    <div className="space-y-4">
      <GroupTitle>📞 Контакты и ссылки</GroupTitle>
      <Card>
        <Field label="Авторы проекта" value={contacts.authors} onChange={(v) => setC("authors", v)} />
        <Field label="Телефон" value={contacts.phone} onChange={(v) => setC("phone", v)} placeholder="8-918-505-16-17" />
        <Field
          label="Почта (каждая с новой строки, первая — основная)"
          value={contacts.emails.join("\n")}
          onChange={(v) => setC("emails", v.split("\n").map((x) => x.trim()))}
          multiline
          rows={2}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="MAX" value={contacts.max} onChange={(v) => setC("max", v)} placeholder="https://max.ru/..." />
          <Field label="ВКонтакте" value={contacts.vk} onChange={(v) => setC("vk", v)} placeholder="https://vk.ru/..." />
          <Field label="Telegram" value={contacts.telegram} onChange={(v) => setC("telegram", v)} placeholder="https://t.me/..." />
          <Field label="Planeta.ru (кнопка «Поддержать проект»)" value={contacts.planeta} onChange={(v) => setC("planeta", v)} />
        </div>
      </Card>
      <SaveBar
        sticky={false}
        dirty={dirty.c}
        onSave={async () => {
          await saveContent(adminKey, "contacts", { ...contacts, emails: contacts.emails.filter(Boolean) });
          setDirty((d) => ({ ...d, c: false }));
        }}
      />

      <GroupTitle>⭐ Отзывы покупателей</GroupTitle>
      <AddButton onClick={() => updR([{ name: "", city: "", emoji: "🌊", rating: 5, text: "", product: "" }, ...reviews])}>Добавить отзыв</AddButton>
      {reviews.map((r, i) => (
        <Card key={i}>
          <ListToolbar
            title={r.name ? `${r.name}${r.city ? ", " + r.city : ""}` : "Новый отзыв"}
            index={i}
            total={reviews.length}
            onMove={(d) => updR(moveItem(reviews, i, d))}
            onDelete={() => confirm("Удалить отзыв?") && updR(reviews.filter((_, j) => j !== i))}
          />
          <div className="grid grid-cols-[1fr_1fr_80px] gap-3">
            <Field label="Имя" value={r.name} onChange={(v) => setR(i, "name", v)} />
            <Field label="Город" value={r.city} onChange={(v) => setR(i, "city", v)} />
            <Field label="Эмодзи" value={r.emoji} onChange={(v) => setR(i, "emoji", v)} />
          </div>
          <Field label="Текст отзыва" value={r.text} onChange={(v) => setR(i, "text", v)} multiline rows={4} />
          <Field label="Что купил" value={r.product} onChange={(v) => setR(i, "product", v)} />
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold mr-2" style={{ color: "var(--warm-text)" }}>Оценка:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setR(i, "rating", n)}>
                <Icon name="Star" size={22} style={{ color: "#F5A623", fill: n <= r.rating ? "#F5A623" : "transparent" }} />
              </button>
            ))}
          </div>
        </Card>
      ))}
      <SaveBar
        sticky={false}
        dirty={dirty.r}
        onSave={async () => {
          await saveContent(adminKey, "reviews", reviews.filter((r) => r.text.trim()));
          setDirty((d) => ({ ...d, r: false }));
        }}
      />

      <GroupTitle>🚚 Доставка и оплата</GroupTitle>
      {delivery.map((f, i) => (
        <Card key={i}>
          <ListToolbar
            title={f.title || "Новый пункт"}
            index={i}
            total={delivery.length}
            onMove={(d) => updD(moveItem(delivery, i, d))}
            onDelete={() => confirm("Удалить пункт?") && updD(delivery.filter((_, j) => j !== i))}
          />
          <Field label="Заголовок" value={f.title} onChange={(v) => setD(i, "title", v)} />
          <Field label="Текст" value={f.text} onChange={(v) => setD(i, "text", v)} multiline rows={2} />
          <div className="flex flex-wrap gap-2">
            {DELIVERY_ICONS.map((ic) => (
              <button
                key={ic}
                type="button"
                onClick={() => setD(i, "icon", ic)}
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ borderColor: f.icon === ic ? "var(--bronze)" : "var(--sand)", background: f.icon === ic ? "rgba(184,115,51,0.12)" : "#fff" }}
              >
                <Icon name={ic} size={18} style={{ color: "var(--bronze)" }} />
              </button>
            ))}
          </div>
        </Card>
      ))}
      <button
        onClick={() => updD([...delivery, { icon: "Package", title: "", text: "" }])}
        className="rounded-xl px-4 py-2.5 font-semibold border flex items-center gap-2"
        style={{ borderColor: "var(--sand)", color: "var(--sea)" }}
      >
        <Icon name="Plus" size={16} />
        Добавить пункт
      </button>
      <SaveBar
        sticky={false}
        dirty={dirty.d}
        onSave={async () => {
          await saveContent(adminKey, "delivery", delivery.filter((f) => f.title.trim() || f.text.trim()));
          setDirty((d) => ({ ...d, d: false }));
        }}
      />
    </div>
  );
}
