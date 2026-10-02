import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import useSeo from "@/hooks/useSeo";
import { MAX_URL, VK_URL } from "@/components/SocialLinks";

type ActiveContest = {
  title: string;
  rules: string;
  deadline: string;
  voting: string;
  prize: string;
  link: string;
};

const ACTIVE = null as ActiveContest | null;

const UPCOMING = [
  "Конкурс на лучшую историю о Енотыче",
  "Конкурс на лучшее фото с Енирой и Тыдочкой",
  "Конкурс на лучшее название для нового енота",
];

const STEPS = [
  { icon: "BellRing", text: "Подпишитесь на наш канал в MAX или ВКонтакте" },
  { icon: "Megaphone", text: "Следите за анонсами конкурсов" },
  { icon: "Camera", text: "Присылайте фото, истории или идеи" },
  { icon: "Gift", text: "Побеждайте и получайте призы!" },
];

const Badge = ({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) => (
  <span className="inline-block font-body text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: bg, color }}>
    {children}
  </span>
);

const card = { backgroundColor: "#fff", border: "1px solid rgba(184,115,51,0.18)" };

export default function Contests() {
  useSeo({
    title: "Конкурсы Туапсенотов — фото, истории и призы",
    description:
      "Конкурсы Туапсенотов: присылайте фото, истории и идеи о бронзовых енотах Туапсе. Итоги фотоконкурса сентября 2026 и анонсы новых конкурсов.",
    path: "/contests",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center mb-4">
            <div className="text-5xl mb-4">🏆</div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
              Конкурсы Туапсенотов
            </h1>
            <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Здесь мы собираем ваши истории, фото и идеи. Участвуйте — и попадёте в бронзовую летопись города.
            </p>
          </div>

          <section className="rounded-3xl p-6 sm:p-8" style={card}>
            <Badge bg="rgba(46,139,87,0.12)" color="#2E7D32">Завершён</Badge>
            <h2 className="font-display text-xl sm:text-2xl font-bold mt-3 mb-4" style={{ color: "var(--warm-dark)" }}>
              📸 Фотоконкурс «Туапсеноты» (сентябрь 2026)
            </h2>
            <p className="font-body mb-5" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Мы провели первый конкурс фотографий с нашими бронзовыми хранителями. Вы прислали 33 работы — тёплые,
              смешные и трогательные. Спасибо каждому!
            </p>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { v: "33", l: "работы" },
                { v: "№8", l: "победитель" },
                { v: "103", l: "голоса" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl py-4 text-center" style={{ backgroundColor: "var(--sand)" }}>
                  <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "var(--bronze)" }}>
                    {s.v}
                  </div>
                  <div className="font-body text-xs sm:text-sm" style={{ color: "#6B4C35" }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <p className="font-body mb-6" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Голосование проходило в MAX и ВКонтакте. Все работы добавлены в нашу галерею.
            </p>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-white"
              style={{ background: "var(--bronze)" }}
            >
              <Icon name="Images" size={18} />
              Смотреть все работы
            </Link>
          </section>

          {ACTIVE ? (
            <section className="rounded-3xl p-6 sm:p-8" style={{ ...card, border: "2px solid var(--bronze)" }}>
              <Badge bg="var(--bronze)" color="#fff">Идёт сейчас</Badge>
              <h2 className="font-display text-xl sm:text-2xl font-bold mt-3 mb-4" style={{ color: "var(--warm-dark)" }}>
                🏆 {ACTIVE.title}
              </h2>
              <p className="font-body mb-5 whitespace-pre-line" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
                {ACTIVE.rules}
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {[
                  { icon: "Inbox", label: "Приём работ", value: `до ${ACTIVE.deadline}` },
                  { icon: "Vote", label: "Голосование", value: ACTIVE.voting },
                  { icon: "Gift", label: "Приз", value: ACTIVE.prize },
                ].map((r) => (
                  <div key={r.label} className="rounded-2xl p-4" style={{ backgroundColor: "var(--sand)" }}>
                    <div className="flex items-center gap-2 font-body text-xs uppercase tracking-wider font-bold mb-1" style={{ color: "var(--bronze)" }}>
                      <Icon name={r.icon} size={14} fallback="Circle" />
                      {r.label}
                    </div>
                    <div className="font-body font-semibold" style={{ color: "var(--warm-dark)" }}>
                      {r.value}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={ACTIVE.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-white"
                style={{ background: "var(--bronze)" }}
              >
                <Icon name="Send" size={18} />
                Участвовать
              </a>
            </section>
          ) : (
            <section className="rounded-3xl p-6 sm:p-8" style={{ ...card, border: "2px dashed rgba(184,115,51,0.4)" }}>
              <Badge bg="var(--bronze)" color="#fff">Скоро</Badge>
              <h2 className="font-display text-xl sm:text-2xl font-bold mt-3 mb-3" style={{ color: "var(--warm-dark)" }}>
                🏆 Новый конкурс
              </h2>
              <p className="font-body" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
                Следите за анонсами. Будет интересно!
              </p>
            </section>
          )}

          <section className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: "var(--sand)", border: "1px solid rgba(184,115,51,0.18)" }}>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
              🔜 Что будет дальше
            </h2>
            <ul className="space-y-3 mb-4">
              {UPCOMING.map((t) => (
                <li key={t} className="flex items-start gap-3 font-body" style={{ color: "#3d2b1f", lineHeight: 1.6 }}>
                  <Icon name="Sparkles" size={18} className="mt-1 shrink-0" style={{ color: "var(--bronze)" }} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="font-body font-semibold" style={{ color: "#5A3E2B" }}>
              Следите за новостями!
            </p>
          </section>

          <section className="rounded-3xl p-6 sm:p-8" style={card}>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-5" style={{ color: "var(--warm-dark)" }}>
              Как участвовать?
            </h2>
            <ol className="grid sm:grid-cols-2 gap-3 mb-6">
              {STEPS.map((s, i) => (
                <li key={s.text} className="flex items-start gap-3 rounded-2xl p-4" style={{ backgroundColor: "var(--cream)" }}>
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-white"
                    style={{ background: "var(--bronze)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-body pt-1.5" style={{ color: "#3d2b1f", lineHeight: 1.5 }}>
                    {s.text}
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3">
              <a
                href={MAX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-white"
                style={{ background: "#7C4DFF" }}
              >
                <Icon name="MessageCircle" size={18} />
                Подписаться в MAX
              </a>
              <a
                href={VK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-white"
                style={{ background: "#0077FF" }}
              >
                <Icon name="Users" size={18} />
                Подписаться во ВКонтакте
              </a>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}