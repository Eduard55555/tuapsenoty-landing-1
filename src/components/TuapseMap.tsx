const SPOTS = [
  {
    emoji: "⚓️",
    title: "Набережная",
    icon: "Anchor",
    status: "Енотыч (уже здесь)",
    here: true,
    pos: { top: "62%", left: "24%" },
  },
  {
    emoji: "🚉",
    title: "Вокзал",
    icon: "TrainFront",
    status: "Скоро здесь",
    here: false,
    pos: { top: "70%", left: "78%" },
  },
];

export default function TuapseMap() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--bronze)" }}>
            Карта поисков
          </p>
          <h2 className="section-title text-2xl sm:text-4xl md:text-5xl mb-4">
            Где искать енотов
          </h2>
          <p className="font-body text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "#6B4C35", lineHeight: 1.6 }}>
            Енотыч уже поселился на набережной. Остальные места выбираются — следите за новостями.
          </p>
        </div>

        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(160deg, #2E5C6E 0%, #3a7287 55%, #cdb48a 55%, #d9c5a0 100%)",
            aspectRatio: "16 / 9",
            border: "4px solid rgba(245,230,211,0.4)",
          }}
        >
          {/* море — волны */}
          <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* линия берега */}
            <path
              d="M0,250 C150,230 300,270 450,240 C600,215 700,255 800,235 L800,0 L0,0 Z"
              fill="rgba(46,92,110,0.25)"
            />
            {/* набережная-дорожка вдоль берега */}
            <path
              d="M0,262 C150,242 300,282 450,252 C600,227 700,267 800,247"
              fill="none"
              stroke="rgba(245,230,211,0.7)"
              strokeWidth="5"
              strokeDasharray="14 10"
              strokeLinecap="round"
            />
            {/* парк — зелёное пятно */}
            <ellipse cx="430" cy="150" rx="95" ry="55" fill="rgba(120,160,90,0.55)" />
            {/* река/тропа к вокзалу */}
            <path
              d="M600,330 C640,300 660,310 700,300"
              fill="none"
              stroke="rgba(245,230,211,0.5)"
              strokeWidth="4"
              strokeDasharray="10 8"
              strokeLinecap="round"
            />
          </svg>

          {SPOTS.map((s) => (
            <div
              key={s.title}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center"
              style={{ top: s.pos.top, left: s.pos.left }}
            >
              <div
                className="flex items-center justify-center rounded-full shadow-lg text-xl sm:text-2xl"
                style={{
                  width: "clamp(40px, 8vw, 56px)",
                  height: "clamp(40px, 8vw, 56px)",
                  background: s.here ? "var(--bronze)" : "rgba(253,246,238,0.92)",
                  border: s.here ? "3px solid var(--teal-light)" : "2px solid rgba(107,76,53,0.3)",
                }}
              >
                {s.emoji}
              </div>
              <div
                className="mt-2 rounded-full px-3 py-1 shadow"
                style={{
                  background: s.here ? "rgba(253,246,238,0.95)" : "rgba(46,92,110,0.85)",
                }}
              >
                <span
                  className="font-body font-semibold whitespace-nowrap"
                  style={{
                    fontSize: "clamp(10px, 2.4vw, 13px)",
                    color: s.here ? "#6B4C35" : "var(--cream)",
                  }}
                >
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
          <span className="flex items-center gap-2 font-body text-sm" style={{ color: "#6B4C35" }}>
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: "var(--bronze)", border: "2px solid var(--teal-light)" }} />
            Уже установлен
          </span>
          <span className="flex items-center gap-2 font-body text-sm" style={{ color: "#6B4C35" }}>
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: "rgba(253,246,238,0.92)", border: "2px solid rgba(107,76,53,0.4)" }} />
            Место выбирается
          </span>
        </div>
      </div>
    </section>
  );
}