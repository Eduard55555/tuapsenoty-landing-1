import Icon from "@/components/ui/icon";
import FinderCounter from "@/components/FinderCounter";
import SeagullsFlight from "@/components/SeagullsFlight";
import { playCoin } from "@/hooks/useSound";

export default function IndexHero() {
  return (
    <>
      {/* HERO */}
      <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 texture-overlay opacity-30" />

        <SeagullsFlight />

        <div className="absolute top-20 right-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full opacity-10 hero-glow hero-glow-teal" />
        <div className="absolute bottom-20 left-10 w-40 h-40 sm:w-80 sm:h-80 rounded-full opacity-15 hero-glow hero-glow-bronze" />

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" style={{ fill: "var(--cream)" }}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-float mb-4 inline-block" style={{ marginTop: "-38px" }}>
            <img
              src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/opt/93ed2016798c4b13abf094a11fc45750.webp"
              alt="Енофья с малышом"
              decoding="async"
              width={256}
              height={256}
              {...{ fetchpriority: "high" }}
              className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-full object-cover shadow-2xl"
              style={{ border: "4px solid rgba(245, 230, 211, 0.4)" }}
            />
          </div>
          <FinderCounter />

          <div className="animate-fade-up">
            <h1 className="font-display font-bold mb-6 max-w-4xl mx-auto"
              style={{ color: "var(--cream)", lineHeight: 1.15, fontSize: "clamp(28px, 7vw, 56px)" }}>
              Туапсеноты — <em style={{ color: "var(--teal-light)" }}>новая душа</em> Черноморского побережья
            </h1>
          </div>

          <p className="animate-fade-up-delay-1 font-body text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(245,230,211,0.85)", lineHeight: 1.7 }}>
            Семья бронзовых енотов-хранителей, которая изменит Туапсе.
            Восемь персонажей с историями, ритуалами и душой.
          </p>

          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/shop"
              onMouseEnter={playCoin}
              className="btn-primary text-base px-6 py-4 w-full sm:w-auto text-center"
              style={{ backgroundColor: "var(--bronze)" }}>
              <Icon name="ShoppingCart" size={18} />
              Перейти в магазин
            </a>
            <a href="/sponsors"
              onMouseEnter={playCoin}
              className="btn-primary text-base px-6 py-4 w-full sm:w-auto text-center"
              style={{ background: "linear-gradient(135deg, var(--teal), var(--sea-light))", color: "var(--warm-dark)", boxShadow: "0 4px 15px rgba(64,224,208,0.4)" }}>
              <Icon name="HeartHandshake" size={18} />
              Стать частью легенды
            </a>
          </div>


        </div>
      </section>
    </>
  );
}