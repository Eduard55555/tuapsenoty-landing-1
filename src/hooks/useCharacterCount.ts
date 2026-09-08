import { useCharacterData } from "@/hooks/useFinderCount";

export function useCharacterStats(slug: string): { count: number | null; updatedAt: string | null } {
  return useCharacterData(slug);
}

export function useCharacterCount(slug: string): number | null {
  return useCharacterData(slug).count;
}

export default useCharacterCount;
