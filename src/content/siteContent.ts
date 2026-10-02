import { useEffect, useState } from "react";
import func2url from "../../backend/func2url.json";
import { characters as BASE_CHARACTERS, NEWS_PHOTOS } from "@/pages/index/indexData";
import { ENIRA_GALLERY } from "@/pages/index/photosData";
import { PRODUCTS, type Product } from "@/data/products";
import { REVIEWS, type Review } from "@/data/reviews";
import { DELIVERY_FACTS, type DeliveryFact } from "@/data/delivery";

export const CONTENT_URL = (func2url as Record<string, string>)["site-content"];
const CACHE_KEY = "tn_site_content_v1";

export type Character = {
  slug: string;
  name: string;
  emoji: string;
  icon: string;
  role: string;
  description: string;
  ritual: string;
  location?: string;
  color: string;
  image: string;
  map?: string;
  video?: string;
};
export type CharacterOverride = Partial<Pick<Character, "name" | "role" | "description" | "ritual" | "location" | "image">>;

export type NewsItem = { id: string; emoji: string; date: string; title: string; text: string; image?: string; link?: string };

export type FinishedContest = {
  id: string;
  title: string;
  text: string;
  works: string;
  winner: string;
  votes: string;
  footer: string;
  image?: string;
};
export type ActiveContest = { title: string; rules: string; deadline: string; voting: string; prize: string; link: string };
export type ContestsData = { active: ActiveContest | null; finished: FinishedContest[]; upcoming: string[] };

export type Contacts = {
  phone: string;
  emails: string[];
  authors: string;
  max: string;
  vk: string;
  telegram: string;
  planeta: string;
};

export type Media = {
  hero_image: string;
  about_image: string;
  news_enotych_photos: string[];
  news_enira_photos: string[];
  news_enotych_map: string;
  news_enira_map: string;
  common_map: string;
};

export type ContentData = {
  texts?: Record<string, string>;
  characters?: Record<string, CharacterOverride>;
  characterList?: Character[];
  news?: NewsItem[];
  contests?: ContestsData;
  products?: Product[];
  reviews?: Review[];
  delivery?: DeliveryFact[];
  contacts?: Contacts;
  media?: Media;
};

export const TEXT_FIELDS: { group: string; key: string; label: string; def: string; multiline?: boolean }[] = [
  { group: "Главный экран", key: "hero_title", label: "Заголовок", def: "Туапсеноты — новая душа Черноморского побережья" },
  { group: "Главный экран", key: "hero_subtitle", label: "Текст под заголовком", def: "Семья бронзовых енотов-хранителей, которая изменит Туапсе. Восемь персонажей с историями, ритуалами и душой.", multiline: true },
  { group: "О проекте", key: "about_title", label: "Заголовок", def: "Туапсе заслуживает своей легенды" },
  {
    group: "О проекте",
    key: "about_text",
    label: "Текст (абзацы разделяйте пустой строкой)",
    multiline: true,
    def: [
      "Туапсе — город, где море обнимает берег, а горы смотрят в облака. Здесь хочется замедлиться, остановиться, вдохнуть и рассмотреть повнимательнее.",
      "«Туапсеноты» — не просто фигурки. Это маленькое чудо, которое делает город ещё теплее.",
      "Восемь бронзовых енотов. Совсем маленькие — 20 см. Они поселятся на набережной, в парке, на пляже, у вокзала. У каждого — имя, характер, своя тихая легенда. И ритуал, который хочется повторять: потереть лапку, прошептать желание, просто улыбнуться в ответ.",
      "Их можно искать. С ними можно обниматься. Им можно верить.",
      "Мы дарим гостям и жителям города повод остановиться и почувствовать: в Туапсе есть место чуду. И оно уже здесь.",
    ].join("\n\n"),
  },
  { group: "О проекте", key: "about_final", label: "Финальная фраза (курсивом)", def: "Туапсе заслужил свою легенду. Мы её создаём. А вы — её начало." },
  { group: "О проекте", key: "about_quote", label: "Цитата на фото", def: "«Каждый енот — это история, которую хочется рассказать»" },
  { group: "Магазин", key: "shop_title", label: "Заголовок блока на главной", def: "Возьми Туапсенота домой 🦝" },
  { group: "Магазин", key: "shop_subtitle", label: "Текст под заголовком", def: "Фигурки ручной работы «под бронзу». Тёплый подарок и память о Туапсе." },
  { group: "Отзывы", key: "reviews_title", label: "Заголовок", def: "Что говорят наши покупатели" },
  { group: "Отзывы", key: "reviews_subtitle", label: "Текст под заголовком", def: "Каждая фигурка уезжает в новый дом со своей историей" },
  { group: "Персонажи", key: "characters_title", label: "Заголовок блока", def: "Познакомьтесь с семьёй" },
  { group: "Персонажи", key: "characters_subtitle", label: "Подзаголовок блока", def: "Восемь уникальных хранителей. У каждого — своё место, характер и ритуал удачи.", multiline: true },
  { group: "Новости", key: "news_title", label: "Заголовок блока", def: "Это уже происходит" },
  { group: "Новости", key: "news_enotych_date", label: "Енотыч — дата", def: "Май 2026" },
  { group: "Новости", key: "news_enotych_title", label: "Енотыч — заголовок", def: "Енотыч уже отлит в бронзе!" },
  { group: "Новости", key: "news_enotych_text", label: "Енотыч — текст", multiline: true, def: "Первый хранитель семьи — Енотыч — готов. Бронзовый рыбак с удочкой уже воплощён мастерами, установлен на набережной и ждёт жителей и гостей Туапсе." },
  { group: "Новости", key: "news_enira_date", label: "Енира — дата", def: "Май 2026" },
  { group: "Новости", key: "news_enira_title", label: "Енира — заголовок", def: "Енира с Тыдочкой заняли своё место!" },
  { group: "Новости", key: "news_enira_text", label: "Енира — текст", multiline: true, def: "Ласковая мама семьи — Енира с Тыдочкой — уже в бронзе и установлены в городе. Обнимите их, и даже в пасмурный день станет солнечно. Отметили их на карте — приходите знакомиться." },
  { group: "Новости", key: "news_enofya_date", label: "Енофья — дата", def: "Май 2026" },
  { group: "Новости", key: "news_enofya_title", label: "Енофья — заголовок", def: "Енофья отлита в бронзе!" },
  { group: "Новости", key: "news_enofya_text", label: "Енофья — текст", multiline: true, def: "Добрая бабушка семьи — Енофья — воплощена мастерами. В чепце и фартуке, с корзинкой полной гостинцев, она скоро появится в городе и будет встречать гостей Туапсе с улыбкой и теплом." },
  { group: "Карта", key: "map_title", label: "Заголовок страницы карты", def: "Где найти енотов" },
  { group: "Карта", key: "map_intro", label: "Текст под заголовком", multiline: true, def: "Восемь бронзовых хранителей поселятся по всему городу. Остальные скоро займут свои места." },
  { group: "Конкурсы", key: "contests_intro", label: "Текст под заголовком", multiline: true, def: "Здесь мы собираем ваши истории, фото и идеи. Участвуйте — и попадёте в бронзовую летопись города." },
  { group: "Подвал сайта", key: "footer_about", label: "Текст о проекте", multiline: true, def: "Семья бронзовых енотов-хранителей Туапсе. Проект авторов Эдуарда и Ирины Сарбаевых." },
];

export const DEFAULT_NEWS: NewsItem[] = [
  { id: "admin", emoji: "🏛️", title: "Администрация поддержала проект", date: "Апрель 2026", text: "Официальное одобрение от администрации Туапсе открыло путь к размещению скульптур в городе." },
  { id: "legal", emoji: "⚖️", title: "Юридическая защита оформлена", date: "Март 2026", text: "Персонажи и названия зарегистрированы. Туапсеноты под надёжной защитой авторского права." },
];

export const DEFAULT_CONTESTS: ContestsData = {
  active: null,
  finished: [
    {
      id: "photo-2026-09",
      title: "Фотоконкурс «Туапсеноты» (сентябрь 2026)",
      text: "Мы провели первый конкурс фотографий с нашими бронзовыми хранителями. Вы прислали 33 работы — тёплые, смешные и трогательные. Спасибо каждому!",
      works: "33",
      winner: "№8",
      votes: "103",
      footer: "Голосование проходило в MAX и ВКонтакте. Все работы добавлены в нашу галерею.",
    },
  ],
  upcoming: [
    "Конкурс на лучшую историю о Енотыче",
    "Конкурс на лучшее фото с Енирой и Тыдочкой",
    "Конкурс на лучшее название для нового енота",
  ],
};

export const DEFAULT_CONTACTS: Contacts = {
  phone: "8-918-505-16-17",
  emails: ["sen555551@mail.ru", "galyapina2014@yandex.ru"],
  authors: "Эдуард и Ирина Сарбаевы",
  max: "https://max.ru/channel_tuapsenoty",
  vk: "https://vk.ru/club237171594",
  telegram: "https://t.me/tuapsenoty",
  planeta: "https://planeta.ru/campaigns/244619",
};

export const DEFAULT_MEDIA: Media = {
  hero_image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/opt/93ed2016798c4b13abf094a11fc45750.webp",
  about_image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/opt/d9f2d83f1f264f32945cf1a8d5470ab4.webp",
  news_enotych_photos: NEWS_PHOTOS,
  news_enira_photos: ENIRA_GALLERY,
  news_enotych_map: "https://yandex.ru/map-widget/v1/?um=constructor%3A8320dc8f2d5e1729b5847107af9a69817a72779d9419cdcc1cbccdcb1acbdb4d&source=constructor",
  news_enira_map: "https://yandex.ru/map-widget/v1/?um=constructor%3A9fcbfbcb651b40d9e69ee5338b8b1851be093eac55d8eeecc355d63a5cb6f9bc&source=constructor",
  common_map: "https://yandex.ru/map-widget/v1/?um=constructor%3A706221539dc93604d0beec3a3496e2a6aaa2d808267cff39add22954de10ad95&source=constructor",
};

export function normalizeMapUrl(raw: string): string {
  let s = (raw || "").trim();
  if (!s) return "";
  const src = s.match(/src=["']([^"']+)["']/i);
  if (src) s = src[1];
  s = s.replace(/&amp;/g, "&");
  const um = s.match(/um=(constructor(?:%3A|:)[0-9a-f]+)/i);
  if (um) return `https://yandex.ru/map-widget/v1/?um=${um[1].replace(":", "%3A")}&source=constructor`;
  if (/yandex\.(ru|com)\/map-widget\//.test(s)) return s;
  const m = s.match(/^https?:\/\/(?:www\.)?yandex\.(ru|com)\/maps\/(.*)$/i);
  if (m) {
    const rest = m[2].replace(/^\d+\/[^/?]+\//, "");
    return `https://yandex.ru/map-widget/v1/${rest}`;
  }
  return s;
}

const readCache = (): ContentData => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
};

let state: ContentData = typeof window !== "undefined" ? readCache() : {};
const listeners = new Set<() => void>();
let fetched = false;

export const setContent = (patch: ContentData) => {
  state = { ...state, ...patch };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
};

export const loadContent = () =>
  fetch(CONTENT_URL, { cache: "no-store" })
    .then((r) => r.json())
    .then((d) => {
      if (d?.content) {
        state = d.content;
        setContent({});
      }
    })
    .catch(() => {});

export function useContent(): ContentData {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    if (!fetched) {
      fetched = true;
      loadContent();
    }
    return () => {
      listeners.delete(l);
    };
  }, []);
  return state;
}

export const textDefault = (key: string) => TEXT_FIELDS.find((f) => f.key === key)?.def ?? "";

export function useTexts() {
  const c = useContent();
  return (key: string) => {
    const v = c.texts?.[key];
    return v && v.trim() ? v : textDefault(key);
  };
}

export const mergeCharacters = (c: ContentData): Character[] => {
  if (c.characterList && c.characterList.length) return c.characterList;
  const over = c.characters;
  return (BASE_CHARACTERS as Character[]).map((ch) => {
    const o = over?.[ch.slug];
    if (!o) return ch;
    const clean = Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== ""));
    const merged = { ...ch, ...clean } as Character;
    if (o.location === "") merged.location = "";
    return merged;
  });
};

export function useCharacters(): Character[] {
  return mergeCharacters(useContent());
}

export function useNews(): NewsItem[] {
  return useContent().news ?? DEFAULT_NEWS;
}

export function useContests(): ContestsData {
  return useContent().contests ?? DEFAULT_CONTESTS;
}

export function useProducts(): Product[] {
  const p = useContent().products;
  return p && p.length ? p : PRODUCTS;
}

export function useReviews(): Review[] {
  return useContent().reviews ?? REVIEWS;
}

export function useDelivery(): DeliveryFact[] {
  const d = useContent().delivery;
  return d && d.length ? d : DELIVERY_FACTS;
}

export function useContacts(): Contacts {
  return { ...DEFAULT_CONTACTS, ...(useContent().contacts ?? {}) };
}

export function useMedia(): Media {
  return { ...DEFAULT_MEDIA, ...(useContent().media ?? {}) };
}
