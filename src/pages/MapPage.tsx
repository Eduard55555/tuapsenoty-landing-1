import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { characters } from "./index/indexData";

type Char = (typeof characters)[number] & { coords?: [number, number] };

const TUAPSE: [number, number] = [44.0985, 39.078];

function osmEmbed(center: [number, number], zoomSpan = 0.02) {
  const [lat, lon] = center;
  const left = lon - zoomSpan;
  const right = lon + zoomSpan;
  const top = lat + zoomSpan / 2;
  const bottom = lat - zoomSpan / 2;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lon}`;
}

export default function MapPage() {
  const installed = (characters as Char[]).filter((c) => c.coords);
  const pending = (characters as Char[]).filter((c) => !c.coords);

  const [active, setActive] = useState<Char | null>(installed[0] ?? null);
  const center = active?.coords ?? TUAPSE;

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: "var(--cream)" }}>
      <iframe
        title="Карта енотов Туапсе"
        src={osmEmbed(center)}
        className="absolute inset-0 w-full h-full border-0 z-0"
      />

      <Link to="/"
        className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 font-body font-bold text-sm px-4 py-2 rounded-full shadow-lg"
        style={{ backgroundColor: "var(--cream)", color: "var(--warm-dark)", border: "1px solid rgba(184,115,51,0.3)" }}>
        <Icon name="ArrowLeft" size={18} />
        На главную
      </Link>

      <div className="absolute top-4 right-4 z-20 w-[280px] max-w-[calc(100%-2rem)] rounded-2xl shadow-xl p-4"
        style={{ backgroundColor: "rgba(253,246,238,0.97)", border: "1px solid rgba(184,115,51,0.25)", backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="MapPin" size={18} style={{ color: "var(--bronze)" }} />
          <span className="font-display text-lg font-bold" style={{ color: "var(--warm-dark)" }}>
            Карта енотов
          </span>
        </div>
        <p className="font-body text-xs mb-3" style={{ color: "#6B4C35" }}>
          Установлено: <b style={{ color: "var(--bronze)" }}>{installed.length}</b> из {characters.length}.
          Нажми на енота, чтобы найти его на карте.
        </p>

        <div className="space-y-2 mb-3">
          {installed.map((c) => (
            <button key={c.slug} onClick={() => setActive(c)}
              className="w-full flex items-center gap-3 p-2 rounded-xl transition-colors text-left"
              style={{
                backgroundColor: active?.slug === c.slug ? "rgba(184,115,51,0.15)" : "transparent",
                border: active?.slug === c.slug ? "1px solid rgba(184,115,51,0.4)" : "1px solid transparent",
              }}>
              <img src={c.image} alt={c.name}
                className="w-11 h-11 rounded-lg object-cover flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-display text-base font-bold truncate" style={{ color: "var(--warm-dark)" }}>
                  {c.emoji} {c.name}
                </div>
                <div className="font-body text-[11px] truncate" style={{ color: "var(--bronze)" }}>
                  📍 {c.location}
                </div>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <a href={`/characters/${active.slug}`}
            className="block w-full text-center font-body text-sm font-bold py-2 rounded-full mb-3"
            style={{ background: "linear-gradient(135deg, var(--bronze), var(--bronze-dark))", color: "var(--cream)" }}>
            Подробнее о {active.name}
          </a>
        )}

        {pending.length > 0 && (
          <div className="pt-3" style={{ borderTop: "1px solid rgba(184,115,51,0.2)" }}>
            <div className="font-body text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--sea)" }}>
              Скоро появятся
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pending.map((c) => (
                <span key={c.slug}
                  className="inline-flex items-center gap-1 font-body text-[11px] px-2 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(46,92,110,0.1)", color: "var(--sea)" }}>
                  <span>{c.emoji}</span>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
