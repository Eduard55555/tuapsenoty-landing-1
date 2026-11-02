import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  DEFAULT_FOOTER_LINKS,
  DEFAULT_HERO_BUTTONS,
  DEFAULT_MENU,
  useContacts,
  useFooterLinks,
  useHeroButtons,
  useMenu,
  type Contacts,
  type LinkButton,
  type MenuItem,
} from "@/content/siteContent";
import { saveContent } from "./contentApi";
import ButtonListEditor from "./ButtonListEditor";
import FixedButtonsEditor from "./FixedButtonsEditor";

type Tab = "menu" | "hero" | "footer" | "other";

const TABS: { id: Tab; title: string; icon: string }[] = [
  { id: "menu", title: "Меню вверху", icon: "PanelTop" },
  { id: "hero", title: "Главный экран", icon: "MousePointerClick" },
  { id: "footer", title: "Подвал сайта", icon: "PanelBottom" },
  { id: "other", title: "Остальные", icon: "LayoutGrid" },
];

const MENU_STYLES: [string, string][] = [
  ["auto", "Обычная (цвет по порядку)"],
  ["support", "Широкая бронзовая с сердечком"],
  ["partner", "Бирюзовая яркая"],
];

const HERO_STYLES: [string, string][] = [
  ["bronze", "Бронзовая"],
  ["teal", "Бирюзовая"],
  ["sea", "Морская тёмная"],
];

const FOOTER_STYLES: [string, string][] = [
  ["auto", "Ссылка со значком"],
  ["partner", "Бирюзовая кнопка"],
  ["support", "Большая бронзовая кнопка внизу"],
];

export default function MenuEditor({ adminKey }: { adminKey: string }) {
  const [tab, setTab] = useState<Tab>("menu");
  const contacts = useContacts();
  const menu = useMenu();
  const hero = useHeroButtons();
  const footer = useFooterLinks();

  const save = (patch: Partial<Contacts>) => saveContent(adminKey, "contacts", { ...contacts, ...patch });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 border"
              style={
                active
                  ? { backgroundColor: "var(--bronze)", color: "#fff", borderColor: "var(--bronze)" }
                  : { borderColor: "var(--sand)", color: "var(--warm-text)" }
              }
            >
              <Icon name={t.icon} fallback="Square" size={16} />
              {t.title}
            </button>
          );
        })}
      </div>

      {tab === "menu" && (
        <ButtonListEditor
          key="menu"
          hint="Кнопки меню вверху сайта на всех страницах."
          initial={menu as LinkButton[]}
          defaults={DEFAULT_MENU as LinkButton[]}
          styles={MENU_STYLES}
          onSave={(items) => save({ menu: items as MenuItem[] })}
        />
      )}
      {tab === "hero" && (
        <ButtonListEditor
          key="hero"
          hint="Большие кнопки на первом экране главной, под заголовком."
          initial={hero}
          defaults={DEFAULT_HERO_BUTTONS}
          styles={HERO_STYLES}
          withIcon
          onSave={(items) => save({ heroButtons: items })}
        />
      )}
      {tab === "footer" && (
        <ButtonListEditor
          key="footer"
          hint="Колонка «Ссылки» в подвале сайта."
          initial={footer}
          defaults={DEFAULT_FOOTER_LINKS}
          styles={FOOTER_STYLES}
          withIcon
          onSave={(items) => save({ footerLinks: items })}
        />
      )}
      {tab === "other" && <FixedButtonsEditor initial={contacts.buttons ?? {}} onSave={(buttons) => save({ buttons })} />}
    </div>
  );
}
