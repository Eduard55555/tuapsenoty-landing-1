import { useState } from "react";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import PhoneLink from "@/components/PhoneLink";
import useSeo from "@/hooks/useSeo";

const PARTNER_URL = "https://functions.poehali.dev/1eb969da-c9f0-4d24-ab20-b98e2c7bac73";

const BENEFITS = [
  { icon: "Users", title: "Поток гостей", text: "Люди специально приходят искать енотов — и попадают к вам." },
  { icon: "Megaphone", title: "Бесплатная реклама", text: "Упоминания в соцсетях, прессе и на этом сайте." },
  { icon: "Sparkles", title: "Уникальность", text: "Бронзовый хранитель у входа, которого нет больше нигде." },
  { icon: "HeartHandshake", title: "Доброе имя", text: "Вы — часть городского проекта, который любят жители." },
];

export default function Sponsors() {
  useSeo({
    title: "Стать партнёром Туапсеноты — поселите бронзового енота у бизнеса",
    description:
      "Оставьте заявку, чтобы бронзовая скульптура енота-хранителя появилась у вашего бизнеса в Туапсе. Поток гостей и бесплатная реклама.",
    path: "/sponsors",
  });

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!name.trim() || !phone.trim()) {
      setError("Заполните имя и телефон");
      return;
    }
    setLoading(true);
    setError("");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(PARTNER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, phone, email, message }),
        signal: controller.signal,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("fail");
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз или позвоните нам.");
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-2xl px-4 py-3 font-body text-base outline-none transition-colors";
  const inputBorder = {
    background: "#fff",
    border: "2px solid rgba(184,115,51,0.2)",
    color: "var(--warm-dark)",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-4xl sm:text-5xl mb-4">🤝</div>
            <h1 className="font-display text-2xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
              Стать партнёром
            </h1>
            <p className="font-body text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Хотите, чтобы бронзовый енот-хранитель поселился у вашего бизнеса?
              Оставьте заявку — мы свяжемся с вами и обсудим детали.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 sm:gap-8 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="rounded-3xl p-5 sm:p-6"
                  style={{ background: "#fff", border: "1px solid rgba(184,115,51,0.15)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(184,115,51,0.12)" }}>
                    <Icon name={b.icon} size={24} style={{ color: "var(--bronze)" }} />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
                    {b.title}
                  </h3>
                  <p className="font-body text-sm" style={{ color: "#6B4C35", lineHeight: 1.6 }}>
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl p-6 sm:p-8"
              style={{ background: "linear-gradient(135deg, #FBF3E4, #FDF8EF)", border: "2px solid var(--bronze)" }}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-4xl sm:text-5xl mb-4">💛</div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
                    Заявка отправлена!
                  </h2>
                  <p className="font-body text-base" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
                    Спасибо! Мы свяжемся с вами в ближайшее время, чтобы обсудить детали.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-display text-xl sm:text-2xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
                    Оставьте заявку
                  </h2>
                  <div>
                    <label className="block font-body text-sm font-semibold mb-1.5" style={{ color: "#5A3E2B" }}>
                      Ваше имя <span style={{ color: "var(--bronze)" }}>*</span>
                    </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться" className={inputStyle} style={inputBorder} />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold mb-1.5" style={{ color: "#5A3E2B" }}>
                      Компания
                    </label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                      placeholder="Название бизнеса" className={inputStyle} style={inputBorder} />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold mb-1.5" style={{ color: "#5A3E2B" }}>
                      Телефон <span style={{ color: "var(--bronze)" }}>*</span>
                    </label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 900 000-00-00" className={inputStyle} style={inputBorder} />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold mb-1.5" style={{ color: "#5A3E2B" }}>
                      Email
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.ru" className={inputStyle} style={inputBorder} />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold mb-1.5" style={{ color: "#5A3E2B" }}>
                      Сообщение
                    </label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                      placeholder="Расскажите о вашем бизнесе или задайте вопрос" rows={3}
                      className={`${inputStyle} resize-none`} style={inputBorder} />
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 flex-shrink-0" />
                    <span className="font-body text-xs" style={{ color: "#6B4C35" }}>
                      Согласен на обработку персональных данных
                    </span>
                  </label>

                  {error && (
                    <p className="font-body text-sm" style={{ color: "#C0392B" }}>{error}</p>
                  )}

                  <button type="submit" disabled={loading || !consent}
                    className="btn-primary w-full justify-center"
                    style={{ opacity: loading || !consent ? 0.6 : 1 }}>
                    <Icon name={loading ? "Loader" : "Send"} size={18} />
                    {loading ? "Отправляем…" : "Отправить заявку"}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <a href="mailto:sen555551@mail.ru?subject=Хочу стать партнёром проекта «Туапсеноты»"
                      className="font-body text-sm inline-flex items-center gap-1.5" style={{ color: "var(--bronze)" }}>
                      <Icon name="Mail" size={15} /> Написать на почту
                    </a>
                    <PhoneLink className="font-body text-sm inline-flex items-center gap-1.5 cursor-pointer"
                      iconSize={15} />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
