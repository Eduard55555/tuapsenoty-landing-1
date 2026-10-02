import { useMemo } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import useSeo from "@/hooks/useSeo";

const CDN = "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/opt";

const photos: string[] = [
  `${CDN}/4209745dee83480c8dd7b64a526128ac.webp`,
  `${CDN}/e1d54b161225457294d5fc19435e3200.webp`,
  `${CDN}/899811b1ecba4fa7954b1dbdda5d5b67.webp`,
  ...Array.from({ length: 15 }, (_, i) => `/gallery/enotych-${i + 1}.webp`),
];

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Gallery() {
  useSeo({
    title: "Галерея Туапсеноты — фото бронзовых енотов в Туапсе",
    description:
      "Фотогалерея бронзовых енотов-хранителей, которые уже установлены в Туапсе. Найдите своего енота, потрите на удачу и загадайте желание.",
    path: "/gallery",
  });

  const items = useMemo(() => shuffle(photos), []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl sm:text-5xl mb-4">📸</div>
            <h1 className="font-display text-2xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
              Галерея
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Бронзовые еноты, которые уже нашли своё место в Туапсе. Приходите в гости —
              потрите на удачу и загадайте желание.
            </p>
          </div>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
            {items.map((url) => (
              <div
                key={url}
                className="mb-3 sm:mb-4 break-inside-avoid rounded-2xl overflow-hidden card-hover"
                style={{ border: "1px solid rgba(184,115,51,0.15)", background: "#fff" }}
              >
                <img
                  src={url}
                  alt="Бронзовый енот в Туапсе"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}