import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { characters, PLANETA_URL } from "./indexData";

const COUNTER_API = "https://functions.poehali.dev/eec444e5-96b7-4788-9c65-0077c246d938";

function pluralPeople(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "человек";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "человека";
  return "человек";
}

export default function IndexCharacters() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [foundCount, setFoundCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(COUNTER_API)
      .then((r) => r.json())
      .then((d) => setFoundCount(typeof d.count === "number" ? d.count : null))
      .catch(() => {});
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      {/* CHARACTERS */}
      <section id="characters" className="py-8 sm:py-12 px-4 sm:px-6"
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

                    {char.location ? (
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Icon name="MapPin" size={12} />
                        <span className="font-body text-xs" style={{ color: "var(--sea)" }}>
                          {char.location}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Icon name="Clock" size={12} />
                        <span className="font-body text-xs" style={{ color: "var(--bronze)" }}>
                          Скоро появится в городе
                        </span>
                      </div>
                    )}

                    {foundCount !== null && char.location && (
                      <div className="flex items-center justify-center gap-1.5 mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                            style={{ backgroundColor: "var(--bronze)" }} />
                          <span className="relative inline-flex rounded-full h-2 w-2"
                            style={{ backgroundColor: "var(--bronze)" }} />
                        </span>
                        <span className="font-body text-xs" style={{ color: "#6B4C35" }}>
                          Нашли{" "}
                          <span className="font-bold" style={{ color: "var(--bronze)" }}>
                            {foundCount.toLocaleString("ru-RU")}
                          </span>{" "}
                          {pluralPeople(foundCount)}
                        </span>
                      </div>
                    )}

                    <div className="mt-auto flex flex-col items-center gap-2">
                      <a href={`/characters/${char.slug}`}
                        className="w-full text-center font-body text-xs font-bold py-2 px-4 rounded-full transition-colors"
                        style={{ border: "1px solid var(--bronze)", color: "var(--bronze)" }}>
                        Подробнее
                      </a>
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
      <section className="py-8 sm:py-12 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
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
      <section id="help" className="py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden"
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



          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary text-lg px-10 py-5 inline-flex">
            <Icon name="ExternalLink" size={20} />
            Перейти к сбору на Planeta.ru
          </a>
        </div>
      </section>
    </>
  );
}