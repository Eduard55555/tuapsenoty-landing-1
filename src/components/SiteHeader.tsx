import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PLANETA_URL } from "@/pages/index/indexData";

const LINKS: [string, string][] = [
  ["Доставка", "/delivery"],
  ["О проекте", "/#about"],
  ["Персонажи", "/#characters"],
  ["Карта", "/map"],
  ["Галерея", "/gallery"],
  ["Новости", "/#news"],
];

const HERO_STOPS: { p: number; c: [number, number, number] }[] = [
  { p: 0, c: [46, 92, 110] },
  { p: 0.25, c: [61, 122, 144] },
  { p: 0.65, c: [184, 115, 51] },
  { p: 0.85, c: [245, 160, 80] },
  { p: 1, c: [245, 230, 211] },
];

function gradientColor(t: number): [number, number, number] {
  for (let i = 0; i < HERO_STOPS.length - 1; i++) {
    const a = HERO_STOPS[i];
    const b = HERO_STOPS[i + 1];
    if (t >= a.p && t <= b.p) {
      const k = (t - a.p) / (b.p - a.p);
      return [
        Math.round(a.c[0] + (b.c[0] - a.c[0]) * k),
        Math.round(a.c[1] + (b.c[1] - a.c[1]) * k),
        Math.round(a.c[2] + (b.c[2] - a.c[2]) * k),
      ];
    }
  }
  return HERO_STOPS[HERO_STOPS.length - 1].c;
}

function gradientButtonStyle(t: number): React.CSSProperties {
  const [r, g, b] = gradientColor(t);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const color = luminance > 0.6 ? "var(--warm-dark)" : "#fff";
  return {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    color,
    fontWeight: 800,
    letterSpacing: "0.02em",
    boxShadow: `0 2px 10px rgba(${r}, ${g}, ${b}, 0.45)`,
  };
}

export default function SiteHeader({ showCart = false }: { showCart?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(253, 246, 238, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(184,115,51,0.15)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦝</span>
            <span className="font-display text-xl font-bold" style={{ color: "var(--bronze)" }}>
              Туапсеноты
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-3">
            <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary text-sm px-3 py-1 whitespace-nowrap">
              <Icon name="Heart" size={16} />
              Поддержать проект
            </a>
            {(() => {
              const items: [string, string][] = [
                ["🛒 Магазин", "/shop"],
                ...LINKS,
              ];
              return items.map(([label, href], i) => {
                const t = items.length > 1 ? i / (items.length - 1) : 0;
                return (
                  <a key={label} href={href}
                    className="font-body text-sm px-3 py-1 rounded-full whitespace-nowrap transition-transform hover:scale-105"
                    style={{ ...gradientButtonStyle(t) }}>
                    {label}
                  </a>
                );
              });
            })()}
            {showCart && (
              <a href="/cart" className="btn-primary text-sm px-3 py-1 whitespace-nowrap">
                <Icon name="ShoppingCart" size={16} />
                Корзина
              </a>
            )}
            <a href="/sponsors"
              className="font-body text-sm px-3 py-1 rounded-full whitespace-nowrap transition-transform hover:scale-105"
              style={{ color: "var(--warm-dark)", fontWeight: 800, background: "linear-gradient(135deg, var(--teal-light), var(--teal))", letterSpacing: "0.02em", boxShadow: "0 2px 10px rgba(64,224,208,0.4)" }}>
              💛 Стать партнёром ✨
            </a>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {showCart && (
              <a href="/cart" className="btn-primary text-sm px-3 py-2">
                <Icon name="ShoppingCart" size={18} />
              </a>
            )}
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "var(--bronze)" }}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 space-y-3"
          style={{ borderTop: "1px solid rgba(184,115,51,0.15)" }}>
          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary text-sm w-full justify-center">
            <Icon name="Heart" size={16} />
            Поддержать на Planeta.ru
          </a>
          {(() => {
            const items: [string, string][] = [
              ["🛒 Магазин", "/shop"],
              ...LINKS,
            ];
            return items.map(([label, href], i) => {
              const t = items.length > 1 ? i / (items.length - 1) : 0;
              return (
                <a key={label} href={href}
                  className="block font-body py-2 px-3 rounded-xl text-center"
                  style={{ ...gradientButtonStyle(t) }}
                  onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              );
            });
          })()}
          <a href="/sponsors"
            className="block font-body py-2 px-3 rounded-xl text-center mt-2"
            style={{ color: "var(--warm-dark)", fontWeight: 800, background: "linear-gradient(135deg, var(--teal-light), var(--teal))", boxShadow: "0 2px 10px rgba(64,224,208,0.4)" }}
            onClick={() => setMenuOpen(false)}>
            💛 Стать партнёром ✨
          </a>
        </div>
      )}
    </header>
  );
}