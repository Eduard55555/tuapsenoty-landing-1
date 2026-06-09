import { useState } from "react";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

interface Spot {
  slug: string;
  name: string;
  emoji: string;
  location: string;
  status: "placed" | "soon";
  coords: [number, number];
}

const spots: Spot[] = [
  { slug: "enotych", name: "Енотыч", emoji: "🎣", location: "Набережная", status: "placed", coords: [44.093, 39.072] },
  { slug: "enofya", name: "Енофья", emoji: "🧺", location: "Скоро определим", status: "soon", coords: [44.1, 39.08] },
  { slug: "tuapsey", name: "Туапсей", emoji: "🧭", location: "Скоро определим", status: "soon", coords: [44.105, 39.075] },
  { slug: "enira", name: "Енира", emoji: "🐚", location: "Скоро определим", status: "soon", coords: [44.095, 39.085] },
  { slug: "tydochka", name: "Тыдочка", emoji: "🌅", location: "Скоро определим", status: "soon", coords: [44.102, 39.068] },
  { slug: "enovey", name: "Еновей", emoji: "🗺️", location: "Скоро определим", status: "soon", coords: [44.088, 39.078] },
  { slug: "enosik", name: "Еносик", emoji: "🪸", location: "Скоро определим", status: "soon", coords: [44.097, 39.062] },
  { slug: "enosha", name: "Еноша", emoji: "⚓", location: "Скоро определим", status: "soon", coords: [44.108, 39.082] },
];

const placedCount = spots.filter((s) => s.status === "placed").length;

function buildMapSrc(spot: Spot): string {
  const [lat, lon] = spot.coords;
  const ll = `${lon},${lat}`;
  const pt = `${lon},${lat},pm2rdm`;
  return `https://yandex.ru/map-widget/v1/?ll=${ll}&z=16&pt=${pt}`;
}

export default function MapPage() {
  const [active, setActive] = useState<Spot>(spots[0]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--bronze)" }}>
              Карта Туапсе
            </p>
            <h1 className="section-title text-3xl sm:text-5xl mb-4">
              Где найти енотов
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#6B4C35", lineHeight: 1.6 }}>
              Восемь бронзовых хранителей поселятся по всему городу. Уже установлен{" "}
              <strong>{placedCount}</strong> — остальные скоро займут свои места.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: "3px solid rgba(184,115,51,0.2)", minHeight: 420 }}>
              <iframe
                key={active.slug}
                title={`Карта — ${active.name}`}
                src={buildMapSrc(active)}
                width="100%"
                height="520"
                frameBorder="0"
                allowFullScreen
                style={{ display: "block", border: 0 }}
              />
            </div>

            <div className="space-y-3">
              {spots.map((s) => {
                const isActive = s.slug === active.slug;
                const isPlaced = s.status === "placed";
                return (
                  <button
                    key={s.slug}
                    onClick={() => setActive(s)}
                    className="w-full text-left rounded-2xl p-4 transition-all flex items-center gap-3"
                    style={{
                      background: isActive ? "linear-gradient(135deg, var(--teal-light), var(--teal))" : "#fff",
                      border: isActive ? "2px solid var(--teal)" : "2px solid rgba(184,115,51,0.15)",
                      boxShadow: isActive ? "0 6px 18px rgba(64,224,208,0.35)" : "0 2px 8px rgba(0,0,0,0.05)",
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
                      {isPlaced ? "Установлен" : "Скоро"}
                    </span>
                  </button>
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
