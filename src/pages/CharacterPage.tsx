import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ARHologram from "@/components/ARHologram";
import { FINDER_API, FINDER_BASE, CHARACTER_API, pluralPeople } from "@/hooks/useFinderCount";
import { characters } from "@/pages/index/indexData";
import useSeo from "@/hooks/useSeo";

const OWN_COUNTER_SLUGS: string[] = ["enira"];
const NO_LOCATION_LABEL_SLUGS: string[] = [];

export { characters };

export default function CharacterPage() {
  const { slug } = useParams<{ slug: string }>();
  const char = characters.find((c) => c.slug === slug);
  const hasOwnCounter = !!slug && OWN_COUNTER_SLUGS.includes(slug);
  const [arOpen, setArOpen] = useState(false);
  const [foundCount, setFoundCount] = useState<number | null>(hasOwnCounter ? 0 : null);

  useEffect(() => {
    if (!slug) return;
    if (!hasOwnCounter && !char?.location) return;

    const today = new Date().toISOString().slice(0, 10);
    const key = `found-${slug}`;
    const cacheKey = `found-count-${slug}`;

    const cached = localStorage.getItem(cacheKey);
    if (cached !== null && !Number.isNaN(Number(cached))) {
      setFoundCount(Number(cached));
    }

    let shouldIncrement: boolean;
    if (hasOwnCounter) {
      // Енофья: засчитываем любой заход на её страницу не чаще раза в день на устройство
      // (QR у статуэтки ведёт на /characters/enofya без параметров)
      shouldIncrement = localStorage.getItem(key) !== today;
    } else {
      shouldIncrement = !localStorage.getItem(key);
    }
    const method = shouldIncrement ? "POST" : "GET";

    const url = hasOwnCounter
      ? `${CHARACTER_API}?slug=${encodeURIComponent(slug)}`
      : FINDER_API;

    fetch(url, { method, cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        // отметку ставим только после УСПЕШНОГО прибавления, чтобы засчёт не «сгорал» при сбое сети
        if (shouldIncrement && typeof d.count === "number") {
          localStorage.setItem(key, hasOwnCounter ? today : "1");
        }
        if (typeof d.count === "number") {
          const value = d.count + FINDER_BASE;
          localStorage.setItem(cacheKey, String(value));
          setFoundCount(value);
        }
      })
      .catch(() => {});
  }, [slug, char?.location, hasOwnCounter]);

  useSeo({
    title: char
      ? `${char.name} — ${char.role} | Туапсеноты`
      : "Персонаж не найден | Туапсеноты",
    description: char
      ? `${char.name} (${char.role}) — бронзовый енот-хранитель Туапсе. ${char.description}`.slice(0, 160)
      : "Бронзовые еноты-хранители Туапсе.",
    path: `/characters/${slug || ""}`,
    image: char?.image,
  });

  if (!char) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cream)" }}>
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🦝</div>
          <h1 className="font-display text-3xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
            Персонаж не найден
          </h1>
          <Link to="/#characters" className="btn-primary inline-flex">
            <Icon name="ArrowLeft" size={18} />
            Вернуться к семье
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${char.color} mb-8`}
            style={{ border: "1px solid rgba(184,115,51,0.15)" }}>
            <img
              src={char.image}
              alt={char.name}
              className="w-full object-cover"
              style={{ maxHeight: "420px", objectPosition: "top" }}
            />
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{char.emoji}</div>
                <h1 className="font-display text-4xl font-bold mb-1" style={{ color: "var(--warm-dark)" }}>
                  {char.name}
                </h1>
                <p className="font-body text-lg font-semibold" style={{ color: "var(--bronze)" }}>
                  {char.role}
                </p>
                {char.location ? (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Icon name="MapPin" size={14} />
                    <span className="font-body text-sm" style={{ color: "var(--sea)" }}>
                      {char.location}
                    </span>
                  </div>
                ) : !hasOwnCounter && !NO_LOCATION_LABEL_SLUGS.includes(slug || "") ? (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Icon name="Clock" size={14} />
                    <span className="font-body text-sm" style={{ color: "var(--bronze)" }}>
                      Скоро появится в городе
                    </span>
                  </div>
                ) : null}
                {foundCount !== null && (
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 mt-4"
                    style={{ backgroundColor: "rgba(184,115,51,0.12)", border: "1px solid rgba(184,115,51,0.3)" }}
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                        style={{ backgroundColor: "var(--bronze)" }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{ backgroundColor: "var(--bronze)" }}
                      />
                    </span>
                    <span className="font-body text-sm" style={{ color: "#5A3E2B" }}>
                      Меня нашли уже
                    </span>
                    <span className="font-display font-bold text-base tabular-nums" style={{ color: "var(--bronze)" }}>
                      {foundCount.toLocaleString("ru-RU")}
                    </span>
                    <span className="font-body text-sm" style={{ color: "#5A3E2B" }}>
                      {pluralPeople(foundCount)}
                    </span>
                  </div>
                )}
              </div>

              <p className="font-body text-base text-center mb-6" style={{ color: "#5A3E2B", lineHeight: 1.8 }}>
                {char.description}
              </p>

              <div className="rounded-2xl p-5 text-center"
                style={{ backgroundColor: "rgba(184,115,51,0.1)", border: "1px dashed rgba(184,115,51,0.3)" }}>
                <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--bronze)" }}>
                  🪄 Ритуал
                </p>
                <p className="font-body text-sm italic" style={{ color: "#6B4C35", lineHeight: 1.7 }}>
                  {char.ritual}
                </p>
              </div>

              {(char as { map?: string }).map && (
                <div className="mt-6">
                  <p className="font-body text-sm font-bold mb-3 text-center" style={{ color: "var(--bronze)" }}>
                    📍 Где меня найти
                  </p>
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(184,115,51,0.2)" }}>
                    <iframe
                      src={(char as { map?: string }).map}
                      width="100%"
                      height="240"
                      frameBorder={0}
                      title={`${char.name} на карте`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center flex flex-col items-center gap-4">
            <button onClick={() => setArOpen(true)} className="btn-primary inline-flex"
              style={{ background: "linear-gradient(135deg, var(--sea), var(--teal))" }}>
              <Icon name="Sparkles" size={18} />
              Оживить {char.name === "Енофья" ? "Енофью" : char.name === "Тыдочка" ? "Тыдочку" : char.name === "Енира" ? "Ениру" : char.name + "а"} в AR
            </button>
            <a href="/shop" className="btn-primary inline-flex">
              <Icon name="ShoppingCart" size={18} />
              Купить статуэтку {char.name === "Енофья" ? "Енофьи" : char.name === "Тыдочка" ? "Тыдочки" : char.name === "Енира" ? "Ениры" : char.name + "а"}
            </a>
          </div>

        </div>
      </main>

      {arOpen && (
        <ARHologram
          image={char.image}
          video={(char as { video?: string }).video}
          name={char.name}
          onClose={() => setArOpen(false)}
        />
      )}

      <SiteFooter />
    </div>
  );
}