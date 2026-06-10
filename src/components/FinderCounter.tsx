import { useState, useEffect } from "react";
import { useFinderCount, pluralPeople } from "@/hooks/useFinderCount";

export default function FinderCounter() {
  const count = useFinderCount();
  const [display, setDisplay] = useState(0);

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

  if (count === null) return null;

  const formatted = display.toLocaleString("ru-RU");
  const updatedAt = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="animate-fade-up flex flex-col items-center mb-6">
      <div
        className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 shadow-lg"
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
          Енотыча нашли
        </span>
        <span
          className="font-display font-bold text-lg sm:text-xl tabular-nums"
          style={{ color: "var(--teal-light)" }}
        >
          {formatted}
        </span>
        <span className="font-body text-sm sm:text-base" style={{ color: "rgba(245,230,211,0.9)" }}>
          {pluralPeople(display)}
        </span>
      </div>
      <p className="font-body text-xs sm:text-sm italic mt-2" style={{ color: "rgba(245,230,211,0.7)" }}>
        Енофья скоро будет ждать вас 💛
      </p>
      <p className="font-body text-[11px] sm:text-xs mt-1" style={{ color: "rgba(245,230,211,0.55)" }}>
        Обновлено: {updatedAt}
      </p>
    </div>
  );
}