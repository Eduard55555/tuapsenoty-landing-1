import Icon from "@/components/ui/icon";
import { useContacts, useMenu } from "@/content/siteContent";

const HERO_STOPS: { p: number; c: [number, number, number] }[] = [
  { p: 0, c: [46, 92, 110] },
  { p: 0.25, c: [61, 122, 144] },
  { p: 0.65, c: [184, 115, 51] },
  { p: 0.85, c: [245, 160, 80] },
  { p: 1, c: [245, 230, 211] },
];

function gradientColor(t: number): [number, number, number] {
  for (let i = 0; i < HERO_STOPS.length - 1; i++) {
    const a = HERO_STOPS[i];
    const b = HERO_STOPS[i + 1];
    if (t >= a.p && t <= b.p) {
      const k = (t - a.p) / (b.p - a.p);
      return [
        Math.round(a.c[0] + (b.c[0] - a.c[0]) * k),
        Math.round(a.c[1] + (b.c[1] - a.c[1]) * k),
        Math.round(a.c[2] + (b.c[2] - a.c[2]) * k),
      ];
    }
  }
  return HERO_STOPS[HERO_STOPS.length - 1].c;
}

function gradientButtonStyle(t: number): React.CSSProperties {
  const [r, g, b] = gradientColor(t);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const color = luminance > 0.6 ? "var(--warm-dark)" : "#fff";
  return {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    color,
    fontWeight: 800,
    letterSpacing: "0.02em",
    boxShadow: `0 2px 10px rgba(${r}, ${g}, ${b}, 0.45)`,
  };
}

const PARTNER_STYLE: React.CSSProperties = {
  color: "var(--warm-dark)",
  fontWeight: 800,
  background: "linear-gradient(135deg, var(--teal-light), var(--teal))",
  letterSpacing: "0.02em",
  boxShadow: "0 2px 10px rgba(64,224,208,0.4)",
};

export default function SiteHeader({ showCart = false }: { showCart?: boolean }) {
  const PLANETA_URL = useContacts().planeta;
  const menu = useMenu().filter((m) => m.label.trim());
  const resolve = (href: string) => (href.trim() === "planeta" ? PLANETA_URL : href.trim() || "/");
  const isExternal = (href: string) => /^https?:\/\//.test(href);
  const support = menu.filter((m) => m.style === "support");
  const regular = menu.filter((m) => m.style !== "support");
  const autoCount = regular.filter((m) => m.style !== "partner").length;
  let autoIdx = -1;
  const styled = regular.map((m) => {
    if (m.style === "partner") return { m, style: PARTNER_STYLE };
    autoIdx += 1;
    return { m, style: gradientButtonStyle(autoCount > 1 ? autoIdx / (autoCount - 1) : 0) };
  });
  const linkProps = (href: string) => {
    const url = resolve(href);
    return isExternal(url) ? { href: url, target: "_blank", rel: "noopener noreferrer" } : { href: url };
  };

  return (
    <header className="relative lg:fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(253, 246, 238, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(184,115,51,0.15)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🦝</span>
            <span className="font-display text-xl font-bold" style={{ color: "var(--bronze)" }}>
              Туапсеноты
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-3 flex-wrap justify-end py-2">
            {support.map((m) => (
              <a key={m.id} {...linkProps(m.href)} className="btn-primary text-sm px-3 py-1 whitespace-nowrap">
                <Icon name="Heart" size={16} />
                {m.label}
              </a>
            ))}
            {styled.map(({ m, style }) => (
              <a key={m.id} {...linkProps(m.href)}
                className="font-body text-sm px-3 py-1 rounded-full whitespace-nowrap transition-transform hover:scale-105"
                style={style}>
                {m.label}
              </a>
            ))}
            {showCart && (
              <a href="/cart" className="btn-primary text-sm px-3 py-1 whitespace-nowrap">
                <Icon name="ShoppingCart" size={16} />
                Корзина
              </a>
            )}
          </nav>
        </div>

        <nav className="lg:hidden pb-3 space-y-2">
          {support.map((m) => (
            <a key={m.id} {...linkProps(m.href)} className="btn-primary text-sm w-full justify-center py-2">
              <Icon name="Heart" size={16} />
              {m.label}
            </a>
          ))}
          <div className="flex flex-wrap gap-2">
            {styled.map(({ m, style }) => (
              <a key={m.id} {...linkProps(m.href)}
                className={`font-body text-sm py-1.5 px-2 rounded-full text-center whitespace-nowrap flex-grow ${m.style === "partner" ? "basis-[45%]" : "basis-[30%]"}`}
                style={style}>
                {m.label}
              </a>
            ))}
            {showCart && (
              <a href="/cart"
                className="btn-primary text-sm py-1.5 px-2 justify-center whitespace-nowrap flex-grow basis-[30%]">
                <Icon name="ShoppingCart" size={16} />
                Корзина
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
