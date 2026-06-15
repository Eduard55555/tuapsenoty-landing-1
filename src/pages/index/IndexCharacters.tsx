import { useState } from "react";
import Icon from "@/components/ui/icon";
import { characters, PLANETA_URL } from "./indexData";
import { useFinderCount, pluralPeople } from "@/hooks/useFinderCount";
import func2url from "../../../backend/func2url.json";

export default function IndexCharacters() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const foundCount = useFinderCount();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(func2url["subscribe"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setSubscribed(true);
      setEmail("");
    } catch {
      setError("Не получилось подписаться. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
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
            <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "var(--warm-text)" }}>
              Восемь уникальных хранителей. У каждого — своё место, характер и ритуал удачи.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((char) => {
              return (
                <div key={char.name}
                  className={`card-hover rounded-3xl overflow-hidden bg-gradient-to-br ${char.color} flex flex-col`}
                  style={{ border: "1px solid rgba(184,115,51,0.12)" }}>
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    {char.image ? (
                      <div className="relative mb-4">
                        <img src={char.image} alt={char.name}
                          loading="lazy" decoding="async"
                          className="w-full h-44 object-cover rounded-2xl"
                          style={{ objectPosition: "top" }} />
                        {char.icon && (
                          <div className="absolute bottom-2 right-2 flex items-center justify-center rounded-full shadow-md"
                            style={{
                              width: 38,
                              height: 38,
                              background: "var(--cream)",
                              border: "2px solid var(--bronze)",
                            }}>
                            <Icon name={char.icon} size={20} style={{ color: "var(--bronze)" }} />
                          </div>
                        )}
                      </div>
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
                    <p className="font-body text-sm text-center mb-4" style={{ color: "var(--warm-text)", lineHeight: 1.7 }}>
                      {char.description}
                    </p>

                    <div className="rounded-2xl p-3 text-center mb-4"
                      style={{ backgroundColor: "rgba(184,115,51,0.18)", border: "1px dashed rgba(184,115,51,0.45)" }}>
                      <p className="font-body text-xs font-bold mb-1" style={{ color: "var(--bronze-dark)" }}>
                        🪄 Ритуал
                      </p>
                      <p className="font-body text-xs italic" style={{ color: "var(--warm-dark)", lineHeight: 1.6 }}>
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
                        <span className="font-body text-xs" style={{ color: "var(--warm-text)" }}>
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
                        className="w-full flex items-center justify-center gap-1.5 font-body text-xs font-bold py-2 px-4 rounded-full transition-colors"
                        style={{ backgroundColor: "var(--bronze)", color: "white" }}>
                        <Icon name="ShoppingCart" size={14} />
                        Магазин
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
            <p className="font-body mb-8" style={{ color: "var(--warm-text)" }}>
              Подпишитесь и узнавайте первыми об открытии каждого нового Туапсенота
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-lg font-body font-semibold"
                style={{ color: "#4CAF50" }}>
                <Icon name="CheckCircle" size={24} />
                Отлично! Мы вам напишем 🦝
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    required
                    disabled={loading}
                    className="flex-1 rounded-full px-6 py-3 font-body text-sm outline-none"
                    style={{
                      border: "2px solid rgba(184,115,51,0.3)",
                      backgroundColor: "white",
                      color: "var(--warm-dark)",
                    }}
                  />
                  <button type="submit" disabled={loading} className="btn-primary text-sm px-6 py-3">
                    <Icon name={loading ? "Loader" : "Send"} size={16} className={loading ? "animate-spin" : ""} />
                    {loading ? "Отправляем…" : "Подписаться"}
                  </button>
                </form>
                {error && (
                  <p className="font-body text-sm mt-3" style={{ color: "#C0392B" }}>
                    {error}
                  </p>
                )}
              </div>
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