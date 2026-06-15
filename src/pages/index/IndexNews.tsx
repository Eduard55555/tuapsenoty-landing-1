import { useState } from "react";
import Icon from "@/components/ui/icon";
import ARHologram from "@/components/ARHologram";
import { characters } from "@/pages/CharacterPage";
import { NEWS_PHOTOS, ENOFYA_PHOTOS } from "./indexData";

const enotych = characters.find((c) => c.slug === "enotych");

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

export default function IndexNews() {
  const [arOpen, setArOpen] = useState(false);
  return (
    <section id="news" className="py-8 sm:py-12 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
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
                <p className="font-body mb-6" style={{ color: "var(--warm-text)", lineHeight: 1.8 }}>
                  Первый хранитель семьи — Енотыч — готов. Бронзовый рыбак с удочкой уже
                  воплощён мастерами, установлен на набережной и ждёт жителей и гостей Туапсе.
                  Это доказывает: проект реальный, команда работает, а легенда
                  начинает материализовываться.
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <a href="https://web.max.ru/-72521511416496" target="_blank" rel="noopener noreferrer"
                    className="btn-primary inline-flex">
                    Читать в MAX
                    <Icon name="ArrowRight" size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setArOpen(true)}
                    className="btn-primary inline-flex"
                    style={{ background: "linear-gradient(135deg, var(--sea), var(--teal))" }}>
                    <Icon name="Sparkles" size={16} />
                    Оживить Енотыча
                  </button>
                </div>
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
                <p className="font-body mb-6" style={{ color: "var(--warm-text)", lineHeight: 1.8 }}>
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
              <p className="font-body text-sm" style={{ color: "var(--warm-text)", lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>

      </div>

      {arOpen && enotych && (
        <ARHologram
          image={enotych.image}
          video={(enotych as { video?: string }).video}
          name={enotych.name}
          onClose={() => setArOpen(false)}
        />
      )}
    </section>
  );
}