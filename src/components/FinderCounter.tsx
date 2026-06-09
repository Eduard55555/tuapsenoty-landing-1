import { useState, useEffect } from "react";

const API_URL = "https://functions.poehali.dev/eec444e5-96b7-4788-9c65-0077c246d938";

export default function FinderCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((d) => setCount(typeof d.count === "number" ? d.count : 1234))
      .catch(() => setCount(1234));
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

  if (count === null) return null;

  const formatted = display.toLocaleString("ru-RU");

  return (
    <div className="animate-fade-up inline-flex flex-col items-center mb-6">
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
        Енофья ждёт вас 💛
      </p>
    </div>
  );
}

function pluralPeople(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "человек";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "человека";
  return "человек";
}
