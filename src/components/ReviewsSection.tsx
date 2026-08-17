import Icon from "@/components/ui/icon";
import { REVIEWS } from "@/data/reviews";

export default function ReviewsSection({ background }: { background?: string }) {
  return (
    <section
      id="reviews"
      className="cv-auto py-10 sm:py-16 px-4 sm:px-6"
      style={{ background: background || "var(--cream)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-7 sm:mb-10">
          <p
            className="font-body text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3"
            style={{ color: "var(--bronze)" }}
          >
            Отзывы
          </p>
          <h2 className="section-title text-xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            Что говорят наши покупатели
          </h2>
          <p className="font-body text-sm sm:text-lg max-w-xl mx-auto" style={{ color: "var(--warm-text)" }}>
            Каждая фигурка уезжает в новый дом со своей историей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.name + r.city}
              className="rounded-3xl p-5 sm:p-6 flex flex-col card-hover"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(184,115,51,0.15)",
                boxShadow: "0 10px 30px rgba(184,115,51,0.12)",
              }}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Icon key={i} name="Star" size={18} style={{ color: "#F5A623", fill: "#F5A623" }} />
                ))}
              </div>
              <p
                className="font-body text-sm sm:text-base flex-1 mb-4"
                style={{ color: "#3d2b1f", lineHeight: 1.65 }}
              >
                {r.text}
              </p>
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(184,115,51,0.15)" }}>
                <span
                  className="flex items-center justify-center rounded-full text-xl flex-shrink-0"
                  style={{ width: 44, height: 44, backgroundColor: "var(--sand)" }}
                >
                  {r.emoji}
                </span>
                <div>
                  <p className="font-display font-bold text-sm sm:text-base" style={{ color: "var(--warm-dark)" }}>
                    {r.name}, {r.city}
                  </p>
                  <p className="font-body text-xs" style={{ color: "#9B7B5A" }}>
                    {r.product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
