import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(
    () => !localStorage.getItem("cookie-consent")
  );

  useEffect(() => {
    const close = () => setCookieOpen(false);
    const open = () => setCookieOpen(true);
    window.addEventListener("cookie-consent-done", close);
    window.addEventListener("cookie-settings-open", open);
    return () => {
      window.removeEventListener("cookie-consent-done", close);
      window.removeEventListener("cookie-settings-open", open);
    };
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem("install-dismissed");
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (dismissed || isStandalone) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const onInstalled = () => setVisible(false);
    window.addEventListener("appinstalled", onInstalled);

    const timer = setTimeout(() => setVisible(true), 2500);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      clearTimeout(timer);
    };
  }, []);

  const install = async () => {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      setVisible(false);
    } else {
      setShowHint((v) => !v);
    }
  };

  const dismiss = () => {
    localStorage.setItem("install-dismissed", "1");
    setVisible(false);
    setShowHint(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm transition-all duration-300"
      style={{ bottom: cookieOpen ? "calc(1rem + 152px)" : "1rem" }}
    >
      <div
        className="rounded-2xl p-4 shadow-2xl animate-fade-up"
        style={{ backgroundColor: "var(--warm-dark)", border: "1px solid rgba(184,115,51,0.3)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/files/b44c9b66-aad2-42dc-b157-85b6071038f7.jpg"
            alt="Туапсеноты"
            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <p className="font-body text-sm font-bold" style={{ color: "var(--cream)" }}>
              Установить приложение
            </p>
            <p className="font-body text-xs" style={{ color: "rgba(245,230,211,0.7)" }}>
              Еноты на твоём экране — даже без интернета
            </p>
          </div>
          <button
            onClick={install}
            className="btn-primary text-sm px-3 py-2 justify-center flex-shrink-0"
          >
            <Icon name="Download" size={16} />
          </button>
          <button
            onClick={dismiss}
            aria-label="Закрыть"
            className="flex-shrink-0"
            style={{ color: "rgba(245,230,211,0.5)" }}
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {showHint && (
          <div
            className="mt-3 pt-3 font-body text-xs"
            style={{ color: "rgba(245,230,211,0.85)", borderTop: "1px solid rgba(245,230,211,0.2)", lineHeight: 1.6 }}
          >
            {isIOS() ? (
              <>
                Нажми <Icon name="Share" size={14} className="inline align-text-bottom" /> «Поделиться» внизу Safari,
                затем выбери <b>«На экран „Домой“»</b>.
              </>
            ) : (
              <>
                Открой меню браузера <Icon name="EllipsisVertical" size={14} className="inline align-text-bottom" /> и
                выбери <b>«Установить приложение»</b> или <b>«Добавить на главный экран»</b>.
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}