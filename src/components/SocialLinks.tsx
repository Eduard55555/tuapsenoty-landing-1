import Icon from "@/components/ui/icon";

export const MAX_URL = "https://max.ru/channel_tuapsenoty";
export const VK_URL = "https://vk.ru/club237171594";
export const TELEGRAM_URL = "https://t.me/tuapsenoty";

export const SOCIAL_LINKS = [
  { url: TELEGRAM_URL, label: "Telegram", icon: "Send", color: "#2AABEE" },
  { url: VK_URL, label: "ВКонтакте", icon: "Users", color: "#0077FF" },
  { url: MAX_URL, label: "MAX", icon: "MessageCircle", color: "#7C4DFF" },
];

export default function SocialLinks() {
  return (
    <section className="py-14 px-4 sm:px-6" style={{ backgroundColor: "var(--sand)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
          Мы в соцсетях
        </h2>
        <p className="font-body text-sm sm:text-base mb-7" style={{ color: "rgba(60,40,25,0.7)" }}>
          Новости о новых енотах, фото с набережной и живая жизнь проекта
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {SOCIAL_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-body font-bold text-sm sm:text-base text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: l.color }}
            >
              <Icon name={l.icon} fallback="Link" size={20} />
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}