import Icon from "@/components/ui/icon";

const PLANETA_URL = "https://planeta.ru/campaigns/244619";
const MAX_URL = "https://max.ru/join/uBdeDmv3f51WgWvFTPMWA84VIaYSgeU9yLwdr9lYO1g";
const VK_URL = "https://vk.ru/club237171594";

export default function SiteFooter() {
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
              Семья бронзовых енотов-хранителей Туапсе. Проект авторов Эдуарда и Ирины Сарбаевых.
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
                <span className="font-body text-sm">Эдуард и Ирина Сарбаевы</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={14} />
                <a href="mailto:sen555551@mail.ru"
                  className="font-body text-sm hover:underline"
                  style={{ color: "rgba(245,230,211,0.8)" }}>
                  sen555551@mail.ru
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={14} />
                <a href="mailto:galyapina2014@yandex.ru"
                  className="font-body text-sm hover:underline"
                  style={{ color: "rgba(245,230,211,0.8)" }}>
                  galyapina2014@yandex.ru
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={14} />
                <a href="tel:+79185051617"
                  className="font-body text-sm hover:underline"
                  style={{ color: "rgba(245,230,211,0.8)" }}>
                  8-918-505-16-17
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-body font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ color: "var(--teal-light)" }}>
              Ссылки
            </h4>
            <div className="space-y-2">
              <a href={MAX_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm hover:underline"
                style={{ color: "rgba(245,230,211,0.8)" }}>
                <Icon name="MessageCircle" size={14} />
                Мессенджер Макс
              </a>
              <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm hover:underline"
                style={{ color: "rgba(245,230,211,0.8)" }}>
                <Icon name="ExternalLink" size={14} />
                Страница на Planeta.ru
              </a>
              <a href={VK_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm hover:underline"
                style={{ color: "rgba(245,230,211,0.8)" }}>
                <Icon name="Users" size={14} />
                ВКонтакте
              </a>
            </div>

            <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary text-sm mt-6 inline-flex">
              <Icon name="Heart" size={16} />
              Поддержить проект
            </a>
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
