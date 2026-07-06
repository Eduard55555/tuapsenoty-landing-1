import { useState, useEffect } from "react";

export const FINDER_API = "https://functions.poehali.dev/eec444e5-96b7-4788-9c65-0077c246d938";
export const FINDER_BASE = 0;
export const FINDER_FALLBACK = 1552;

export const CHARACTER_API = "https://functions.poehali.dev/2aaef5e2-54ce-4968-918d-607fd3ca497a";

const CACHE_KEY = "finder-count-cache";
// module rev: 2

function readCache(): { count: number; updatedAt: string | null } {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.count === "number") {
        return { count: parsed.count, updatedAt: parsed.updatedAt ?? null };
      }
    }
  } catch {
    /* ignore */
  }
  return { count: FINDER_FALLBACK, updatedAt: new Date().toISOString() };
}

function writeCache(count: number, updatedAt: string | null) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ count, updatedAt }));
  } catch {
    /* ignore */
  }
}

export function pluralPeople(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "человек";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "человека";
  return "человек";
}

export function useFinderData(): { count: number | null; updatedAt: string | null } {
  const cached = readCache();
  const [count, setCount] = useState<number | null>(cached.count);
  const [updatedAt, setUpdatedAt] = useState<string | null>(cached.updatedAt);

  useEffect(() => {
    fetch(FINDER_API, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") {
          const value = d.count + FINDER_BASE;
          const at = typeof d.updated_at === "string" ? d.updated_at : null;
          setCount(value);
          setUpdatedAt(at);
          writeCache(value, at);
        }
      })
      .catch(() => {});
  }, []);

  return { count, updatedAt };
}

export function useFinderCount(): number | null {
  return useFinderData().count;
}

export function useCharacterData(slug: string): { count: number | null; updatedAt: string | null } {
  const [count, setCount] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${CHARACTER_API}?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") {
          setCount(d.count);
          setUpdatedAt(typeof d.updated_at === "string" ? d.updated_at : null);
        }
      })
      .catch(() => {});
  }, [slug]);

  return { count, updatedAt };
}

const FOUND_FLAG = "finder-found-counted";

// module rev: 3
export function useCountFoundOnce(): void {
  useEffect(() => {
    if (localStorage.getItem(FOUND_FLAG) === "1") return;

    localStorage.setItem(FOUND_FLAG, "1");
    fetch(FINDER_API, { method: "POST", cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") {
          writeCache(d.count, typeof d.updated_at === "string" ? d.updated_at : null);
        }
      })
      .catch(() => {});
  }, []);
}