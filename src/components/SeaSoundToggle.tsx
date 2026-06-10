import Icon from "@/components/ui/icon";
import { useSeaSound } from "@/hooks/useSound";

export default function SeaSoundToggle() {
  const { enabled, toggle } = useSeaSound();

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Выключить звук моря" : "Включить звук моря"}
      title={enabled ? "Выключить звук моря" : "Включить звук моря"}
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
      style={{
        width: 52,
        height: 52,
        background: enabled ? "var(--teal)" : "rgba(46,92,110,0.85)",
        color: "var(--cream)",
        border: "2px solid rgba(245,230,211,0.4)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Icon name={enabled ? "Volume2" : "VolumeX"} size={22} />
    </button>
  );
}
