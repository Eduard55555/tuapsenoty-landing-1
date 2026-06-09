import Icon from "@/components/ui/icon";

export default function IndexMapTeaser() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, var(--cream) 0%, var(--sand) 100%)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, var(--sea) 0%, var(--sea-light) 60%, var(--bronze) 130%)",
            boxShadow: "0 20px 50px rgba(46,92,110,0.35)",
          }}>
          <div className="texture-overlay absolute inset-0" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
              <Icon name="MapPin" size={16} style={{ color: "var(--teal-light)" }} />
              <span className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: "white" }}>
                Квест по городу
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4" style={{ color: "white" }}>
              Где прячутся еноты?
            </h2>

            <p className="font-body text-base sm:text-lg max-w-xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.9)" }}>
              По всему Туапсе расставлены бронзовые хранители. Найди их все, потри на удачу
              и собери свою коллекцию исполненных желаний. Карта подскажет, куда идти.
            </p>

            <a href="/map"
              className="btn-primary text-base sm:text-lg"
              style={{ background: "white", color: "var(--sea)", boxShadow: "0 8px 25px rgba(0,0,0,0.25)" }}>
              <Icon name="Map" size={20} />
              Посмотреть карту енотов
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
