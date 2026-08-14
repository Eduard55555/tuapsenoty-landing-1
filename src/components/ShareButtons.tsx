import Icon from "@/components/ui/icon";

const SHARE_TEXT = "Посмотрите, каких енотов я нашёл в Туапсе! tuapsenoty.ru";
const SHARE_URL = "https://tuapsenoty.ru";

const NETWORKS = [
  {
    id: "vk",
    label: "ВКонтакте",
    icon: "Users",
    color: "#0077FF",
    href: () =>
      `https://vk.com/share.php?url=${encodeURIComponent(SHARE_URL)}&title=${encodeURIComponent(SHARE_TEXT)}`,
  },
  {
    id: "tg",
    label: "Telegram",
    icon: "Send",
    color: "#29A9EB",
    href: () =>
      `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`,
  },
  {
    id: "wa",
    label: "WhatsApp",
    icon: "MessageCircle",
    color: "#25D366",
    href: () => `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`,
  },
];

export default function ShareButtons({ label = "Поделиться:" }: { label?: string }) {
  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=650,height=560");
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-body text-xs" style={{ color: "#9B7B5A" }}>
        {label}
      </span>
      {NETWORKS.map((n) => (
        <button
          key={n.id}
          type="button"
          onClick={() => open(n.href())}
          aria-label={`Поделиться в ${n.label}`}
          title={`Поделиться в ${n.label}`}
          className="flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
          style={{ width: 34, height: 34, backgroundColor: n.color, color: "white" }}
        >
          <Icon name={n.icon} size={17} />
        </button>
      ))}
    </div>
  );
}
