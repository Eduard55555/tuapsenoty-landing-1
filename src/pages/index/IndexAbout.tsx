export default function IndexAbout() {
  return (
    <section id="about" className="cv-auto py-8 sm:py-12 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3"
            style={{ color: "var(--bronze)" }}>
            О проекте
          </p>
          <h2 className="section-title text-xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
            Туапсе заслуживает<br />своей легенды
          </h2>
        </div>
        <div className="font-body text-base sm:text-lg max-w-3xl mx-auto mb-10 sm:mb-16" style={{ color: "var(--warm-text)", lineHeight: 1.8, textAlign: "justify" }}>
          <p style={{ textIndent: "2em" }}>Туапсе — город, где море обнимает берег, а горы смотрят в облака. Здесь хочется замедлиться, остановиться, вдохнуть и рассмотреть повнимательнее.</p>
          <p style={{ textIndent: "2em" }}>«Туапсеноты» — не просто фигурки. Это маленькое чудо, которое делает город ещё теплее.</p>
          <p style={{ textIndent: "2em" }}>Восемь бронзовых енотов. Совсем маленькие — 20 см. Они поселятся на набережной, в парке, на пляже, у вокзала. У каждого — имя, характер, своя тихая легенда. И ритуал, который хочется повторять: потереть лапку, прошептать желание, просто улыбнуться в ответ.</p>
          <p style={{ textIndent: "2em" }}>Их можно искать. С ними можно обниматься. Им можно верить.</p>
          <p style={{ textIndent: "2em" }}>Мы дарим гостям и жителям города повод остановиться и почувствовать: в Туапсе есть место чуду. И оно уже здесь.</p>
          <p style={{ textIndent: "2em", fontStyle: "italic", fontWeight: 600 }}>Туапсе заслужил свою легенду. Мы её создаём. А вы — её начало.</p>
        </div>

        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl relative">
          <img
            src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/opt/d9f2d83f1f264f32945cf1a8d5470ab4.webp"
            alt="Семья Туапсенотов"
            loading="lazy"
            decoding="async"
            className="w-full h-64 sm:h-96 object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0 flex items-end p-5 sm:p-8"
            style={{ background: "linear-gradient(to top, rgba(46,92,110,0.8) 0%, transparent 60%)" }}>
            <p className="font-display text-lg sm:text-2xl md:text-3xl font-bold italic"
              style={{ color: "var(--cream)" }}>
              «Каждый енот — это история, которую хочется рассказать»
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}