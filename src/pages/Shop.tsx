import { useState } from "react";
import Icon from "@/components/ui/icon";

const PLANETA_URL = "https://planeta.ru/campaigns/244619";

const PRODUCTS = [
  {
    id: "mini-figure",
    name: "Мини-фигурка Енотыча",
    price: 479,
    emoji: "🗿",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/1dfa0dd2-540a-4897-a4ba-8a240e6f23e2.jpg",
    description: "Авторская мини-фигурка первого хранителя Туапсе — Енотыча. Ручная работа, лимитированная серия.",
    badge: "Хит",
    badgeColor: "#4CAF50",
  },
  {
    id: "bronze-original",
    name: "Заказ бронзового оригинала — Енотыч",
    price: 100000,
    emoji: "🏆",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/77bcdbf7-bda8-4027-a2e3-e9da0657381e.jpg",
    description: "Полноразмерная бронзовая скульптура Енотыча высотой 20 см. Именная табличка, сертификат подлинности, доставка по России.",
    badge: "Эксклюзив",
    badgeColor: "#B8732F",
  },
  {
    id: "bronze-enofya",
    name: "Заказ бронзового оригинала — Енофья",
    price: 100000,
    emoji: "🧺",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/942e525e-ab66-4f68-a8c6-8380b1f3e60e.jpg",
    description: "Полноразмерная бронзовая скульптура Енофьи. Добрая бабушка семьи с корзинкой. Именная табличка, сертификат подлинности, доставка по России.",
    badge: "Эксклюзив",
    badgeColor: "#B8732F",
  },
];

export default function Shop() {
  const [added, setAdded] = useState<string | null>(null);

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    setAdded(product.id);
    setTimeout(() => {
      window.location.href = `/cart?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}`;
    }, 500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <header className="fixed top-0 left-0 right-0 z-40"
        style={{ background: "rgba(253,246,238,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(184,115,51,0.15)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦝</span>
            <span className="font-display text-xl font-bold" style={{ color: "var(--bronze)" }}>
              Туапсеноты
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/" className="font-body text-sm hidden sm:block" style={{ color: "var(--warm-dark)" }}>
              ← На главную
            </a>
            <a href="/cart" className="btn-primary text-sm px-4 py-2">
              <Icon name="ShoppingCart" size={18} />
              Корзина
            </a>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--bronze)" }}>
            Магазин
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4"
            style={{ color: "var(--warm-dark)" }}>
            Возьми частичку Туапсе домой
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "#6B4C35" }}>
            Каждый заказ — это вклад в проект и живая память о Туапсенотах
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-16">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="rounded-3xl overflow-hidden card-hover"
              style={{ backgroundColor: "var(--sand)", border: "1px solid rgba(184,115,51,0.15)" }}>
              <div className="relative">
                <img src={p.image} alt={p.name}
                  className="w-full object-contain"
                  style={{ maxHeight: "320px", backgroundColor: "#f5f0eb" }} />
                <span className="absolute top-3 left-3 font-body text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: p.badgeColor, color: "white" }}>
                  {p.badge}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
                  {p.name}
                </h2>
                <p className="font-body text-sm mb-4" style={{ color: "#6B4C35", lineHeight: 1.7 }}>
                  {p.description}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-2xl font-bold" style={{ color: "var(--bronze)" }}>
                    {p.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <button
                    onClick={() => handleAdd(p)}
                    className="btn-primary text-sm px-5 py-3"
                    style={added === p.id ? { backgroundColor: "#4CAF50" } : {}}>
                    {added === p.id ? (
                      <><Icon name="Check" size={16} /> Добавлено</>
                    ) : (
                      <><Icon name="ShoppingCart" size={16} /> В корзину</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, var(--sea), #3d7a90)" }}>
          <p className="font-body text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--teal-light)" }}>
            Краудфандинг
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: "var(--cream)" }}>
            Хочешь поддержать весь проект?
          </h3>
          <p className="font-body mb-6" style={{ color: "rgba(245,230,211,0.8)" }}>
            Стань частью истории на Planeta.ru — поддержи краудфандинг
          </p>
          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex text-base px-8 py-4">
            <Icon name="Heart" size={18} />
            Поддержать на Planeta.ru
          </a>
        </div>
      </div>
    </div>
  );
}