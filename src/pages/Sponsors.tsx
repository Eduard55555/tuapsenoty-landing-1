import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";

interface Sponsor {
  name: string;
  logo: string;
  category: string;
  description: string;
  services: string[];
  url: string;
  color: string;
}

const sponsors: Sponsor[] = [
  {
    name: "Название компании",
    logo: "🏢",
    category: "Категория услуг",
    description:
      "Короткое описание спонсора и того, чем он полезен гостям и жителям Туапсе. Здесь можно рассказать про услуги, акции и преимущества.",
    services: ["Услуга 1", "Услуга 2", "Услуга 3"],
    url: "https://example.com",
    color: "from-amber-100 to-yellow-100",
  },
  {
    name: "Название компании",
    logo: "🛍️",
    category: "Категория услуг",
    description:
      "Короткое описание спонсора и того, чем он полезен гостям и жителям Туапсе. Здесь можно рассказать про услуги, акции и преимущества.",
    services: ["Услуга 1", "Услуга 2"],
    url: "https://example.com",
    color: "from-cyan-100 to-blue-100",
  },
  {
    name: "Название компании",
    logo: "🍰",
    category: "Категория услуг",
    description:
      "Короткое описание спонсора и того, чем он полезен гостям и жителям Туапсе. Здесь можно рассказать про услуги, акции и преимущества.",
    services: ["Услуга 1", "Услуга 2", "Услуга 3"],
    url: "https://example.com",
    color: "from-rose-100 to-orange-100",
  },
];

export default function Sponsors() {
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
            <div className="text-5xl mb-4">🤝</div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
              Наши спонсоры и партнёры
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Компании, которые поддерживают проект «Туапсеноты» и делают наш город теплее.
              Рекомендуем их услуги гостям и жителям Туапсе.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {sponsors.map((s, i) => (
              <div key={i}
                className="rounded-3xl overflow-hidden card-hover flex flex-col"
                style={{ background: "#fff", border: "1px solid rgba(184,115,51,0.15)" }}>
                <div className={`bg-gradient-to-br ${s.color} flex items-center justify-center`}
                  style={{ height: "140px" }}>
                  <span className="text-6xl">{s.logo}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-body text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: "var(--bronze)" }}>
                    {s.category}
                  </p>
                  <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
                    {s.name}
                  </h3>
                  <p className="font-body text-sm mb-4" style={{ color: "#6B4C35", lineHeight: 1.6 }}>
                    {s.description}
                  </p>
                  <div className="space-y-2 mb-5">
                    {s.services.map((srv, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Icon name="Check" size={16} style={{ color: "var(--sea)" }} />
                        <span className="font-body text-sm" style={{ color: "#5A3E2B" }}>
                          {srv}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a href={s.url} target="_blank" rel="noopener noreferrer"
                    className="btn-primary text-sm mt-auto justify-center">
                    <Icon name="ExternalLink" size={16} />
                    Подробнее
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-8 sm:p-12 text-center"
            style={{ background: "linear-gradient(135deg, var(--sea), var(--sea-light))" }}>
            <div className="text-4xl mb-4">💛</div>
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--cream)" }}>
              Хотите стать спонсором?
            </h2>
            <p className="font-body text-base mb-6 max-w-xl mx-auto"
              style={{ color: "rgba(245,230,211,0.9)", lineHeight: 1.7 }}>
              Поддержите проект «Туапсеноты» и расскажите о своих услугах тысячам гостей и жителей города.
              Свяжитесь с авторами — обсудим формат сотрудничества.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:sen555551@mail.ru" className="btn-primary inline-flex">
                <Icon name="Mail" size={18} />
                Написать на почту
              </a>
              <a href="tel:+79185051617" className="btn-secondary inline-flex">
                <Icon name="Phone" size={18} />
                8-918-505-16-17
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
