import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function Cart() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "";
  const name = params.get("name") || "";
  const price = Number(params.get("price") || 0);
  const image = params.get("image") || "";
  const initialQty = Math.max(1, Number(params.get("qty") || 1));

  const hasItem = !!id && !!name && price > 0;

  const [qty, setQty] = useState(initialQty);
  const total = price * qty;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("https://functions.poehali.dev/c9f50a36-d5ce-4c13-ae29-999d565492de", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          phone,
          email,
          items: [{ name, price, qty }],
          total,
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("bad status " + res.status);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.");
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
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
            Оформление заказа
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
        ) : !hasItem ? (
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
            <div className="rounded-2xl overflow-hidden mb-6"
              style={{ backgroundColor: "var(--sand)", border: "1px solid rgba(184,115,51,0.15)" }}>
              <div className="flex items-center gap-4 p-4">
                {image && (
                  <img src={image} alt={name}
                    className="w-24 h-24 object-contain rounded-xl flex-shrink-0"
                    style={{ backgroundColor: "#f5f0eb" }} />
                )}
                <div className="flex-1">
                  <p className="font-body font-bold text-lg" style={{ color: "var(--warm-dark)" }}>
                    {name}
                  </p>
                  <p className="font-body text-sm mt-0.5" style={{ color: "#9B7B5A" }}>
                    {price.toLocaleString("ru-RU")} ₽ / шт
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 rounded-full px-1 py-1"
                      style={{ border: "1.5px solid rgba(184,115,51,0.3)", backgroundColor: "white" }}>
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full"
                        style={{ color: "var(--bronze)" }}
                        aria-label="Уменьшить">
                        <Icon name="Minus" size={16} />
                      </button>
                      <span className="font-body font-bold w-7 text-center" style={{ color: "var(--warm-dark)" }}>
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => q + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full"
                        style={{ color: "var(--bronze)" }}
                        aria-label="Увеличить">
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                    <p className="font-display text-2xl font-bold" style={{ color: "var(--bronze)" }}>
                      {total.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleOrder} className="space-y-4">
              <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
                Ваши данные
              </h2>
              <input
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ваше имя"
                autoComplete="name"
                autoCorrect="off"
                autoCapitalize="words"
                spellCheck={false}
                className="w-full rounded-2xl px-5 py-4 font-body outline-none text-base"
                style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)", backgroundColor: "white" }}
              />
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
                type="tel"
                autoComplete="tel"
                autoCorrect="off"
                spellCheck={false}
                className="w-full rounded-2xl px-5 py-4 font-body outline-none text-base"
                style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)", backgroundColor: "white" }}
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-2xl px-5 py-4 font-body outline-none text-base"
                style={{ border: "1.5px solid rgba(184,115,51,0.3)", color: "var(--warm-dark)", backgroundColor: "white" }}
              />
              <label className="flex items-start gap-3 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-5 h-5 flex-shrink-0 accent-current"
                  style={{ accentColor: "var(--bronze)" }}
                />
                <span className="font-body text-sm" style={{ color: "#6B4C35", lineHeight: 1.5 }}>
                  Я принимаю условия{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--bronze)" }}>
                    Политики обработки персональных данных
                  </a>{" "}
                  и даю согласие на обработку моих данных для оформления заказа
                </span>
              </label>
              <button
                type="submit"
                disabled={loading || !consent}
                className="w-full btn-primary py-5 text-lg justify-center mt-2"
                style={(!consent || loading) ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
                {loading
                  ? <><Icon name="Loader" size={20} /> Отправляем...</>
                  : <><Icon name="Send" size={20} /> Оформить заявку</>
                }
              </button>
              {error && (
                <p className="font-body text-sm text-center" style={{ color: "#c0392b" }}>
                  {error}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}