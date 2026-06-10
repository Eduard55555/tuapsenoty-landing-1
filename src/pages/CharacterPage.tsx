import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ARHologram from "@/components/ARHologram";
import { FINDER_API, FINDER_BASE, pluralPeople } from "@/hooks/useFinderCount";

const characters = [
  {
    slug: "enotych",
    name: "Енотыч",
    emoji: "🎣",
    role: "Дедушка",
    description: "На набережной, встречая восходы и провожая закаты, сидит Енотыч — бронзовый рыбак с удочкой и мудрым взглядом. Он всматривается в прохожих, провожает взглядом детский смех, угадывает, о чём шепчутся влюблённые на той самой скамейке. Он знает, где сегодня особенно вкусно пахнет кофе, почему голуби устроили совет у фонтана и в какую сторону ветер уносит самые заветные желания. Енотыч ловит не рыбу — он ловит надежды, что шепчут ему в бронзовое ухо дети и ветер. Его бронза не остывает — в ней живёт тепло всех прикосновений. Енотыч знает: мечты сбываются у тех, кто имеет смелость смотреть за горизонт.",
    ritual: "Потри удочку, фуражку или лапку. Загадай желание. Енотыч верит, что оно сбудется. И это уже полдела. А Енотыч постарается сделать так, чтобы оно сбылось.",
    location: "Набережная",
    color: "from-amber-100 to-yellow-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/61957535-c6fc-42ed-be30-235d0501d01a.png",
    video: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/videos/enotych-ar.mp4",
  },
  {
    slug: "enofya",
    name: "Енофья",
    emoji: "🧺",
    role: "Бабушка",
    description: "Добрая, хлебосольная, всегда с гостинцем. В платочке и фартуке с карманами, у ног — пустая корзина, которую она уже успела раздать.",
    ritual: "Погладь корзинку — и год будет сладким. Говорят, кто улыбнётся ей в ответ — у того даже грустный день становится сладким",
    location: "",
    color: "from-rose-100 to-orange-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/7bd68cbe-1da1-45cf-bafd-0828c44078d6.png",
  },
  {
    slug: "tuapsey",
    name: "Туапсей",
    emoji: "🧭",
    role: "Папа",
    description: "Надёжный, как маяк — активный и спортивный. В кепке и комбинезоне, с компасом и биноклем. Всегда знает, куда идти.",
    ritual: "Потри его по плечу и посмотри вдаль — говорят, там на горизонте уже ждёт твоя удача",
    location: "",
    color: "from-blue-100 to-teal-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/d591b894-0720-4afe-9119-19877540c0b0.png",
  },
  {
    slug: "enira",
    name: "Енира",
    emoji: "🐚",
    role: "Мама",
    description: "Ласковая, заботливая, добрая.",
    ritual: "Обними её — и даже в пасмурный день станет солнечно",
    location: "",
    color: "from-cyan-100 to-blue-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/4362ca50-9ec3-4776-96ed-7ac9a6dcf123.png",
  },
  {
    slug: "tydochka",
    name: "Тыдочка",
    emoji: "🌅",
    role: "Дочка мечты",
    description: "Маленькая, загадочная, хранительница мечты.",
    ritual: "Потри головку — и мечты сбудутся",
    location: "",
    color: "from-pink-100 to-violet-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/26e030b8-8ffc-470b-9422-9d0f8875b67c.png",
  },
  {
    slug: "enovey",
    name: "Еновей",
    emoji: "🗺️",
    role: "Скалолаз-проказник",
    description: "Непоседа, исследователь, знает все тропы.",
    ritual: "Дотронься до его рюкзака — он зарядит тебя энергией и любопытством. Говорят, после этого даже знакомая тропа открывается с новой стороны, как будто видишь её впервые",
    location: "",
    color: "from-green-100 to-emerald-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/6c3bb954-3b8c-4404-ab87-eaab2dfc4b89.png",
  },
  {
    slug: "enosik",
    name: "Еносик",
    emoji: "🪸",
    role: "Ныряльщик-пухляш",
    description: "Тихоня, любит отдых.",
    ritual: "Посиди рядом, потри ему носик, закрой глаза или посмотри вокруг — расслабься и улыбнись миру",
    location: "",
    color: "from-sky-100 to-indigo-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/214a3f64-cbda-49f6-b733-689288c9ff6d.png",
  },
  {
    slug: "enosha",
    name: "Еноша",
    emoji: "⚓",
    role: "Весельчак и заводила",
    description: "Весельчак, заводила, любит компании.",
    ritual: "Улыбнись ему — и день станет веселее",
    location: "",
    color: "from-slate-100 to-gray-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/a3981d6a-4ab5-4b95-88d5-fa6c9f1cf3d2.png",
  },
];

export { characters };

export default function CharacterPage() {
  const { slug } = useParams<{ slug: string }>();
  const char = characters.find((c) => c.slug === slug);
  const [arOpen, setArOpen] = useState(false);
  const [foundCount, setFoundCount] = useState<number | null>(null);

  useEffect(() => {
    if (!slug || !char?.location) return;
    const key = `found-${slug}`;
    const already = localStorage.getItem(key);
    const method = already ? "GET" : "POST";
    if (!already) localStorage.setItem(key, "1");
    fetch(FINDER_API, { method, cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setFoundCount(typeof d.count === "number" ? d.count + FINDER_BASE : null))
      .catch(() => {});
  }, [slug, char?.location]);

  if (!char) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cream)" }}>
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🦝</div>
          <h1 className="font-display text-3xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
            Персонаж не найден
          </h1>
          <Link to="/#characters" className="btn-primary inline-flex">
            <Icon name="ArrowLeft" size={18} />
            Вернуться к семье
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${char.color} mb-8`}
            style={{ border: "1px solid rgba(184,115,51,0.15)" }}>
            <img
              src={char.image}
              alt={char.name}
              className="w-full object-cover"
              style={{ maxHeight: "420px", objectPosition: "top" }}
            />
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{char.emoji}</div>
                <h1 className="font-display text-4xl font-bold mb-1" style={{ color: "var(--warm-dark)" }}>
                  {char.name}
                </h1>
                <p className="font-body text-lg font-semibold" style={{ color: "var(--bronze)" }}>
                  {char.role}
                </p>
                {char.location ? (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Icon name="MapPin" size={14} />
                    <span className="font-body text-sm" style={{ color: "var(--sea)" }}>
                      {char.location}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Icon name="Clock" size={14} />
                    <span className="font-body text-sm" style={{ color: "var(--bronze)" }}>
                      Скоро появится в городе
                    </span>
                  </div>
                )}
                {foundCount !== null && (
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 mt-4"
                    style={{ backgroundColor: "rgba(184,115,51,0.12)", border: "1px solid rgba(184,115,51,0.3)" }}
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                        style={{ backgroundColor: "var(--bronze)" }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{ backgroundColor: "var(--bronze)" }}
                      />
                    </span>
                    <span className="font-body text-sm" style={{ color: "#5A3E2B" }}>
                      Меня нашли уже
                    </span>
                    <span className="font-display font-bold text-base tabular-nums" style={{ color: "var(--bronze)" }}>
                      {foundCount.toLocaleString("ru-RU")}
                    </span>
                    <span className="font-body text-sm" style={{ color: "#5A3E2B" }}>
                      {pluralPeople(foundCount)}
                    </span>
                  </div>
                )}
              </div>

              <p className="font-body text-base text-center mb-6" style={{ color: "#5A3E2B", lineHeight: 1.8 }}>
                {char.description}
              </p>

              <div className="rounded-2xl p-5 text-center"
                style={{ backgroundColor: "rgba(184,115,51,0.1)", border: "1px dashed rgba(184,115,51,0.3)" }}>
                <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--bronze)" }}>
                  🪄 Ритуал
                </p>
                <p className="font-body text-sm italic" style={{ color: "#6B4C35", lineHeight: 1.7 }}>
                  {char.ritual}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center flex flex-col items-center gap-4">
            <button onClick={() => setArOpen(true)} className="btn-primary inline-flex"
              style={{ background: "linear-gradient(135deg, var(--sea), var(--teal))" }}>
              <Icon name="Sparkles" size={18} />
              Оживить {char.name === "Енофья" ? "Енофью" : char.name === "Тыдочка" ? "Тыдочку" : char.name === "Енира" ? "Ениру" : char.name + "а"} в AR
            </button>
            <a href="/shop" className="btn-primary inline-flex">
              <Icon name="ShoppingCart" size={18} />
              Купить статуэтку {char.name === "Енофья" ? "Енофьи" : char.name === "Тыдочка" ? "Тыдочки" : char.name + "а"}
            </a>
          </div>

        </div>
      </main>

      {arOpen && (
        <ARHologram
          image={char.image}
          video={(char as { video?: string }).video}
          name={char.name}
          onClose={() => setArOpen(false)}
        />
      )}

      <SiteFooter />
    </div>
  );
}