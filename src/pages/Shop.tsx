import { useState } from "react";
import { useCart } from "@/context/CartContext";
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
    name: "Заказ бронзового оригинала",
    price: 107000,
    emoji: "🏆",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/e8e4fa3a-5863-483b-9cb1-762d643b6148.jpg",
    description: "Полноразмерная бронзовая скульптура Енотыча высотой 20 см. Именная табличка, сертификат подлинности, доставка по России.",
    badge: "Эксклюзив",
    badgeColor: "#B8732F",
  },
];

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : '';
  }

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://functions.poehali.dev/c9f50a36-d5ce-4c13-ae29-999d565492de", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, items, total }),
    });
    setSubmitted(true);
    clear();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-end" style={{ zIndex: 9999 }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white flex flex-col shadow-2xl"
        style={{ height: "100dvh", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        <div className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: "rgba(184,115,51,0.2)" }}>
          <h2 className="font-display text-2xl font-bold" style={{ color: "var(--warm-dark)" }}>
            Корзина
          </h2>
          <button onClick={onClose} className="p-1" style={{ color: "var(--bronze)" }}>
            <Icon name="X" size={24} />
          </button>
        </div>

        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-4">🦝</div>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              Заявка принята!
            </h3>
            <p className="font-body text-sm" style={{ color: "#6B4C35" }}>
              Мы свяжемся с вами в ближайшее время для уточнения деталей и оплаты.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <p className="font-body" style={{ color: "#9B7B5A" }}>Корзина пуста</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-2xl p-3"
                  style={{ backgroundColor: "var(--sand)" }}>
                  {item.image && (
                    <img src={item.image} alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-bold text-sm truncate" style={{ color: "var(--warm-dark)" }}>
                      {item.name}
                    </p>
                    <p className="font-body text-sm" style={{ color: "var(--bronze)" }}>
                      {(item.price * item.qty).toLocaleString("ru-RU")} ₽ × {item.qty}
                    </p>
                  </div>
                  <button onClick={() => remove(item.id)} style={{ color: "#9B7B5A" }}>
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-5 border-t" style={{ borderColor: "rgba(184,115,51,0.2)" }}>
              <div className="flex justify-between mb-5">
                <span className="font-body font-bold" style={{ color: "var(--warm-dark)" }}>Итого:</span>
                <span className="font-display text-xl font-bold" style={{ color: "var(--bronze)" }}>
                  {total.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <form onSubmit={handleOrder} className="space-y-3">
                <input required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                  style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)" }} />
                <input required value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="Телефон"
                  className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                  style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)" }} />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                  style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)" }} />
                <button type="submit"
                  className="w-full btn-primary py-4 text-base justify-center">
                  <Icon name="Send" size={18} />
                  Оформить заявку
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  const { add, count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [added, setAdded] = useState<string | null>(null);

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    add({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      {/* Header */}
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
            <button onClick={() => setCartOpen(true)}
              className="relative btn-primary text-sm px-4 py-2">
              <Icon name="ShoppingCart" size={18} />
              Корзина
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ backgroundColor: "var(--teal)", color: "var(--warm-dark)" }}>
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--bronze)", letterSpacing: "0.2em" }}>
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

        {/* Products */}
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
                <div className="flex items-center justify-between">
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

        {/* Planeta banner */}
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

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}