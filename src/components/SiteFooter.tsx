import Icon from "@/components/ui/icon";
import PhoneLink from "@/components/PhoneLink";

import { linkAttrs, useContacts, useFooterLinks, useResolveHref, useTexts } from "@/content/siteContent";

export default function SiteFooter() {
  const c = useContacts();
  const t = useTexts();
  const links = useFooterLinks().filter((l) => l.label.trim());
  const resolve = useResolveHref();
  return (
    <footer className="py-12 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-dark)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8 pb-8"
          style={{ borderBottom: "1px solid rgba(245,230,211,0.1)" }}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🦝</span>
              <span className="font-display text-xl font-bold" style={{ color: "var(--teal-light)" }}>
                Туапсеноты
              </span>
            </div>
            <p className="font-body text-sm" style={{ color: "rgba(245,230,211,0.6)", lineHeight: 1.7 }}>
              {t("footer_about")}
            </p>
          </div>

          <div>
            <h4 className="font-body font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ color: "var(--teal-light)" }}>
              Контакты авторов
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2" style={{ color: "rgba(245,230,211,0.8)" }}>
                <Icon name="User" size={14} />
                <span className="font-body text-sm">{c.authors}</span>
              </div>
              {c.emails.filter(Boolean).map((e) => (
                <div key={e} className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <a href={`mailto:${e}`}
                    className="font-body text-sm hover:underline break-all"
                    style={{ color: "rgba(245,230,211,0.8)" }}>
                    {e}
                  </a>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <PhoneLink
                  className="flex items-center gap-2 font-body text-sm hover:underline cursor-pointer"
                  style={{ color: "rgba(245,230,211,0.8)" }}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-body font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ color: "var(--teal-light)" }}>
              Ссылки
            </h4>
            <div className="space-y-2">
              {links.filter((l) => l.style !== "support").map((l) => {
                const attrs = linkAttrs(resolve(l.href));
                return l.style === "partner" ? (
                  <a key={l.id} {...attrs}
                    className="font-body text-sm px-3 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap transition-transform hover:scale-105"
                    style={{ color: "var(--warm-dark)", fontWeight: 800, background: "linear-gradient(135deg, var(--teal-light), var(--teal))", letterSpacing: "0.02em", boxShadow: "0 2px 10px rgba(64,224,208,0.4)" }}>
                    {l.label}
                  </a>
                ) : (
                  <a key={l.id} {...attrs}
                    className="flex items-center gap-2 font-body text-sm hover:underline"
                    style={{ color: "rgba(245,230,211,0.8)" }}>
                    {l.icon && <Icon name={l.icon} fallback="Link" size={14} />}
                    {l.label}
                  </a>
                );
              })}
            </div>

            {links.filter((l) => l.style === "support").map((l) => (
              <a key={l.id} {...linkAttrs(resolve(l.href))}
                className="btn-primary text-sm mt-6 inline-flex mr-2">
                <Icon name={l.icon || "Heart"} fallback="Heart" size={16} />
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-2">
            <a href="/privacy" className="font-body text-sm underline inline-block"
              style={{ color: "rgba(245,230,211,0.6)" }}>
              Политика обработки персональных данных
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event("cookie-settings-open"))}
              className="font-body text-sm underline inline-block"
              style={{ color: "rgba(245,230,211,0.6)" }}>
              Настройки cookie
            </button>
          </div>
          <p className="font-body text-sm" style={{ color: "rgba(245,230,211,0.4)" }}>
            © 2026 Туапсеноты. С любовью к Туапсе 🌊
          </p>
        </div>
      </div>
    </footer>
  );
}