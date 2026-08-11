import { useState, useEffect } from "react";
import { CHARACTER_API } from "@/hooks/useFinderCount";

export function useCharacterCount(slug: string): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${CHARACTER_API}?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {});
  }, [slug]);

  return count;
}

export default useCharacterCount;
