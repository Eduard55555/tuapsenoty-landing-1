import { useState, useEffect, useRef } from "react";

const API_URL = "https://functions.poehali.dev/eec444e5-96b7-4788-9c65-0077c246d938";

export default function FinderCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((d) => setCount(typeof d.count === "number" ? d.count : 1234))
      .catch(() => setCount(1234));
  }, []);

  useEffect(() => {
    if (count === null) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(count * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [count]);

  const formatted = display.toLocaleString("ru-RU");

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-dark)" }}>
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <div className="text-5xl sm:text-6xl mb-4">🦝</div>
        <p
          className="font-display text-2xl sm:text-4xl font-bold mb-3"
          style={{ color: "var(--cream)", lineHeight: 1.2 }}
        >
          Енотыча нашли{" "}
          <span style={{ color: "var(--teal-light)" }}>{formatted}</span>{" "}
          {pluralPeople(display)}
        </p>
        <p className="font-body text-lg sm:text-xl italic" style={{ color: "rgba(245,230,211,0.85)" }}>
          Енофья ждёт вас 💛
        </p>
      </div>
    </section>
  );
}

function pluralPeople(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "человек";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "человека";
  return "человек";
}
