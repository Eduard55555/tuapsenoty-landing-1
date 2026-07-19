import { useState, useEffect, useRef } from "react";
import { useFinderData, pluralPeople } from "@/hooks/useFinderCount";
import { playCoin } from "@/hooks/useSound";

export default function FinderCounter() {
  const { count, updatedAt } = useFinderData();
  const [display, setDisplay] = useState(0);
  const [splashes, setSplashes] = useState<number[]>([]);

  const handleSplash = () => {
    playCoin();
    const id = Date.now();
    setSplashes((s) => [...s, id]);
    setTimeout(() => setSplashes((s) => s.filter((x) => x !== id)), 700);
  };

  const lastHover = useRef(0);
  const handleHover = () => {
    const now = Date.now();
    if (now - lastHover.current < 600) return;
    lastHover.current = now;
    playCoin();
  };

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
  const fmtDate = (v: string | null) =>
    v
      ? new Date(v).toLocaleString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;
  const updatedLabel = fmtDate(updatedAt);

  return (
    <div className="animate-fade-up flex flex-col items-center mb-6">
      <button
        type="button"
        onClick={handleSplash}
        onMouseEnter={handleHover}
        className="relative inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 shadow-lg cursor-pointer transition-transform hover:scale-[1.03] active:scale-95"
        style={{
          background: "rgba(253, 246, 238, 0.12)",
          border: "1px solid rgba(64,224,208,0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        {splashes.map((id) => (
          <span
            key={id}
            className="absolute inset-0 rounded-full pointer-events-none animate-finder-splash"
            style={{ border: "2px solid var(--teal-light)" }}
          />
        ))}
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
      </button>
      {updatedLabel && (
        <p className="font-body text-[11px] sm:text-xs mt-2" style={{ color: "rgba(245,230,211,0.55)" }}>
          Обновлено: {updatedLabel}
        </p>
      )}
    </div>
  );
}