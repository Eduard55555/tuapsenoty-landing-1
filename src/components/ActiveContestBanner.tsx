import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useContests } from "@/content/siteContent";

export default function ActiveContestBanner({ inline = false }: { inline?: boolean }) {
  const { active } = useContests();
  if (!active?.title) return null;

  return (
    <section className={inline ? "relative z-10 mb-14 sm:mb-16 text-left" : "px-4 sm:px-6 py-8"} style={inline ? undefined : { backgroundColor: "var(--cream)" }}>
      <Link
        to="/contests"
        className="group max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-3xl p-5 sm:p-6 text-center sm:text-left transition-transform hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, var(--bronze) 0%, #8B5A2B 100%)",
          boxShadow: "0 12px 30px rgba(184,115,51,0.3)",
          border: inline ? "2px solid rgba(255,255,255,0.35)" : undefined,
        }}
      >
        <div className="text-5xl shrink-0 animate-bounce" style={{ animationDuration: "2s" }}>
          🏆
        </div>
        <div className="flex-1 min-w-0">
          <span
            className="inline-flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2"
            style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Идёт конкурс
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">{active.title}</h2>
          {active.deadline && (
            <p className="font-body text-sm mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
              Приём работ до {active.deadline}
              {active.prize ? ` · Приз: ${active.prize}` : ""}
            </p>
          )}
        </div>
        <span
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold shrink-0"
          style={{ background: "#fff", color: "var(--bronze)" }}
        >
          Участвовать
          <Icon name="ArrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
