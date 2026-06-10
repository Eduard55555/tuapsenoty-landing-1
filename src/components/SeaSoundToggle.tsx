import Icon from "@/components/ui/icon";
import { useSeaSound } from "@/hooks/useSound";

export default function SeaSoundToggle() {
  const { enabled, toggle } = useSeaSound();

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Выключить звук моря" : "Включить звук моря"}
      title={enabled ? "Выключить звук моря" : "Включить звук моря"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full shadow-lg transition-transform hover:scale-105 pl-4 pr-5 py-3"
      style={{
        background: enabled ? "var(--teal)" : "rgba(46,92,110,0.85)",
        color: "var(--cream)",
        border: "2px solid rgba(245,230,211,0.4)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Icon name={enabled ? "Volume2" : "VolumeX"} size={22} />
      <span className="font-body text-sm font-semibold">Звук моря</span>
    </button>
  );
}