import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Icon from "@/components/ui/icon";

const PLANETA_URL = "https://planeta.ru/campaigns/244619";
const MAX_URL = "https://max.ru/join/uBdeDmv3f51WgWvFTPMWA84VIaYSgeU9yLwdr9lYO1g";
const VK_URL = "https://vk.ru/club237171594";

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
    role: "Морская плетельщица",
    description: "Ласковая, заботливая, добрая.",
    ritual: "Обними её — и даже в пасмурный день станет солнечно",
    location: "",
    color: "from-cyan-100 to-blue-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/489b20a1-045b-4b22-bbd8-f91f8c07cc2b.png",
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

const NEWS_PHOTOS = [
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/253279f9-b0f5-475d-834d-63b99c68b4b0.jpg",
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/e8e4fa3a-5863-483b-9cb1-762d643b6148.jpg",
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/e4d92eb9-6be8-457e-ac19-82c4926e846e.jpg",
];

const ENOFYA_PHOTOS = [
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/f2ed4f9c-6423-4631-a911-6b92b59e2583.jpg",
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/942e525e-ab66-4f68-a8c6-8380b1f3e60e.jpg",
];

function PhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative w-full h-64 md:h-full min-h-64">
      <img
        src={photos[idx]}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="w-2.5 h-2.5 rounded-full border-0 cursor-pointer transition-all"
            style={{ background: i === idx ? "#B8732F" : "rgba(255,255,255,0.75)" }}
          />
        ))}
      </div>
      {idx > 0 && (
        <button
          onClick={() => setIdx(idx - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border-0 cursor-pointer"
          style={{ background: "rgba(255,255,255,0.85)" }}
        >
          <Icon name="ChevronLeft" size={18} />
        </button>
      )}
      {idx < photos.length - 1 && (
        <button
          onClick={() => setIdx(idx + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border-0 cursor-pointer"
          style={{ background: "rgba(255,255,255,0.85)" }}
        >
          <Icon name="ChevronRight" size={18} />
        </button>
      )}
    </div>
  );
}

function NewsGallery() {
  return <PhotoGallery photos={NEWS_PHOTOS} alt="Енотыч в бронзе" />;
}

function EnofyaGallery() {
  return <PhotoGallery photos={ENOFYA_PHOTOS} alt="Енофья в бронзе" />;
}



export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(253, 246, 238, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(184,115,51,0.15)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <span className="text-2xl">🦝</span>
              <span className="font-display text-xl font-bold" style={{ color: "var(--bronze)" }}>
                Туапсеноты
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="/shop"
                className="font-body text-sm px-3 py-1 rounded-full transition-colors"
                style={{ color: "white", fontWeight: 800, backgroundColor: "var(--bronze)", letterSpacing: "0.02em" }}>
                🛒 Магазин
              </a>
              {[["О проекте", "#about"], ["Персонажи", "#characters"], ["Как помочь", "#help"], ["Новости", "#news"]].map(([label, href]) => (
                <a key={label} href={href}
                  className="font-body text-sm transition-colors"
                  style={{ color: "var(--warm-dark)", fontWeight: 600 }}>
                  {label}
                </a>
              ))}
            </nav>



            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "var(--bronze)" }}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 space-y-3"
            style={{ borderTop: "1px solid rgba(184,115,51,0.15)" }}>
            <a href="/shop"
              className="block font-body py-2 px-3 rounded-xl text-center"
              style={{ color: "white", fontWeight: 800, backgroundColor: "var(--bronze)" }}
              onClick={() => setMenuOpen(false)}>
              🛒 Магазин
            </a>
            {[["О проекте", "#about"], ["Персонажи", "#characters"], ["Как помочь", "#help"], ["Новости", "#news"]].map(([label, href]) => (
              <a key={label} href={href}
                className="block font-body font-semibold py-2"
                style={{ color: "var(--warm-dark)" }}
                onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary text-sm w-full justify-center mt-2">
              <Icon name="Heart" size={16} />
              Поддержать на Planeta.ru
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 texture-overlay opacity-30" />

        <div className="absolute top-20 right-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full opacity-10"
          style={{ background: "var(--teal)", filter: "blur(60px)" }} />
        <div className="absolute bottom-20 left-10 w-40 h-40 sm:w-80 sm:h-80 rounded-full opacity-15"
          style={{ background: "var(--bronze)", filter: "blur(80px)" }} />

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" style={{ fill: "var(--cream)" }}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-float mb-8 inline-block">
            <img
              src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/4362ca50-9ec3-4776-96ed-7ac9a6dcf123.png"
              alt="Енофья с малышом"
              className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-full object-cover shadow-2xl"
              style={{ border: "4px solid rgba(245, 230, 211, 0.4)" }}
            />
          </div>

          <div className="animate-fade-up">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-4"
              style={{ color: "var(--teal-light)" }}>
              Туапсе
            </p>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ color: "var(--cream)", lineHeight: 1.1 }}>
              Туапсеноты —<br />
              <em style={{ color: "var(--teal-light)" }}>новая душа</em><br />
              Черноморского побережья
            </h1>
          </div>

          <p className="animate-fade-up-delay-1 font-body text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(245,230,211,0.85)", lineHeight: 1.7 }}>
            Семья бронзовых енотов-хранителей, которая изменит Туапсе.
            Восемь персонажей с историями, ритуалами и душой.
          </p>

          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/shop"
              className="btn-primary text-base px-6 py-4 w-full sm:w-auto text-center"
              style={{ backgroundColor: "var(--bronze)" }}>
              <Icon name="ShoppingCart" size={18} />
              Перейти в магазин
            </a>
            <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-base px-6 py-4 w-full sm:w-auto text-center">
              <Icon name="Heart" size={18} />
              Стать частью легенды
            </a>
          </div>


        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--bronze)" }}>
              О проекте
            </p>
            <h2 className="section-title text-2xl sm:text-4xl md:text-5xl mb-6">
              Туапсе заслуживает<br />своей легенды
            </h2>
            <div className="font-body text-lg w-full mx-auto" style={{ color: "#6B4C35", lineHeight: 1.8, textAlign: "justify" }}>
              <p>Туапсе — город, где море обнимает берег, а горы смотрят в облака. Здесь хочется замедлиться, остановиться, вдохнуть и рассмотреть повнимательнее.</p>
              <p>«Туапсеноты» — не просто фигурки. Это маленькое чудо, которое делает город ещё теплее.</p>
              <p>Восемь бронзовых енотов. Совсем маленькие — 20 см. Они поселятся на набережной, в парке, на пляже, у вокзала. У каждого — имя, характер, своя тихая легенда. И ритуал, который хочется повторять: потереть лапку, прошептать желание, просто улыбнуться в ответ.</p>
              <p>Их можно искать. С ними можно обниматься. Им можно верить.</p>
              <p>Мы дарим гостям и жителям города повод остановиться и почувствовать: в Туапсе есть место чуду. И оно уже здесь.</p>
              <p>Туапсе заслужил свою легенду.<br />Мы её создаём.<br />А вы — её начало.</p>
            </div>
          </div>

          <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl relative">
            <img
              src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/2d9722e6-bc44-40c7-b04f-5b489accacfc.png"
              alt="Семья Туапсенотов"
              className="w-full h-64 sm:h-96 object-cover"
              style={{ objectPosition: "center center" }}
            />
            <div className="absolute inset-0 flex items-end p-8"
              style={{ background: "linear-gradient(to top, rgba(46,92,110,0.8) 0%, transparent 60%)" }}>
              <p className="font-display text-lg sm:text-2xl md:text-3xl font-bold italic"
                style={{ color: "var(--cream)" }}>
                «Каждый енот — это история, которую хочется рассказать»
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-20 sm:py-28 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--bronze)" }}>
              Новости проекта
            </p>
            <h2 className="section-title text-2xl sm:text-4xl md:text-5xl mb-4">
              Это уже происходит
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-hover rounded-3xl overflow-hidden md:col-span-2"
              style={{ border: "1px solid rgba(184,115,51,0.15)", backgroundColor: "var(--sand)" }}>
              <div className="md:flex">
                <div className="md:w-2/5 relative">
                  <NewsGallery />
                </div>
                <div className="p-4 sm:p-8 md:w-3/5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-body text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(76,175,80,0.15)", color: "#4CAF50" }}>
                      🔥 Горячая новость
                    </span>
                    <span className="font-body text-xs" style={{ color: "#9B7B5A" }}>
                      Май 2026
                    </span>
                  </div>
                  <h3 className="section-title text-xl sm:text-3xl mb-4">
                    Енотыч уже отлит в бронзе!
                  </h3>
                  <p className="font-body mb-6" style={{ color: "#6B4C35", lineHeight: 1.8 }}>
                    Первый хранитель семьи — Енотыч — готов. Бронзовый рыбак с удочкой уже
                    воплощён мастерами, установлен на набережной и ждёт жителей и гостей Туапсе.
                    Это доказывает: проект реальный, команда работает, а легенда
                    начинает материализовываться.
                  </p>
                  <a href="https://web.max.ru/-72521511416496" target="_blank" rel="noopener noreferrer"
                    className="font-body font-bold flex items-center gap-2 mb-6"
                    style={{ color: "var(--bronze)" }}>
                    Читать на Макс
                    <Icon name="ArrowRight" size={16} />
                  </a>
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(184,115,51,0.2)" }}>
                    <iframe
                      src="https://yandex.ru/map-widget/v1/?um=constructor%3A8320dc8f2d5e1729b5847107af9a69817a72779d9419cdcc1cbccdcb1acbdb4d&source=constructor"
                      width="100%"
                      height="260"
                      frameBorder={0}
                      title="Енотыч на карте"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover rounded-3xl overflow-hidden md:col-span-2"
              style={{ border: "1px solid rgba(184,115,51,0.15)", backgroundColor: "var(--sand)" }}>
              <div className="md:flex md:flex-row-reverse">
                <div className="md:w-2/5 relative">
                  <EnofyaGallery />
                </div>
                <div className="p-4 sm:p-8 md:w-3/5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-body text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(184,115,51,0.15)", color: "var(--bronze)" }}>
                      🧺 Новый хранитель
                    </span>
                    <span className="font-body text-xs" style={{ color: "#9B7B5A" }}>
                      Май 2026
                    </span>
                  </div>
                  <h3 className="section-title text-xl sm:text-3xl mb-4">
                    Енофья отлита в бронзе!
                  </h3>
                  <p className="font-body mb-6" style={{ color: "#6B4C35", lineHeight: 1.8 }}>
                    Добрая бабушка семьи — Енофья — воплощена мастерами. В платочке и фартуке, с корзинкой полной гостинцев, она уже готова встречать гостей Туапсе с улыбкой и теплом. Пока выбираем для неё лучшее место в городе.
                  </p>
                </div>
              </div>
            </div>

            {[
              { emoji: "🏛️", title: "Администрация поддержала проект", date: "Апрель 2026", text: "Официальное одобрение от администрации Туапсе открыло путь к размещению скульптур в городе." },
              { emoji: "⚖️", title: "Юридическая защита оформлена", date: "Март 2026", text: "Персонажи и названия зарегистрированы. Туапсеноты под надёжной защитой авторского права." },
            ].map((item) => (
              <div key={item.title}
                className="card-hover rounded-3xl p-6"
                style={{ border: "1px solid rgba(184,115,51,0.15)", backgroundColor: "var(--sand)" }}>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="font-body text-xs mb-2" style={{ color: "#9B7B5A" }}>{item.date}</div>
                <h4 className="section-title text-xl mb-3">{item.title}</h4>
                <p className="font-body text-sm" style={{ color: "#6B4C35", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CHARACTERS */}
      <section id="characters" className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ background: "linear-gradient(180deg, var(--sand) 0%, var(--cream) 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--bronze)" }}>
              Персонажи
            </p>
            <h2 className="section-title text-2xl sm:text-4xl md:text-5xl mb-6">
              Познакомьтесь с семьёй
            </h2>
            <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "#6B4C35" }}>
              Восемь уникальных хранителей. У каждого — своё место, характер и ритуал удачи.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((char) => {
              const charUrl = `${window.location.origin}/characters/${char.slug}`;
              return (
                <div key={char.name}
                  className={`card-hover rounded-3xl overflow-hidden bg-gradient-to-br ${char.color} flex flex-col`}
                  style={{ border: "1px solid rgba(184,115,51,0.12)" }}>
                  <div className="p-6 flex flex-col flex-1">
                    {char.image ? (
                      <img src={char.image} alt={char.name}
                        className="w-full h-44 object-cover rounded-2xl mb-4"
                        style={{ objectPosition: "top" }} />
                    ) : (
                      <div className="text-5xl mb-4 text-center">{char.emoji}</div>
                    )}
                    <div className="text-center mb-4">
                      <h3 className="font-display text-2xl font-bold" style={{ color: "var(--warm-dark)" }}>
                        {char.name}
                      </h3>
                      <p className="font-body text-sm font-semibold mt-1" style={{ color: "var(--bronze)" }}>
                        {char.role}
                      </p>
                    </div>
                    <p className="font-body text-sm text-center mb-4" style={{ color: "#5A3E2B", lineHeight: 1.6 }}>
                      {char.description}
                    </p>

                    <div className="rounded-2xl p-3 text-center mb-4"
                      style={{ backgroundColor: "rgba(184,115,51,0.1)", border: "1px dashed rgba(184,115,51,0.3)" }}>
                      <p className="font-body text-xs font-bold mb-1" style={{ color: "var(--bronze)" }}>
                        🪄 Ритуал
                      </p>
                      <p className="font-body text-xs italic" style={{ color: "#6B4C35" }}>
                        {char.ritual}
                      </p>
                    </div>

                    {char.location && (
                      <div className="flex items-center justify-center gap-1 mb-4">
                        <Icon name="MapPin" size={12} />
                        <span className="font-body text-xs" style={{ color: "var(--sea)" }}>
                          {char.location}
                        </span>
                      </div>
                    )}

                    <div className="mt-auto flex flex-col items-center gap-3">
                      <a href="/shop"
                        className="w-full text-center font-body text-xs font-bold py-2 px-4 rounded-full transition-colors"
                        style={{ backgroundColor: "var(--bronze)", color: "white" }}>
                        🛒 Магазин
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl p-6 sm:p-12 text-center"
            style={{ background: "linear-gradient(135deg, var(--sand), #EDD5B8)" }}>
            <h3 className="section-title text-xl sm:text-3xl mb-3">Следите за проектом</h3>
            <p className="font-body mb-8" style={{ color: "#6B4C35" }}>
              Подпишитесь и узнавайте первыми об открытии каждого нового Туапсенота
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-lg font-body font-semibold"
                style={{ color: "#4CAF50" }}>
                <Icon name="CheckCircle" size={24} />
                Отлично! Мы вам напишем 🦝
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  required
                  className="flex-1 rounded-full px-6 py-3 font-body text-sm outline-none"
                  style={{
                    border: "2px solid rgba(184,115,51,0.3)",
                    backgroundColor: "white",
                    color: "var(--warm-dark)",
                  }}
                />
                <button type="submit" className="btn-primary text-sm px-6 py-3">
                  <Icon name="Send" size={16} />
                  Подписаться
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* HOW TO HELP */}
      <section id="help" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: "var(--sea)" }}>
        <div className="absolute inset-0 texture-overlay" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "var(--teal)", filter: "blur(100px)", transform: "translate(30%, -30%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-body text-sm font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--teal-light)" }}>
            Как помочь
          </p>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--cream)", lineHeight: 1.2 }}>
            Станьте хранителем<br />
            <em style={{ color: "var(--teal-light)" }}>вместе с нами</em>
          </h2>
          <p className="font-body text-lg mb-12 max-w-2xl mx-auto"
            style={{ color: "rgba(245,230,211,0.85)", lineHeight: 1.8 }}>
            Поддержите проект на Planeta.ru и получите эксклюзивный подарок
            от команды Туапсенотов.
          </p>

          <div className="mb-12">
            <div className="rounded-3xl p-6 card-hover max-w-sm"
              style={{ backgroundColor: "rgba(245,230,211,0.1)", border: "1px solid rgba(245,230,211,0.2)" }}>
              <div className="text-4xl mb-3">🗿</div>
              <div className="font-display text-xl font-bold mb-2" style={{ color: "var(--cream)" }}>
                Мини-фигурка
              </div>
              <p className="font-body text-sm mb-4" style={{ color: "rgba(245,230,211,0.75)" }}>
                Мини-фигурка вашего любимого персонажа
              </p>
            </div>
          </div>

          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary text-lg px-10 py-5 inline-flex">
            <Icon name="ExternalLink" size={20} />
            Перейти к сбору на Planeta.ru
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-dark)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-8 pb-8"
            style={{ borderBottom: "1px solid rgba(245,230,211,0.1)" }}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🦝</span>
                <span className="font-display text-xl font-bold" style={{ color: "var(--teal-light)" }}>
                  Туапсеноты
                </span>
              </div>
              <p className="font-body text-sm" style={{ color: "rgba(245,230,211,0.6)", lineHeight: 1.7 }}>
                Семья бронзовых енотов-хранителей Туапсе. Проект авторов Эдуарда и Ирины Сарбаевых.
              </p>
            </div>

            <div>
              <h4 className="font-body font-bold mb-4 text-sm uppercase tracking-wider"
                style={{ color: "var(--teal-light)" }}>
                Контакты авторов
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2" style={{ color: "rgba(245,230,211,0.8)" }}>
                  <Icon name="User" size={14} />
                  <span className="font-body text-sm">Эдуард и Ирина Сарбаевы</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <a href="mailto:sen555551@mail.ru"
                    className="font-body text-sm hover:underline"
                    style={{ color: "rgba(245,230,211,0.8)" }}>
                    sen555551@mail.ru
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <a href="mailto:galyapina2014@yandex.ru"
                    className="font-body text-sm hover:underline"
                    style={{ color: "rgba(245,230,211,0.8)" }}>
                    galyapina2014@yandex.ru
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  <a href="tel:+79185051617"
                    className="font-body text-sm hover:underline"
                    style={{ color: "rgba(245,230,211,0.8)" }}>
                    8-918-505-16-17
                  </a>
                </div>

              </div>
            </div>

            <div>
              <h4 className="font-body font-bold mb-4 text-sm uppercase tracking-wider"
                style={{ color: "var(--teal-light)" }}>
                Ссылки
              </h4>
              <div className="space-y-2">
                <a href={MAX_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm hover:underline"
                  style={{ color: "rgba(245,230,211,0.8)" }}>
                  <Icon name="MessageCircle" size={14} />
                  Мессенджер Макс
                </a>
                <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm hover:underline"
                  style={{ color: "rgba(245,230,211,0.8)" }}>
                  <Icon name="ExternalLink" size={14} />
                  Страница на Planeta.ru
                </a>
                <a href={VK_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm hover:underline"
                  style={{ color: "rgba(245,230,211,0.8)" }}>
                  <Icon name="Users" size={14} />
                  ВКонтакте
                </a>
              </div>

              <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary text-sm mt-6 inline-flex">
                <Icon name="Heart" size={16} />
                Поддержать проект
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="font-body text-sm" style={{ color: "rgba(245,230,211,0.4)" }}>
              © 2026 Туапсеноты. С любовью к Туапсе 🌊
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}