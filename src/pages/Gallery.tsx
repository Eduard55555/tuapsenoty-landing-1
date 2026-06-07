import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import { characters } from "./CharacterPage";

export default function Gallery() {
  const placed = characters.filter((c) => c.location);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
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
            <Link to="/"
              className="flex items-center gap-2 font-body text-sm font-semibold"
              style={{ color: "var(--bronze)" }}>
              <Icon name="ArrowLeft" size={16} />
              На главную
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">📸</div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
              Галерея
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Бронзовые еноты, которые уже нашли своё место в Туапсе. Приходите в гости —
              потрите на удачу и загадайте желание.
            </p>
          </div>

          {placed.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🏗️</div>
              <p className="font-body text-lg" style={{ color: "#6B4C35" }}>
                Скоро здесь появятся фото установленных скульптур. Следите за новостями!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {placed.map((c) => (
                <Link key={c.slug} to={`/characters/${c.slug}`}
                  className="rounded-3xl overflow-hidden card-hover flex flex-col"
                  style={{ background: "#fff", border: "1px solid rgba(184,115,51,0.15)" }}>
                  <div className={`bg-gradient-to-br ${c.color}`}>
                    <img src={c.image} alt={c.name}
                      className="w-full object-cover"
                      style={{ height: "260px", objectPosition: "top" }} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-2xl font-bold mb-1" style={{ color: "var(--warm-dark)" }}>
                      {c.emoji} {c.name}
                    </h3>
                    <p className="font-body text-sm font-semibold mb-2" style={{ color: "var(--bronze)" }}>
                      {c.role}
                    </p>
                    <div className="flex items-center gap-1 mt-auto">
                      <Icon name="MapPin" size={14} style={{ color: "var(--sea)" }} />
                      <span className="font-body text-sm" style={{ color: "var(--sea)" }}>
                        {c.location}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
