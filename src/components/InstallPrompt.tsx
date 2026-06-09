import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

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

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem("install-dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-sm">
      <div
        className="rounded-2xl p-4 flex items-center gap-3 shadow-2xl animate-fade-up"
        style={{ backgroundColor: "var(--warm-dark)", border: "1px solid rgba(184,115,51,0.3)" }}
      >
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
    </div>
  );
}
