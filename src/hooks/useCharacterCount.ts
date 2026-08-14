import { useState, useEffect } from "react";
import { CHARACTER_API } from "@/hooks/useFinderCount";

export function useCharacterStats(slug: string): { count: number | null; updatedAt: string | null } {
  const [count, setCount] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${CHARACTER_API}?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") setCount(d.count);
        if (typeof d.updated_at === "string") setUpdatedAt(d.updated_at);
      })
      .catch(() => {});
  }, [slug]);

  return { count, updatedAt };
}

export function useCharacterCount(slug: string): number | null {
  return useCharacterStats(slug).count;
}

export default useCharacterCount;