import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { loadMetrika } from "@/lib/metrika";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
    else if (consent === "accepted") loadMetrika();
  }, []);

  const handle = (value: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
    if (value === "accepted") loadMetrika();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg"
        style={{ backgroundColor: "var(--warm-dark)", border: "1px solid rgba(184,115,51,0.3)" }}>
        <div className="text-3xl">🍪</div>
        <p className="font-body text-sm flex-1" style={{ color: "var(--cream)", lineHeight: 1.5 }}>
          Мы используем файлы cookie для корректной работы сайта и анализа статистики.
          Подробнее — в{" "}
          <a href="/privacy" className="underline" style={{ color: "var(--sand)" }}>
            Политике обработки персональных данных
          </a>.
        </p>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handle("declined")}
            className="font-body text-sm px-4 py-2 rounded-full flex-1 sm:flex-none"
            style={{ color: "var(--cream)", border: "1px solid rgba(245,230,211,0.3)" }}>
            Отклонить
          </button>
          <button
            onClick={() => handle("accepted")}
            className="btn-primary text-sm px-4 py-2 flex-1 sm:flex-none justify-center">
            <Icon name="Check" size={16} /> Принять
          </button>
        </div>
      </div>
    </div>
  );
}