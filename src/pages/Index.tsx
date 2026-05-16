import { useState } from "react";
import Icon from "@/components/ui/icon";

const PLANETA_URL = "https://planeta.ru";
const TELEGRAM_URL = "https://t.me/tuapsenoty";

const characters = [
  {
    name: "Енотыч",
    emoji: "🎣",
    role: "Дедушка",
    description: "Мудрый, неторопливый, знает все морские легенды. Сидит с удочкой из бамбука в капитанской фуражке — смотрит на море и хранит тайны побережья.",
    ritual: "Потри удочку и загадай желание — оно сбудется, когда волна дойдёт до берега",
    location: "Набережная",
    color: "from-amber-100 to-yellow-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/61957535-c6fc-42ed-be30-235d0501d01a.png",
  },
  {
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
    name: "Тыдочка",
    emoji: "🌅",
    role: "Дочка мечты",
    description: "Шерсть переливается от кораллового до индиго ночи. В лапках — Лунный Компас из ракушки-радуги, что указывает путь к заветным желаниям.",
    ritual: "Загадай желание звезде и коснись Звёздной пыли — сбудется",
    location: "",
    color: "from-pink-100 to-violet-100",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/26e030b8-8ffc-470b-9422-9d0f8875b67c.png",
  },
  {
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
              {[["О проекте", "#about"], ["Персонажи", "#characters"], ["Как помочь", "#help"], ["Новости", "#news"]].map(([label, href]) => (
                <a key={label} href={href}
                  className="font-body text-sm transition-colors"
                  style={{ color: "var(--warm-dark)", fontWeight: 600 }}>
                  {label}
                </a>
              ))}
            </nav>

            <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary text-sm px-5 py-3">
              <Icon name="Heart" size={16} />
              Поддержать
            </a>

            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "var(--bronze)" }}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 space-y-3"
            style={{ borderTop: "1px solid rgba(184,115,51,0.15)" }}>
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

        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: "var(--teal)", filter: "blur(60px)" }} />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-15"
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
              style={{ color: "var(--teal-light)", letterSpacing: "0.2em" }}>
              Краудфандинговый проект · Туапсе
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
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
            <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <Icon name="Heart" size={18} />
              Стать частью легенды
            </a>
            <a href="#about" className="btn-secondary text-base px-8 py-4">
              Узнать историю
              <Icon name="ChevronDown" size={18} />
            </a>
          </div>

          <div className="animate-fade-up-delay-3 mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[["8", "Енотов-хранителей"], ["1", "Уже отлит в бронзе"], ["∞", "Легенд впереди"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold"
                  style={{ color: "var(--teal-light)" }}>
                  {num}
                </div>
                <div className="font-body text-xs sm:text-sm mt-1"
                  style={{ color: "rgba(245,230,211,0.7)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--bronze)", letterSpacing: "0.2em" }}>
              О проекте
            </p>
            <h2 className="section-title text-4xl sm:text-5xl mb-6">
              Туапсе заслуживает<br />своей легенды
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#6B4C35", lineHeight: 1.8 }}>
              Туапсе — город с богатой историей, но туристы проезжают мимо.
              Мы создаём причину остановиться.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "😔",
                title: "Проблема",
                text: "Гости едут в санатории и пансионаты, но не задерживаются в самом городе. Не хватает эмоционального якоря — повода остановиться, выйти из машины, сходить в кафе, купить сувенир.",
              },
              {
                emoji: "✨",
                title: "Наша идея",
                text: "Семья из 7–8 бронзовых скульптур высотой 20 см в разных местах города. У каждого енота — имя, характер, легенда и ритуал. Семья, которую хочется встретить, обнять, сфотографировать.",
              },
              {
                emoji: "🏆",
                title: "Уже сделано",
                text: "Поддержка администрации города, готовая 3D-модель Енотыча, юридическая защита проекта. Первый еnот уже отлит!",
              },
            ].map((item) => (
              <div key={item.title}
                className="card-hover rounded-3xl p-8"
                style={{ backgroundColor: "var(--sand)", border: "1px solid rgba(184,115,51,0.15)" }}>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
                  {item.title}
                </h3>
                <p className="font-body" style={{ color: "#6B4C35", lineHeight: 1.7 }}>
                  {item.text}
                </p>
              </div>
            ))}
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
              <p className="font-display text-2xl sm:text-3xl font-bold italic"
                style={{ color: "var(--cream)" }}>
                «Каждый еnот — это история, которую хочется рассказать»
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHARACTERS */}
      <section id="characters" className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ background: "linear-gradient(180deg, var(--sand) 0%, var(--cream) 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--bronze)", letterSpacing: "0.2em" }}>
              Персонажи
            </p>
            <h2 className="section-title text-4xl sm:text-5xl mb-6">
              Познакомьтесь с семьёй
            </h2>
            <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "#6B4C35" }}>
              Восемь уникальных хранителей. У каждого — своё место, характер и ритуал удачи.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((char) => (
              <div key={char.name}
                className={`card-hover rounded-3xl overflow-hidden bg-gradient-to-br ${char.color}`}
                style={{ border: "1px solid rgba(184,115,51,0.12)" }}>
                <div className="p-6">
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

                  <div className="rounded-2xl p-3 text-center"
                    style={{ backgroundColor: "rgba(184,115,51,0.1)", border: "1px dashed rgba(184,115,51,0.3)" }}>
                    <p className="font-body text-xs font-bold mb-1" style={{ color: "var(--bronze)" }}>
                      🪄 Ритуал
                    </p>
                    <p className="font-body text-xs italic" style={{ color: "#6B4C35" }}>
                      {char.ritual}
                    </p>
                  </div>

                  {char.location && (
                    <div className="flex items-center justify-center gap-1 mt-3">
                      <Icon name="MapPin" size={12} />
                      <span className="font-body text-xs" style={{ color: "var(--sea)" }}>
                        {char.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
            style={{ color: "var(--teal-light)", letterSpacing: "0.2em" }}>
            Как помочь
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: "var(--cream)", lineHeight: 1.2 }}>
            Станьте хранителем<br />
            <em style={{ color: "var(--teal-light)" }}>вместе с нами</em>
          </h2>
          <p className="font-body text-lg mb-12 max-w-2xl mx-auto"
            style={{ color: "rgba(245,230,211,0.85)", lineHeight: 1.8 }}>
            Поддержите проект на Planeta.ru и получите эксклюзивный подарок
            от команды Туапсенотов.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { emoji: "🏅", title: "Набор значков", desc: "Эксклюзивные значки со всеми персонажами семьи", amount: "500 ₽" },
              { emoji: "🪪", title: "Енотий паспорт", desc: "Официальный документ почётного жителя Туапсенотии", amount: "1 500 ₽" },
              { emoji: "🗿", title: "Мини-фигурка", desc: "Бронзовая мини-фигурка вашего любимого персонажа", amount: "5 000 ₽" },
            ].map((tier) => (
              <div key={tier.title}
                className="rounded-3xl p-6 card-hover"
                style={{ backgroundColor: "rgba(245,230,211,0.1)", border: "1px solid rgba(245,230,211,0.2)" }}>
                <div className="text-4xl mb-3">{tier.emoji}</div>
                <div className="font-display text-xl font-bold mb-2" style={{ color: "var(--cream)" }}>
                  {tier.title}
                </div>
                <p className="font-body text-sm mb-4" style={{ color: "rgba(245,230,211,0.75)" }}>
                  {tier.desc}
                </p>
                <div className="font-body font-bold text-lg" style={{ color: "var(--teal-light)" }}>
                  от {tier.amount}
                </div>
              </div>
            ))}
          </div>

          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary text-lg px-10 py-5 inline-flex">
            <Icon name="ExternalLink" size={20} />
            Перейти к сбору на Planeta.ru
          </a>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-20 sm:py-28 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--bronze)", letterSpacing: "0.2em" }}>
              Новости проекта
            </p>
            <h2 className="section-title text-4xl sm:text-5xl mb-4">
              Это уже происходит
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-hover rounded-3xl overflow-hidden md:col-span-2"
              style={{ border: "1px solid rgba(184,115,51,0.15)", backgroundColor: "var(--sand)" }}>
              <div className="md:flex">
                <div className="md:w-2/5">
                  <img
                    src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/eda0e784-2336-4322-939a-d4f224b016cd.jpg"
                    alt="Енотыч в бронзе"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-8 md:w-3/5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-body text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(76,175,80,0.15)", color: "#4CAF50" }}>
                      🔥 Горячая новость
                    </span>
                    <span className="font-body text-xs" style={{ color: "#9B7B5A" }}>
                      Май 2026
                    </span>
                  </div>
                  <h3 className="section-title text-3xl mb-4">
                    Енотыч уже отлит в бронзе!
                  </h3>
                  <p className="font-body mb-6" style={{ color: "#6B4C35", lineHeight: 1.8 }}>
                    Первый хранитель семьи — Енотыч — готов. Бронзовый рыбак с удочкой уже
                    воплощён мастерами и ждёт своего места на туапсинской набережной.
                    Это доказывает: проект реальный, команда работает, а легенда
                    начинает материализовываться.
                  </p>
                  <a href="https://web.max.ru/-72521511416496" target="_blank" rel="noopener noreferrer"
                    className="font-body font-bold flex items-center gap-2"
                    style={{ color: "var(--bronze)" }}>
                    Читать на Макс
                    <Icon name="ArrowRight" size={16} />
                  </a>
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

          {/* Subscribe */}
          <div className="mt-16 rounded-3xl p-8 sm:p-12 text-center"
            style={{ background: "linear-gradient(135deg, var(--sand), #EDD5B8)" }}>
            <h3 className="section-title text-3xl mb-3">Следите за проектом</h3>
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
                Семья бронзовых енотов-хранителей Туапсе. Проект автора Эдуарда Сарбаева.
              </p>
            </div>

            <div>
              <h4 className="font-body font-bold mb-4 text-sm uppercase tracking-wider"
                style={{ color: "var(--teal-light)" }}>
                Контакты автора
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2" style={{ color: "rgba(245,230,211,0.8)" }}>
                  <Icon name="User" size={14} />
                  <span className="font-body text-sm">Эдуард Сарбаев</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <a href="mailto:info@tuapsenoty.ru"
                    className="font-body text-sm hover:underline"
                    style={{ color: "rgba(245,230,211,0.8)" }}>
                    info@tuapsenoty.ru
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  <a href="tel:+79001234567"
                    className="font-body text-sm hover:underline"
                    style={{ color: "rgba(245,230,211,0.8)" }}>
                    +7 (900) 123-45-67
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
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm hover:underline"
                  style={{ color: "rgba(245,230,211,0.8)" }}>
                  <Icon name="Send" size={14} />
                  Telegram @tuapsenoty
                </a>
                <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm hover:underline"
                  style={{ color: "rgba(245,230,211,0.8)" }}>
                  <Icon name="ExternalLink" size={14} />
                  Страница на Planeta.ru
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