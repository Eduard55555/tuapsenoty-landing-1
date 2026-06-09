import Icon from "@/components/ui/icon";
import FinderCounter from "@/components/FinderCounter";
import { PLANETA_URL } from "./indexData";

export default function IndexHero() {
  return (
    <>
      {/* HERO */}
      <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 texture-overlay opacity-30" />

        <div className="absolute top-20 right-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full opacity-10"
          style={{ background: "var(--teal)", filter: "blur(60px)" }} />
        <div className="absolute bottom-20 left-10 w-40 h-40 sm:w-80 sm:h-80 rounded-full opacity-15"
          style={{ background: "var(--bronze)", filter: "blur(80px)" }} />

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" style={{ fill: "var(--cream)" }}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <FinderCounter />
          <div className="animate-float mb-8 inline-block">
            <img
              src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/4362ca50-9ec3-4776-96ed-7ac9a6dcf123.png"
              alt="Енофья с малышом"
              className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-full object-cover shadow-2xl"
              style={{ border: "4px solid rgba(245, 230, 211, 0.4)" }}
            />
          </div>

          <div className="animate-fade-up">
            <h1 className="font-display font-bold mb-6 whitespace-nowrap"
              style={{ color: "var(--cream)", lineHeight: 1.15, fontSize: "clamp(15px, 4.6vw, 56px)" }}>
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
              className="btn-primary text-base px-6 py-4 w-full sm:w-auto text-center"
              style={{ backgroundColor: "var(--bronze)" }}>
              <Icon name="ShoppingCart" size={18} />
              Перейти в магазин
            </a>
            <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-base px-6 py-4 w-full sm:w-auto text-center">
              <Icon name="Heart" size={18} />
              Стать частью легенды
            </a>
          </div>


        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-8 sm:py-12 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--bronze)" }}>
              О проекте
            </p>
            <h2 className="section-title text-2xl sm:text-4xl md:text-5xl mb-6">
              Туапсе заслуживает<br />своей легенды
            </h2>
          </div>
          <div className="font-body text-lg w-full mb-16" style={{ color: "#6B4C35", lineHeight: 1.5, textAlign: "justify" }}>
            <p style={{ textIndent: "2em" }}>Туапсе — город, где море обнимает берег, а горы смотрят в облака. Здесь хочется замедлиться, остановиться, вдохнуть и рассмотреть повнимательнее.</p>
            <p style={{ textIndent: "2em" }}>«Туапсеноты» — не просто фигурки. Это маленькое чудо, которое делает город ещё теплее.</p>
            <p style={{ textIndent: "2em" }}>Восемь бронзовых енотов. Совсем маленькие — 20 см. Они поселятся на набережной, в парке, на пляже, у вокзала. У каждого — имя, характер, своя тихая легенда. И ритуал, который хочется повторять: потереть лапку, прошептать желание, просто улыбнуться в ответ.</p>
            <p style={{ textIndent: "2em" }}>Их можно искать. С ними можно обниматься. Им можно верить.</p>
            <p style={{ textIndent: "2em" }}>Мы дарим гостям и жителям города повод остановиться и почувствовать: в Туапсе есть место чуду. И оно уже здесь.</p>
            <p style={{ textIndent: "2em", fontStyle: "italic", fontWeight: 600 }}>Туапсе заслужил свою легенду. Мы её создаём. А вы — её начало.</p>
          </div>

          <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl relative">
            <img
              src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/2d9722e6-bc44-40c7-b04f-5b489accacfc.png"
              alt="Семья Туапсенотов"
              className="w-full h-64 sm:h-96 object-cover"
              style={{ objectPosition: "center center" }}
            />
            <div className="absolute inset-0 flex items-end p-8"
              style={{ background: "linear-gradient(to top, rgba(46,92,110,0.8) 0%, transparent 60%)" }}>
              <p className="font-display text-lg sm:text-2xl md:text-3xl font-bold italic"
                style={{ color: "var(--cream)" }}>
                «Каждый енот — это история, которую хочется рассказать»
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
