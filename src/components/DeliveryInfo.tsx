import Icon from "@/components/ui/icon";
import { DELIVERY_FACTS } from "@/data/delivery";

export default function DeliveryInfo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "grid gap-3" : "grid sm:grid-cols-2 gap-4"}>
      {DELIVERY_FACTS.map((f) => (
        <div
          key={f.title}
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ backgroundColor: "white", border: "1px solid rgba(184,115,51,0.18)" }}
        >
          <span
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: 40, height: 40, backgroundColor: "rgba(184,115,51,0.12)" }}
          >
            <Icon name={f.icon} size={20} style={{ color: "var(--bronze)" }} />
          </span>
          <div>
            <p className="font-display font-bold text-base mb-1" style={{ color: "var(--warm-dark)" }}>
              {f.title}
            </p>
            <p className="font-body text-sm" style={{ color: "#6B4C35", lineHeight: 1.6 }}>
              {f.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
