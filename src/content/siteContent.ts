import { useEffect, useState } from "react";
import func2url from "../../backend/func2url.json";
import { characters as BASE_CHARACTERS } from "@/pages/index/indexData";

export const CONTENT_URL = (func2url as Record<string, string>)["site-content"];
const CACHE_KEY = "tn_site_content_v1";

export type Character = (typeof BASE_CHARACTERS)[number] & { location?: string; video?: string; map?: string };
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
};
export type ActiveContest = { title: string; rules: string; deadline: string; voting: string; prize: string; link: string };
export type ContestsData = { active: ActiveContest | null; finished: FinishedContest[]; upcoming: string[] };

export type ContentData = {
  texts?: Record<string, string>;
  characters?: Record<string, CharacterOverride>;
  news?: NewsItem[];
  contests?: ContestsData;
};

export const TEXT_FIELDS: { group: string; key: string; label: string; def: string; multiline?: boolean }[] = [
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
  { group: "Персонажи", key: "characters_subtitle", label: "Подзаголовок блока", def: "Восемь уникальных хранителей. У каждого — своё место, характер и ритуал удачи.", multiline: true },
  { group: "Новости", key: "news_enotych_date", label: "Енотыч — дата", def: "Май 2026" },
  { group: "Новости", key: "news_enotych_title", label: "Енотыч — заголовок", def: "Енотыч уже отлит в бронзе!" },
  { group: "Новости", key: "news_enotych_text", label: "Енотыч — текст", multiline: true, def: "Первый хранитель семьи — Енотыч — готов. Бронзовый рыбак с удочкой уже воплощён мастерами, установлен на набережной и ждёт жителей и гостей Туапсе." },
  { group: "Новости", key: "news_enira_date", label: "Енира — дата", def: "Май 2026" },
  { group: "Новости", key: "news_enira_title", label: "Енира — заголовок", def: "Енира с Тыдочкой заняли своё место!" },
  { group: "Новости", key: "news_enira_text", label: "Енира — текст", multiline: true, def: "Ласковая мама семьи — Енира с Тыдочкой — уже в бронзе и установлены в городе. Обнимите их, и даже в пасмурный день станет солнечно. Отметили их на карте — приходите знакомиться." },
  { group: "Новости", key: "news_enofya_date", label: "Енофья — дата", def: "Май 2026" },
  { group: "Новости", key: "news_enofya_title", label: "Енофья — заголовок", def: "Енофья отлита в бронзе!" },
  { group: "Новости", key: "news_enofya_text", label: "Енофья — текст", multiline: true, def: "Добрая бабушка семьи — Енофья — воплощена мастерами. В чепце и фартуке, с корзинкой полной гостинцев, она скоро появится в городе и будет встречать гостей Туапсе с улыбкой и теплом." },
  { group: "Конкурсы", key: "contests_intro", label: "Текст под заголовком", multiline: true, def: "Здесь мы собираем ваши истории, фото и идеи. Участвуйте — и попадёте в бронзовую летопись города." },
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

export const mergeCharacters = (over?: Record<string, CharacterOverride>): Character[] =>
  (BASE_CHARACTERS as Character[]).map((ch) => {
    const o = over?.[ch.slug];
    if (!o) return ch;
    const clean = Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== ""));
    const merged = { ...ch, ...clean } as Character;
    if (o.location === "") merged.location = "";
    return merged;
  });

export function useCharacters(): Character[] {
  const c = useContent();
  return mergeCharacters(c.characters);
}

export function useNews(): NewsItem[] {
  return useContent().news ?? DEFAULT_NEWS;
}

export function useContests(): ContestsData {
  return useContent().contests ?? DEFAULT_CONTESTS;
}
