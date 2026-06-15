import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import PhoneLink from "@/components/PhoneLink";

interface Sponsor {
  name: string;
  logo: string;
  category: string;
  description: string;
  services: string[];
  url: string;
  color: string;
  isVacant?: boolean;
}

const sponsors: Sponsor[] = [
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
                className="rounded-3xl overflow-hidden card-hover flex flex-col"
                style={{
                  background: s.isVacant ? "rgba(255,255,255,0.6)" : "#fff",
                  border: s.isVacant
                    ? "2px dashed rgba(184,115,51,0.4)"
                    : "1px solid rgba(184,115,51,0.15)",
                }}>
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
                    className="btn-primary text-sm mt-auto justify-center"
                    style={s.isVacant ? { background: "linear-gradient(135deg, var(--teal), var(--sea-light))", color: "var(--warm-dark)", boxShadow: "0 4px 15px rgba(64,224,208,0.4)" } : undefined}>
                    <Icon name={s.isVacant ? "Sparkles" : "ExternalLink"} size={16} />
                    {s.isVacant ? "Стать партнёром" : "Подробнее"}
                  </a>
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