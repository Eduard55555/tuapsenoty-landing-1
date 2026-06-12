import { useState, useEffect, useRef } from "react";
import { FINDER_API, pluralPeople } from "@/hooks/useFinderCount";
import { playCoin } from "@/hooks/useSound";
import Icon from "@/components/ui/icon";

export default function Found() {
  const [count, setCount] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;
    playCoin();
    fetch(FINDER_API, { method: "POST", cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {
        fetch(FINDER_API, { cache: "no-store" })
          .then((r) => r.json())
          .then((d) => {
            if (typeof d.count === "number") setCount(d.count);
          })
          .catch(() => {});
      });
  }, []);

  useEffect(() => {
    if (count === null) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(count * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [count]);

  const formatted = display.toLocaleString("ru-RU");

  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 texture-overlay opacity-30" />
      <div
        className="absolute top-20 right-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full opacity-10"
        style={{ background: "var(--teal)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-40 h-40 sm:w-80 sm:h-80 rounded-full opacity-15"
        style={{ background: "var(--bronze)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <div className="animate-float mb-6 inline-block">
          <img
            src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/4362ca50-9ec3-4776-96ed-7ac9a6dcf123.png"
            alt="Енофья"
            className="w-40 h-40 sm:w-52 sm:h-52 mx-auto rounded-full object-cover shadow-2xl"
            style={{ border: "4px solid rgba(245, 230, 211, 0.4)" }}
          />
        </div>

        <h1
          className="font-display font-bold mb-4 animate-fade-up"
          style={{ color: "var(--cream)", fontSize: "clamp(28px, 8vw, 44px)", lineHeight: 1.15 }}
        >
          Вы нашли <em style={{ color: "var(--teal-light)" }}>Енотыча!</em>
        </h1>

        <p
          className="font-body text-lg mb-8 animate-fade-up-delay-1"
          style={{ color: "rgba(245,230,211,0.85)", lineHeight: 1.6 }}
        >
          Потрите лапку, загадайте желание и улыбнитесь — Енофья запомнит вас 💛
        </p>

        <div className="animate-fade-up-delay-2 flex flex-col items-center mb-8">
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 shadow-lg"
            style={{
              background: "rgba(253, 246, 238, 0.12)",
              border: "1px solid rgba(64,224,208,0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ backgroundColor: "var(--teal-light)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: "var(--teal-light)" }}
              />
            </span>
            <span className="font-body text-sm sm:text-base" style={{ color: "rgba(245,230,211,0.9)" }}>
              Енотыча нашли уже
            </span>
            <span
              className="font-display font-bold text-xl sm:text-2xl tabular-nums"
              style={{ color: "var(--teal-light)" }}
            >
              {count === null ? "…" : formatted}
            </span>
            <span className="font-body text-sm sm:text-base" style={{ color: "rgba(245,230,211,0.9)" }}>
              {pluralPeople(display)}
            </span>
          </div>
          <p className="font-body text-xs sm:text-sm italic mt-3" style={{ color: "rgba(245,230,211,0.7)" }}>
            Спасибо, что стали частью легенды!
          </p>
        </div>

        <a
          href="/"
          onMouseEnter={playCoin}
          className="btn-primary text-base px-6 py-4 inline-flex items-center justify-center animate-fade-up-delay-2"
          style={{ backgroundColor: "var(--bronze)" }}
        >
          <Icon name="Home" size={18} />
          На главную
        </a>
      </div>
    </section>
  );
}
