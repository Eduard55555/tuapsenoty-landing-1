import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

interface Props {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function InstallButton({ className, style, onClick }: Props) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (isStandalone) setInstalled(true);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const onInstalled = () => setInstalled(true);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handle = async () => {
    onClick?.();
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      return;
    }
    if (isIOS()) {
      toast({
        title: "Установка на iPhone",
        description: "Нажми «Поделиться» внизу Safari, затем «На экран „Домой“».",
      });
    } else {
      toast({
        title: "Установка приложения",
        description:
          "Открой меню браузера (⋮) и выбери «Установить приложение» или «Добавить на главный экран».",
      });
    }
  };

  if (installed) return null;

  return (
    <button onClick={handle} className={className} style={style}>
      <Icon name="Download" size={16} />
      Установить приложение
    </button>
  );
}
