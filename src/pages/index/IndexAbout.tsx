import { useMedia, useTexts } from "@/content/siteContent";

export default function IndexAbout() {
  const t = useTexts();
  const media = useMedia();
  return (
    <section id="about" className="cv-auto py-8 sm:py-12 px-4 sm:px-6" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3"
            style={{ color: "var(--bronze)" }}>
            О проекте
          </p>
          <h2 className="section-title text-xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
            {t("about_title")}
          </h2>
        </div>
        <div className="font-body text-base sm:text-lg max-w-3xl mx-auto mb-10 sm:mb-16" style={{ color: "var(--warm-text)", lineHeight: 1.8, textAlign: "justify" }}>
          {t("about_text").split(/\n\s*\n/).map((para, i) => (
            <p key={i} style={{ textIndent: "2em" }}>{para}</p>
          ))}
          <p style={{ textIndent: "2em", fontStyle: "italic", fontWeight: 600 }}>{t("about_final")}</p>
        </div>

        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl relative">
          <img
            src={media.about_image}
            alt="Семья Туапсенотов"
            loading="lazy"
            decoding="async"
            className="w-full h-64 sm:h-96 object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0 flex items-end p-5 sm:p-8"
            style={{ background: "linear-gradient(to top, rgba(46,92,110,0.8) 0%, transparent 60%)" }}>
            <p className="font-display text-lg sm:text-2xl md:text-3xl font-bold italic"
              style={{ color: "var(--cream)" }}>
              {t("about_quote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}