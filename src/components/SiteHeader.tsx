import { useState } from "react";
import Icon from "@/components/ui/icon";
import InstallButton from "@/components/InstallButton";
import { PLANETA_URL } from "@/pages/index/indexData";

const LINKS: [string, string][] = [
  ["О проекте", "/#about"],
  ["Персонажи", "/#characters"],
  ["Карта", "/map"],
  ["Галерея", "/gallery"],
  ["Как помочь", "/#help"],
  ["Новости", "/#news"],
];

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
            <a href="/sponsors"
              className="font-body text-sm px-3 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap transition-transform hover:scale-105"
              style={{ color: "var(--warm-dark)", fontWeight: 800, background: "linear-gradient(135deg, var(--teal-light), var(--teal))", letterSpacing: "0.02em", boxShadow: "0 2px 10px rgba(64,224,208,0.4)" }}>
              💛 Наши партнёры ✨
            </a>
            <a href="/shop"
              className="font-body text-sm px-3 py-1 rounded-full transition-colors whitespace-nowrap"
              style={{ color: "white", fontWeight: 800, backgroundColor: "var(--bronze)", letterSpacing: "0.02em" }}>
              🛒 Магазин
            </a>
            {LINKS.map(([label, href], i) => {
              const teal = i % 2 === 0;
              return (
                <a key={label} href={href}
                  className="font-body text-sm px-3 py-1 rounded-full whitespace-nowrap transition-transform hover:scale-105"
                  style={teal
                    ? { color: "var(--warm-dark)", fontWeight: 800, background: "linear-gradient(135deg, var(--teal-light), var(--teal))", letterSpacing: "0.02em", boxShadow: "0 2px 10px rgba(64,224,208,0.4)" }
                    : { color: "white", fontWeight: 800, backgroundColor: "var(--bronze)", letterSpacing: "0.02em" }}>
                  {label}
                </a>
              );
            })}
            <InstallButton
              label="Установить"
              className="font-body text-sm px-3 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap transition-transform hover:scale-105"
              style={{ color: "var(--warm-dark)", fontWeight: 700, border: "1px solid rgba(184,115,51,0.4)" }}
            />
            {showCart && (
              <a href="/cart" className="btn-primary text-sm px-3 py-1 whitespace-nowrap">
                <Icon name="ShoppingCart" size={16} />
                Корзина
              </a>
            )}
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
          <a href="/sponsors"
            className="block font-body py-2 px-3 rounded-xl text-center"
            style={{ color: "var(--warm-dark)", fontWeight: 800, background: "linear-gradient(135deg, var(--teal-light), var(--teal))" }}
            onClick={() => setMenuOpen(false)}>
            💛 Наши партнёры ✨
          </a>
          <a href="/shop"
            className="block font-body py-2 px-3 rounded-xl text-center"
            style={{ color: "white", fontWeight: 800, backgroundColor: "var(--bronze)" }}
            onClick={() => setMenuOpen(false)}>
            🛒 Магазин
          </a>
          {LINKS.map(([label, href]) => (
            <a key={label} href={href}
              className="block font-body font-semibold py-2"
              style={{ color: "var(--warm-dark)" }}
              onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <InstallButton
            className="font-body text-sm w-full justify-center mt-2 inline-flex items-center gap-2 py-2 rounded-full"
            style={{ color: "var(--warm-dark)", fontWeight: 700, border: "1px solid rgba(184,115,51,0.4)" }}
            onClick={() => setMenuOpen(false)}
          />
          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary text-sm w-full justify-center mt-2">
            <Icon name="Heart" size={16} />
            Поддержать на Planeta.ru
          </a>
        </div>
      )}
    </header>
  );
}