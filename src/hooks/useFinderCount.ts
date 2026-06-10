import { useState, useEffect } from "react";

export const FINDER_API = "https://functions.poehali.dev/eec444e5-96b7-4788-9c65-0077c246d938";
export const FINDER_BASE = 200;

export function pluralPeople(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "человек";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "человека";
  return "человек";
}

export function useFinderCount(): number | null {
  return useFinderData().count;
}

export function useFinderData(): { count: number | null; updatedAt: string | null } {
  const [count, setCount] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    fetch(FINDER_API, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setCount(typeof d.count === "number" ? d.count + FINDER_BASE : null);
        setUpdatedAt(typeof d.updated_at === "string" ? d.updated_at : null);
      })
      .catch(() => {});
  }, []);

  return { count, updatedAt };
}