import Icon from "@/components/ui/icon";
import { useSeaSound } from "@/hooks/useSound";

export default function SeaSoundToggle() {
  const { enabled, toggle } = useSeaSound();

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Выключить звук моря" : "Включить звук моря"}
      title={enabled ? "Выключить звук моря" : "Включить звук моря"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full shadow-lg transition-transform hover:scale-105 pl-4 pr-5 py-3 overflow-hidden"
      style={{
        background: enabled ? "var(--sea)" : "rgba(46,92,110,0.85)",
        color: "var(--cream)",
        border: "2px solid rgba(245,230,211,0.4)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* бегущая морская волна по кнопке */}
      {enabled && (
        <span className="absolute inset-x-0 bottom-0 h-2/3 overflow-hidden pointer-events-none">
          <svg
            className="absolute bottom-0 left-0 h-full animate-sea-wave"
            style={{ width: "200%" }}
            viewBox="0 0 240 40"
            preserveAspectRatio="none"
          >
            <path
              d="M0 20 Q 15 8 30 20 T 60 20 T 90 20 T 120 20 T 150 20 T 180 20 T 210 20 T 240 20 V40 H0 Z"
              fill="var(--teal)"
              opacity="0.55"
            />
            <path
              d="M0 26 Q 15 14 30 26 T 60 26 T 90 26 T 120 26 T 150 26 T 180 26 T 210 26 T 240 26 V40 H0 Z"
              fill="var(--teal-light)"
              opacity="0.45"
            />
          </svg>
        </span>
      )}
      <Icon name={enabled ? "Volume2" : "VolumeX"} size={22} className="relative" />
      <span className="font-body text-sm font-semibold relative">Звук моря</span>
    </button>
  );
}