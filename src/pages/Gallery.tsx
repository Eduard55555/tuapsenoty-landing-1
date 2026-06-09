import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

interface Placed {
  slug: string;
  name: string;
  emoji: string;
  location: string;
  color: string;
  photos: string[];
}

const placed: Placed[] = [
  {
    slug: "enotych",
    name: "Енотыч",
    emoji: "🎣",
    location: "Набережная",
    color: "from-amber-100 to-yellow-100",
    photos: [
      "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/9d5c8070-8417-4cb5-822b-c4138a28afa9.jpg",
      "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/356aaec3-5d2a-4259-8701-90a9cc1bc1f5.jpg",
      "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/6aa1ad26-3a1e-4c0a-93c5-3228fec581ce.jpg",
    ],
  },
];

export default function Gallery() {
  const photos = placed.flatMap((c) =>
    c.photos.map((url, i) => ({ ...c, url, key: `${c.slug}-${i}` }))
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">📸</div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
              Галерея
            </h1>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Бронзовые еноты, которые уже нашли своё место в Туапсе. Приходите в гости —
              потрите на удачу и загадайте желание.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((p) => (
              <Link key={p.key} to={`/characters/${p.slug}`}
                className="rounded-3xl overflow-hidden card-hover flex flex-col"
                style={{ background: "#fff", border: "1px solid rgba(184,115,51,0.15)" }}>
                <div className={`bg-gradient-to-br ${p.color}`}>
                  <img src={p.url} alt={p.name}
                    className="w-full object-cover"
                    style={{ height: "320px", objectPosition: "center" }} />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold" style={{ color: "var(--warm-dark)" }}>
                    {p.emoji} {p.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={14} style={{ color: "var(--sea)" }} />
                    <span className="font-body text-sm" style={{ color: "var(--sea)" }}>
                      {p.location}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}