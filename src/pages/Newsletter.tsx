import { useState } from "react";
import Icon from "@/components/ui/icon";
import CounterAdmin from "@/components/CounterAdmin";
import func2url from "../../backend/func2url.json";

const NEWSLETTER_URL = func2url["send-newsletter"];

const Newsletter = () => {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [subscribers, setSubscribers] = useState<{ email: string; created_at: string | null }[]>([]);
  const [showList, setShowList] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<string>("");

  const checkKey = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(NEWSLETTER_URL, {
        method: "GET",
        headers: { "X-Admin-Key": adminKey },
      });
      if (res.status === 403) {
        setError("Неверный пароль");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCount(data.count ?? 0);
      setSubscribers(data.subscribers ?? []);
      setAuthed(true);
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    }
    setLoading(false);
  };

  const send = async () => {
    setError("");
    setResult("");
    if (!subject.trim() || !message.trim()) {
      setError("Заполните заголовок и текст новости");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(NEWSLETTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError("Не удалось отправить. Проверьте настройки почты.");
        setLoading(false);
        return;
      }
      setResult(`Готово! Отправлено: ${data.sent} из ${data.total}.` + (data.failed ? ` Не доставлено: ${data.failed}.` : ""));
      setSubject("");
      setMessage("");
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    }
    setLoading(false);
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div
        className="w-full max-w-xl rounded-2xl p-5 sm:p-8 shadow-lg"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl sm:text-3xl">🦝</span>
          <h1
            className="text-xl sm:text-2xl font-extrabold"
            style={{ color: "var(--sea)", fontFamily: "'Nunito', sans-serif" }}
          >
            Рассылка новостей
          </h1>
        </div>

        {!authed ? (
          <div className="space-y-4">
            <p style={{ color: "var(--warm-text)" }}>
              Введите пароль, чтобы получить доступ к рассылке.
            </p>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkKey()}
              placeholder="Пароль"
              className="w-full rounded-xl px-4 py-3 outline-none border"
              style={{ borderColor: "var(--sand)", color: "var(--warm-dark)" }}
            />
            {error && <p style={{ color: "#C0392B" }}>{error}</p>}
            <button
              onClick={checkKey}
              disabled={loading || !adminKey}
              className="w-full rounded-xl py-3 font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ backgroundColor: "var(--sea)" }}
            >
              {loading ? (
                <Icon name="Loader2" className="animate-spin" size={20} />
              ) : (
                <Icon name="LogIn" size={20} />
              )}
              Войти
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className="rounded-xl px-4 py-3 flex items-center justify-between gap-2"
              style={{ backgroundColor: "var(--cream)", color: "var(--sea)" }}
            >
              <span className="flex items-center gap-2 font-semibold">
                <Icon name="Users" size={18} />
                Подписчиков: {count}
              </span>
              {count !== null && count > 0 && (
                <button
                  onClick={() => setShowList((v) => !v)}
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "var(--bronze)" }}
                >
                  {showList ? "Скрыть" : "Показать список"}
                  <Icon name={showList ? "ChevronUp" : "ChevronDown"} size={16} />
                </button>
              )}
            </div>

            {showList && (
              <div
                className="rounded-xl border divide-y max-h-72 overflow-y-auto"
                style={{ borderColor: "var(--sand)" }}
              >
                {subscribers.map((s) => (
                  <div
                    key={s.email}
                    className="flex items-center justify-between gap-2 px-4 py-2.5"
                    style={{ borderColor: "var(--sand)" }}
                  >
                    <span className="text-sm break-all" style={{ color: "var(--warm-dark)" }}>
                      {s.email}
                    </span>
                    <span className="text-xs whitespace-nowrap" style={{ color: "var(--muted-foreground)" }}>
                      {formatDate(s.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <CounterAdmin adminKey={adminKey} />

            <div>
              <label className="block mb-1 font-semibold" style={{ color: "var(--warm-text)" }}>
                Заголовок новости
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Например: Открылся новый Туапсенот!"
                className="w-full rounded-xl px-4 py-3 outline-none border"
                style={{ borderColor: "var(--sand)", color: "var(--warm-dark)" }}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold" style={{ color: "var(--warm-text)" }}>
                Текст новости
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                placeholder="Напишите текст, который получат подписчики на почту..."
                className="w-full rounded-xl px-4 py-3 outline-none border resize-y"
                style={{ borderColor: "var(--sand)", color: "var(--warm-dark)" }}
              />
            </div>

            {error && <p style={{ color: "#C0392B" }}>{error}</p>}
            {result && (
              <p className="flex items-center gap-2" style={{ color: "#2E7D32" }}>
                <Icon name="CheckCircle2" size={18} />
                {result}
              </p>
            )}

            <button
              onClick={send}
              disabled={loading || count === 0}
              className="w-full rounded-xl py-3 font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ backgroundColor: "var(--bronze)" }}
            >
              {loading ? (
                <Icon name="Loader2" className="animate-spin" size={20} />
              ) : (
                <Icon name="Send" size={20} />
              )}
              Разослать всем подписчикам
            </button>
            {count === 0 && (
              <p className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
                Пока нет подписчиков для рассылки.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;