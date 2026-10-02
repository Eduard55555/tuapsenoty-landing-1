import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import useSeo from "@/hooks/useSeo";
import { normalizeMapUrl, useCharacters, useMedia, useTexts } from "@/content/siteContent";

export default function MapPage() {
  const characters = useCharacters();
  const media = useMedia();
  const t = useTexts();
  const spots = characters.map((c) => ({
    slug: c.slug,
    name: c.name,
    emoji: c.emoji,
    location: c.location || "Скоро определим",
    status: c.location ? "placed" : "soon",
  }));
  const placedCount = spots.filter((s) => s.status === "placed").length;
  useSeo({
    title: "Карта Туапсеноты — где найти бронзовых енотов в Туапсе",
    description:
      "Карта расположения бронзовых енотов-хранителей по Туапсе. Узнайте, где установлен Енотыч и где появятся остальные еноты семьи.",
    path: "/map",
  });
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3"
              style={{ color: "var(--bronze)" }}>
              Карта Туапсе
            </p>
            <h1 className="section-title text-3xl sm:text-5xl mb-4">
              {t("map_title")}
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#6B4C35", lineHeight: 1.6 }}>
              {placedCount > 0 && (
                <>
                  Уже {placedCount === 1 ? "установлен" : "установлены"} <strong>{placedCount}</strong>.{" "}
                </>
              )}
              {t("map_intro")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {media.common_map && (<div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: "3px solid rgba(184,115,51,0.2)", minHeight: 420 }}>
              <iframe
                title="Карта — где найти енотов"
                src={normalizeMapUrl(media.common_map)}
                width="100%"
                height="520"
                frameBorder="0"
                allowFullScreen
                style={{ display: "block", border: 0 }}
              />
            </div>)}

            <div className={`space-y-3 ${media.common_map ? "" : "lg:col-span-3 grid sm:grid-cols-2 gap-3 space-y-0"}`}>
              {spots.map((s) => {
                const isPlaced = s.status === "placed";
                return (
                  <div
                    key={s.slug}
                    className="w-full text-left rounded-2xl p-4 flex items-center gap-3"
                    style={{
                      background: "#fff",
                      border: "2px solid rgba(184,115,51,0.15)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-display font-bold text-lg leading-tight"
                        style={{ color: "var(--warm-dark)" }}>
                        {s.name}
                      </span>
                      <span className="block font-body text-sm truncate" style={{ color: "#6B4C35" }}>
                        {s.location}
                      </span>
                    </span>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-body text-xs font-bold"
                      style={{
                        background: isPlaced ? "rgba(46,92,110,0.12)" : "rgba(184,115,51,0.12)",
                        color: isPlaced ? "var(--sea)" : "var(--bronze)",
                      }}>
                      <Icon name={isPlaced ? "Check" : "Clock"} size={13} />
                      {isPlaced ? "Уже здесь" : "Скоро"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}