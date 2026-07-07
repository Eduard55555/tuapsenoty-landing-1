import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import PhoneLink from "@/components/PhoneLink";
import useSeo from "@/hooks/useSeo";

interface Sponsor {
  name: string;
  logo: string;
  logoImage?: string;
  photo?: string;
  photo2?: string;
  category: string;
  description: string;
  services: string[];
  highlights?: { icon: string; label: string }[];
  routeUrl?: string;
  address?: string;
  url: string;
  urlLabel?: string;
  color: string;
  isVacant?: boolean;
  featured?: boolean;
}

const sponsors: Sponsor[] = [
  {
    name: "Рестобар V*MESTE — первый дом Енофьи",
    logo: "🤝",
    logoImage: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/4cc69fd9-1c78-40a2-9826-e9567456a31d.png",
    photo: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/3fad70de-3731-4c1a-9d2a-455db8c25d6c.png",
    photo2: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/cbf8bf6f-5924-4d6e-a928-e4a7b785e8ed.png",
    category: "Рестобар · Партнёр",
    description:
      "С огромной радостью объявляем о начале сотрудничества с рестобаром V*MESTE! Рестобар V*MESTE — первый дом Енофьи. Именно здесь временно поселилась наша бронзовая бабушка — это её первый «тестовый дом» в городе. V*MESTE — место, где вкусно кормят и создают настоящую атмосферу уюта для семейного отдыха. Идеальное пространство для хлебосольной Енофьи, которая тоже всегда рада гостям. Загляните, чтобы поздороваться с Енофьей, сфотографироваться с ней и попробовать знаменитую пиццу и десерты. А ещё здесь варят отличный кофе — так что можно не торопиться, взять чашку капучино и посидеть рядом с Енофьей, пока она привыкает к новой компании.",
    services: [
      "Первый дом бронзовой Енофьи",
      "Знаменитая пицца и десерты",
      "Уютная семейная атмосфера",
    ],
    highlights: [
      { icon: "Coffee", label: "Кофе" },
      { icon: "Pizza", label: "Пицца" },
      { icon: "Heart", label: "Енофья" },
    ],
    routeUrl: "https://yandex.ru/maps/?text=Туапсе, Морской бульвар, 3",
    address: "г. Туапсе, Морской бульвар, 3",
    url: "/characters/enofya",
    urlLabel: "Познакомиться с Енофьей",
    color: "from-amber-100 to-teal-100",
    featured: true,
  },
  {
    name: "Здесь может быть ваш бизнес",
    logo: "✨",
    category: "Свободное место",
    description:
      "Это место ждёт своего хозяина. Поселите бронзового енота у входа — и гости начнут искать именно вас.",
    services: [],
    url: "mailto:sen555551@mail.ru?subject=Хочу стать партнёром проекта «Туапсеноты»",
    color: "from-amber-100 to-yellow-100",
    isVacant: true,
  },
  {
    name: "Здесь может быть ваш бизнес",
    logo: "✨",
    category: "Свободное место",
    description:
      "Это место ждёт своего хозяина. Поселите бронзового енота у входа — и гости начнут искать именно вас.",
    services: [],
    url: "mailto:sen555551@mail.ru?subject=Хочу стать партнёром проекта «Туапсеноты»",
    color: "from-cyan-100 to-blue-100",
    isVacant: true,
  },
  {
    name: "Здесь может быть ваш бизнес",
    logo: "✨",
    category: "Свободное место",
    description:
      "Это место ждёт своего хозяина. Поселите бронзового енота у входа — и гости начнут искать именно вас.",
    services: [],
    url: "mailto:sen555551@mail.ru?subject=Хочу стать партнёром проекта «Туапсеноты»",
    color: "from-rose-100 to-orange-100",
    isVacant: true,
  },
];

export default function Sponsors() {
  useSeo({
    title: "Партнёры Туапсеноты — компании, поддержавшие проект",
    description:
      "Компании-партнёры, которые помогли бронзовым енотам найти дом в Туапсе. Рекомендуем кафе, кофейни и сервисы города.",
    path: "/sponsors",
  });
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🤝</div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
              Наши партнёры
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto mb-3" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Компании, которые помогли енотам найти дом в Туапсе. Заодно — сделали так,
              чтобы вы знали, куда зайти за хорошим кофе, свежей выпечкой или приятным обслуживанием.
            </p>
            <p className="font-body text-lg max-w-2xl mx-auto font-semibold" style={{ color: "var(--bronze)" }}>
              Мы их рекомендуем. И вы тоже присмотритесь. 💛
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {sponsors.map((s, i) => (
              <div key={i}
                className={`rounded-3xl overflow-hidden card-hover flex flex-col ${s.featured ? "sm:col-span-2 lg:col-span-3" : ""}`}
                style={{
                  background: s.isVacant
                    ? "rgba(255,255,255,0.6)"
                    : s.featured
                    ? "linear-gradient(135deg, #FBF3E4, #FDF8EF)"
                    : "#fff",
                  border: s.isVacant
                    ? "2px dashed rgba(184,115,51,0.4)"
                    : s.featured
                    ? "2px solid var(--bronze)"
                    : "1px solid rgba(184,115,51,0.15)",
                }}>
                <div className={`${s.featured ? "sm:flex" : "flex flex-col"}`}>
                  <div className={`flex-shrink-0 flex flex-col ${s.featured ? "sm:w-72" : "w-full"}`}>
                    <div className={`${s.logoImage ? "bg-white" : `bg-gradient-to-br ${s.color}`} flex items-center justify-center p-6`}
                      style={{ minHeight: "140px" }}>
                      {s.logoImage ? (
                        <img src={s.logoImage} alt={s.name}
                          className="object-contain w-full max-h-40" />
                      ) : (
                        <span className="text-6xl">{s.logo}</span>
                      )}
                    </div>
                    {s.photo && (
                      <img src={s.photo} alt={`${s.name} — вывеска`}
                        className="w-full object-contain" />
                    )}
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
                    <div className="space-y-2 mb-4">
                      {s.services.map((srv, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Icon name="Check" size={16} style={{ color: "var(--sea)" }} />
                          <span className="font-body text-sm" style={{ color: "#5A3E2B" }}>
                            {srv}
                          </span>
                        </div>
                      ))}
                    </div>
                    {s.highlights && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {s.highlights.map((h, j) => (
                          <span key={j}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-sm font-bold"
                            style={{
                              background: "#fff",
                              color: "var(--bronze)",
                              border: "1.5px solid rgba(184,115,51,0.35)",
                              boxShadow: "0 2px 8px rgba(184,115,51,0.12)",
                            }}>
                            <Icon name={h.icon} size={16} style={{ color: "var(--bronze)" }} />
                            {h.label}
                          </span>
                        ))}
                      </div>
                    )}
                    {s.address && (
                      <div className="flex items-center gap-2 mb-5">
                        <Icon name="MapPin" size={16} style={{ color: "var(--bronze)" }} />
                        <span className="font-body text-sm font-semibold" style={{ color: "var(--bronze)" }}>
                          {s.address}
                        </span>
                      </div>
                    )}
                    {s.photo2 && (
                      <img src={s.photo2} alt={`${s.name} — Енофья в зале`}
                        className="w-full rounded-2xl object-cover mb-5" />
                    )}
                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      <a href={s.url}
                        target={s.url.startsWith("http") || s.url.startsWith("mailto") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="btn-primary text-sm justify-center flex-1"
                        style={s.isVacant ? { background: "linear-gradient(135deg, var(--teal), var(--sea-light))", color: "var(--warm-dark)", boxShadow: "0 4px 15px rgba(64,224,208,0.4)" } : undefined}>
                        <Icon name={s.isVacant ? "Sparkles" : s.featured ? "Heart" : "ExternalLink"} size={16} />
                        {s.urlLabel || (s.isVacant ? "Стать партнёром" : "Подробнее")}
                      </a>
                      {s.routeUrl && (
                        <a href={s.routeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm justify-center flex-1"
                          style={{ background: "linear-gradient(135deg, #FF6B35, #FF9558)", color: "#fff", boxShadow: "0 4px 15px rgba(255,107,53,0.4)" }}>
                          <Icon name="MapPin" size={16} />
                          📍 Построить маршрут
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-8 sm:p-12"
            style={{ background: "linear-gradient(135deg, var(--sea), var(--sea-light))" }}>
            <div className="text-center">
              <div className="text-4xl mb-4">💛</div>
              <h2 className="font-display text-3xl font-bold mb-4" style={{ color: "var(--cream)" }}>
                Хотите, чтобы бронзовая скульптура стояла у вашего бизнеса?
              </h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-3 mb-8">
              <p className="font-body text-base" style={{ color: "rgba(245,230,211,0.95)", lineHeight: 1.7 }}>
                Проект «Туапсеноты» — это не просто фигурки. Это люди, которые их ищут.
                И те, кто попадается им на пути.
              </p>
              <p className="font-body text-base" style={{ color: "rgba(245,230,211,0.95)", lineHeight: 1.7 }}>
                Если вы хотите процветания своему бизнесу и «вечной» бесплатной рекламы —
                давайте обсудим, как уникальная бронзовая скульптура может поселиться у вашего входа.
              </p>
            </div>

            <div className="max-w-md mx-auto mb-8">
              <p className="font-body text-sm font-bold uppercase tracking-wider mb-4 text-center"
                style={{ color: "var(--teal-light)" }}>
                Что вы получите
              </p>
              <div className="space-y-3">
                {[
                  "Гостей, которые не проходят мимо",
                  "Упоминания в соцсетях и прессе",
                  "Место на этой странице",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={20} style={{ color: "var(--teal-light)" }} />
                    </span>
                    <span className="font-body text-base" style={{ color: "var(--cream)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:sen555551@mail.ru?subject=Хочу стать партнёром проекта «Туапсеноты»"
                className="btn-primary inline-flex">
                <Icon name="Mail" size={18} />
                Написать на почту
              </a>
              <PhoneLink className="btn-secondary inline-flex cursor-pointer" iconSize={18} />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}