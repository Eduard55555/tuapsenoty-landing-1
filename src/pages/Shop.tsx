import { useState } from "react";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import PhoneLink from "@/components/PhoneLink";
import ProductGallery from "@/components/ProductGallery";
import DeliveryInfo from "@/components/DeliveryInfo";
import ShareButtons from "@/components/ShareButtons";
import ReviewsSection from "@/components/ReviewsSection";
import useSeo from "@/hooks/useSeo";
import { PRODUCTS, buildCartUrl } from "@/data/products";

const PLANETA_URL = "https://planeta.ru/campaigns/244619";

export default function Shop() {
  useSeo({
    title: "Магазин Туапсеноты — фигурки и сувениры бронзовых енотов",
    description:
      "Сувениры и мини-фигурки енотов-хранителей Туапсе ручной работы. Купите своего Енотыча и поддержите проект бронзовой семьи на набережной.",
    path: "/shop",
  });
  const [added, setAdded] = useState<string | null>(null);
  const [qtys, setQtys] = useState<Record<string, number>>({});

  const getQty = (id: string) => qtys[id] || 1;
  const changeQty = (id: string, delta: number) => {
    setQtys((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  };

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    setAdded(product.id);
    const qty = getQty(product.id);
    setTimeout(() => {
      window.location.href = buildCartUrl(product, qty);
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1100px 600px at 12% -8%, rgba(122,177,191,0.22), transparent 58%), radial-gradient(1000px 600px at 95% 8%, rgba(184,115,51,0.18), transparent 55%), radial-gradient(900px 700px at 50% 115%, rgba(212,160,90,0.16), transparent 60%), linear-gradient(180deg, #FDF6EE, #F5E6D3 55%, #F0DCC2)",
      }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(140,82,30,0.55), transparent 70%)" }} />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(70,120,135,0.50), transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-55 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(160,110,45,0.50), transparent 70%)" }} />
      </div>
      <SiteHeader showCart />

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
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

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden card-hover"
              style={{
                background: "rgba(255,252,247,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "0 12px 40px rgba(184,115,51,0.18)",
              }}>
              <div className="relative">
                <ProductGallery product={p} />
                <span className="absolute top-2 left-2 z-10 font-body text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: p.badgeColor, color: "white" }}>
                  {p.badge}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-display text-xl font-bold mb-2 leading-tight" style={{ color: "#2a1a10" }}>
                  {p.name}
                </h2>
                {p.stock && (
                  <span className="inline-flex items-center gap-1 font-body text-xs font-bold px-2.5 py-1 rounded-full mb-2"
                    style={{ backgroundColor: "rgba(192,57,43,0.1)", color: "#c0392b" }}>
                    <Icon name="Flame" size={12} />
                    {p.stock}
                  </span>
                )}
                <div className="font-body text-sm mb-3" style={{ color: "#3d2b1f", lineHeight: 1.6 }}>
                  {p.description.split("\n\n").map((block, i) => (
                    <p
                      key={i}
                      className={`mb-2 whitespace-pre-line ${i === 0 ? "font-bold text-base" : ""}`}
                      style={i === 0 ? { color: "var(--bronze)" } : undefined}
                    >
                      {block}
                    </p>
                  ))}
                </div>
                {p.compareNote && (
                  <div className="rounded-xl px-3 py-2 mb-3 flex items-start gap-2"
                    style={{ backgroundColor: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)" }}>
                    <Icon name="BadgePercent" size={16} style={{ color: "#388E3C", flexShrink: 0, marginTop: 2 }} />
                    <p className="font-body text-xs font-semibold" style={{ color: "#2E5E30", lineHeight: 1.5 }}>
                      {p.compareNote}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-display text-2xl font-bold" style={{ color: "var(--bronze)" }}>
                    {p.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <div className="flex items-center gap-1 rounded-full px-1 py-1"
                    style={{ border: "1.5px solid rgba(184,115,51,0.3)", backgroundColor: "white" }}>
                    <button
                      type="button"
                      onClick={() => changeQty(p.id, -1)}
                      className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-full"
                      style={{ color: "var(--bronze)" }}
                      aria-label="Уменьшить">
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="font-body font-bold text-sm w-6 text-center" style={{ color: "var(--warm-dark)" }}>
                      {getQty(p.id)}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQty(p.id, 1)}
                      className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-full"
                      style={{ color: "var(--bronze)" }}
                      aria-label="Увеличить">
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(p)}
                  className="cta-buy w-full flex items-center justify-center gap-2.5 rounded-full font-display font-extrabold text-lg sm:text-xl px-5 py-5 transition-transform active:scale-95"
                  style={{
                    background: added === p.id
                      ? "linear-gradient(135deg, #4CAF50, #2E7D32)"
                      : "linear-gradient(135deg, #FF9330, #F2540B)",
                    color: "white",
                    letterSpacing: "0.01em",
                    boxShadow: added === p.id
                      ? "0 10px 26px rgba(76,175,80,0.45)"
                      : "0 12px 28px rgba(242,84,11,0.45)",
                  }}>
                  {added === p.id ? (
                    <><Icon name="Check" size={24} /> Добавлено</>
                  ) : (
                    <><Icon name="ShoppingCart" size={24} /> В корзину</>
                  )}
                </button>
                <PhoneLink
                  className="flex items-center justify-center gap-1.5 w-full mt-2 rounded-full text-xs font-bold px-3 py-2 transition-colors"
                  style={{ border: "1.5px solid var(--bronze)", color: "var(--bronze)", backgroundColor: "white" }}
                  iconSize={14}
                />
                <p className="font-body text-xs text-center mt-1.5" style={{ color: "#9B7B5A" }}>
                  Заказ в 1 клик — позвоните, оформим за минуту
                </p>
                <div className="flex justify-center mt-3 pt-3" style={{ borderTop: "1px solid rgba(184,115,51,0.15)" }}>
                  <ShareButtons />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-14">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              Доставка и оплата
            </h2>
            <p className="font-body" style={{ color: "#6B4C35" }}>
              Оформляете заявку — мы звоним и договариваемся об удобном способе
            </p>
          </div>
          <DeliveryInfo />
          <div className="text-center mt-5">
            <a href="/delivery" className="inline-flex items-center gap-1.5 font-body font-bold text-sm underline"
              style={{ color: "var(--bronze)" }}>
              Все условия доставки и оплаты
              <Icon name="ArrowRight" size={16} />
            </a>
          </div>
        </div>

        <div className="rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, var(--sea), #3d7a90)", boxShadow: "0 12px 40px rgba(122,177,191,0.3)" }}>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: "var(--cream)" }}>
            Поддержать проект
          </h3>
          <p className="font-body mb-6" style={{ color: "rgba(245,230,211,0.8)" }}>
            Стань частью истории на Planeta.ru
          </p>
          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex text-base px-8 py-4">
            <Icon name="Heart" size={18} />
            Поддержать на Planeta.ru
          </a>
        </div>
      </div>

      <div className="relative z-10">
        <ReviewsSection background="transparent" />
      </div>

      <SiteFooter />
    </div>
  );
}