import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/icon";

export default function Cart() {
  const { items, remove, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("https://functions.poehali.dev/c9f50a36-d5ce-4c13-ae29-999d565492de", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, items, total }),
    });
    setLoading(false);
    setSubmitted(true);
    clear();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <header className="sticky top-0 z-40"
        style={{ background: "rgba(253,246,238,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(184,115,51,0.15)" }}>
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <a href="/shop" style={{ color: "var(--bronze)" }}>
            <Icon name="ArrowLeft" size={24} />
          </a>
          <h1 className="font-display text-xl font-bold" style={{ color: "var(--warm-dark)" }}>
            Корзина
          </h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {submitted ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">🦝</div>
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
              Заявка принята!
            </h2>
            <p className="font-body mb-8" style={{ color: "#6B4C35" }}>
              Мы свяжемся с вами в ближайшее время для уточнения деталей и оплаты.
            </p>
            <a href="/shop" className="btn-primary inline-flex px-8 py-4">
              <Icon name="ShoppingBag" size={18} />
              Вернуться в магазин
            </a>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">🛒</div>
            <p className="font-body text-lg mb-8" style={{ color: "#9B7B5A" }}>Корзина пуста</p>
            <a href="/shop" className="btn-primary inline-flex px-8 py-4">
              <Icon name="ShoppingBag" size={18} />
              Перейти в магазин
            </a>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl p-4"
                  style={{ backgroundColor: "var(--sand)", border: "1px solid rgba(184,115,51,0.15)" }}>
                  {item.image && (
                    <img src={item.image} alt={item.name}
                      className="w-20 h-20 object-contain rounded-xl flex-shrink-0"
                      style={{ backgroundColor: "#f5f0eb" }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-bold" style={{ color: "var(--warm-dark)" }}>
                      {item.name}
                    </p>
                    <p className="font-body text-sm mt-1" style={{ color: "var(--bronze)" }}>
                      {(item.price * item.qty).toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                  <button onClick={() => remove(item.id)}
                    className="p-2 rounded-xl"
                    style={{ color: "#9B7B5A", backgroundColor: "rgba(184,115,51,0.1)" }}>
                    <Icon name="Trash2" size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 mb-6"
              style={{ backgroundColor: "var(--sand)", border: "1px solid rgba(184,115,51,0.15)" }}>
              <div className="flex justify-between items-center">
                <span className="font-body font-bold text-lg" style={{ color: "var(--warm-dark)" }}>Итого:</span>
                <span className="font-display text-2xl font-bold" style={{ color: "var(--bronze)" }}>
                  {total.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>

            <form onSubmit={handleOrder} className="space-y-4">
              <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
                Ваши данные
              </h2>
              <input required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full rounded-2xl px-5 py-4 font-body outline-none text-base"
                style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)", backgroundColor: "white" }} />
              <input required value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
                type="tel"
                className="w-full rounded-2xl px-5 py-4 font-body outline-none text-base"
                style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)", backgroundColor: "white" }} />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-2xl px-5 py-4 font-body outline-none text-base"
                style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)", backgroundColor: "white" }} />
              <button type="submit" disabled={loading}
                className="w-full btn-primary py-5 text-lg justify-center mt-2">
                {loading ? (
                  <><Icon name="Loader" size={20} /> Отправляем...</>
                ) : (
                  <><Icon name="Send" size={20} /> Оформить заявку</>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
