import { useState, useEffect } from "react";

const API = "https://functions.poehali.dev/2aaef5e2-54ce-4968-918d-607fd3ca497a";

export function useCharacterStats(slug: string): { count: number | null; updatedAt: string | null } {
  const [count, setCount] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${API}?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (typeof d.count === "number") setCount(d.count);
        if (typeof d.updated_at === "string") setUpdatedAt(d.updated_at);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug]);

  return { count, updatedAt };
}

export function useCharacterCount(slug: string): number | null {
  return useCharacterStats(slug).count;
}

export default useCharacterCount;
