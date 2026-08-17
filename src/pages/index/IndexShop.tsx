import Icon from "@/components/ui/icon";
import { PRODUCTS, buildCartUrl } from "@/data/products";
import ShareButtons from "@/components/ShareButtons";

const FEATURED = PRODUCTS.slice(0, 3);

export default function IndexShop() {
  return (
    <section id="shop" className="cv-auto py-10 sm:py-16 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, var(--cream) 0%, var(--sand) 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-7 sm:mb-10">
          <p className="font-body text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3"
            style={{ color: "var(--bronze)" }}>
            Сувениры
          </p>
          <h2 className="section-title text-xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            Возьми Туапсенота домой 🦝
          </h2>
          <p className="font-body text-sm sm:text-lg max-w-xl mx-auto" style={{ color: "var(--warm-text)" }}>
            Фигурки ручной работы «под бронзу». Тёплый подарок и память о Туапсе.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {FEATURED.map((p) => (
            <div key={p.id} className="rounded-3xl overflow-hidden card-hover flex flex-col"
              style={{ background: "#fff", border: "1px solid rgba(184,115,51,0.15)", boxShadow: "0 10px 30px rgba(184,115,51,0.12)" }}>
              <a href="/shop" className="relative block">
                <img src={p.image} alt={p.name}
                  loading="lazy" decoding="async"
                  className="w-full object-contain"
                  style={{ height: "220px", backgroundColor: "#f5f0eb" }} />
                <span className="absolute top-3 left-3 font-body text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: p.badgeColor, color: "white" }}>
                  {p.badge}
                </span>
              </a>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="font-display text-base sm:text-lg font-bold mb-2 leading-tight" style={{ color: "var(--warm-dark)" }}>
                  {p.name}
                </h3>
                <div className="mt-auto">
                  <div className="font-display text-lg sm:text-2xl font-bold mb-3" style={{ color: "var(--bronze)" }}>
                    {p.price.toLocaleString("ru-RU")} ₽
                  </div>
                  <a
                    href={buildCartUrl(p)}
                    className="cta-buy w-full flex items-center justify-center gap-2.5 rounded-full font-display font-extrabold text-base sm:text-xl px-4 py-3.5 sm:px-5 sm:py-5 transition-transform active:scale-95"
                    style={{ background: "linear-gradient(135deg, #FF9330, #F2540B)", color: "white", letterSpacing: "0.01em", boxShadow: "0 12px 28px rgba(242,84,11,0.45)" }}>
                    <Icon name="ShoppingCart" size={24} />
                    В корзину
                  </a>
                  <div className="flex justify-center mt-3 pt-3" style={{ borderTop: "1px solid rgba(184,115,51,0.15)" }}>
                    <ShareButtons />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-7 sm:mt-10">
          <a href="/shop"
            className="inline-flex items-center gap-2 rounded-full font-display font-bold text-sm sm:text-base px-6 py-3.5 sm:px-8 sm:py-4 transition-transform active:scale-95"
            style={{ backgroundColor: "var(--sea)", color: "white", boxShadow: "0 8px 24px rgba(46,92,110,0.3)" }}>
            Смотреть все сувениры
            <Icon name="ArrowRight" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}