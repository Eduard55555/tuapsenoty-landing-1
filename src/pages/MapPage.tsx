import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "@/components/ui/icon";
import { characters } from "./index/indexData";

const TUAPSE_CENTER: [number, number] = [44.0985, 39.078];

type Char = (typeof characters)[number] & { coords?: [number, number] };

export default function MapPage() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const installed = (characters as Char[]).filter((c) => c.coords);
  const pending = (characters as Char[]).filter((c) => !c.coords);

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    const map = L.map(mapEl.current, {
      center: TUAPSE_CENTER,
      zoom: 15,
      scrollWheelZoom: true,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    installed.forEach((char) => {
      if (!char.coords) return;

      const markerHtml = `
        <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#b87333,#8b5523);
            border:3px solid #fdf6ee;box-shadow:0 4px 14px rgba(0,0,0,0.35);
            display:flex;align-items:center;justify-content:center;font-size:24px;">${char.emoji}</div>
          <div style="width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;
            border-top:10px solid #8b5523;margin-top:-2px;"></div>
        </div>`;

      const icon = L.divIcon({
        html: markerHtml,
        className: "",
        iconSize: [48, 58],
        iconAnchor: [24, 58],
        popupAnchor: [0, -56],
      });

      const popupHtml = `
        <div style="width:200px;font-family:Nunito,sans-serif;text-align:center;">
          <img src="${char.image}" alt="${char.name}"
            style="width:100%;height:120px;object-fit:cover;border-radius:12px;margin-bottom:8px;" />
          <div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:#3d2b1f;">${char.name}</div>
          <div style="font-size:13px;font-weight:700;color:#b87333;margin-bottom:4px;">${char.role}</div>
          <div style="font-size:12px;color:#6B4C35;margin-bottom:10px;">📍 ${char.location}</div>
          <a href="/characters/${char.slug}"
            style="display:inline-block;background:linear-gradient(135deg,#b87333,#8b5523);color:#fdf6ee;
            text-decoration:none;font-weight:700;font-size:13px;padding:8px 18px;border-radius:50px;">
            Подробнее</a>
        </div>`;

      L.marker(char.coords, { icon }).addTo(map).bindPopup(popupHtml);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [installed]);

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: "var(--cream)" }}>
      <div ref={mapEl} className="absolute inset-0 z-0" />

      <Link to="/"
        className="absolute top-4 left-4 z-[1000] inline-flex items-center gap-2 font-body font-bold text-sm px-4 py-2 rounded-full shadow-lg"
        style={{ backgroundColor: "var(--cream)", color: "var(--warm-dark)", border: "1px solid rgba(184,115,51,0.3)" }}>
        <Icon name="ArrowLeft" size={18} />
        На главную
      </Link>

      <div className="absolute top-4 right-4 z-[1000] max-w-[260px] rounded-2xl shadow-xl p-4"
        style={{ backgroundColor: "rgba(253,246,238,0.96)", border: "1px solid rgba(184,115,51,0.25)", backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="MapPin" size={18} style={{ color: "var(--bronze)" }} />
          <span className="font-display text-lg font-bold" style={{ color: "var(--warm-dark)" }}>
            Карта енотов
          </span>
        </div>
        <p className="font-body text-xs mb-3" style={{ color: "#6B4C35" }}>
          Установлено: <b style={{ color: "var(--bronze)" }}>{installed.length}</b> из {characters.length}.
          Нажми на метку, чтобы узнать о хранителе.
        </p>

        {pending.length > 0 && (
          <div>
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
