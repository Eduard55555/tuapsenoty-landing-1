import { useState } from "react";

const STORAGE_KEY = "tn_admin_key";

export function getStoredAdminKey(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function useAdminKey() {
  const [adminKey, setKey] = useState<string>(() => getStoredAdminKey());

  const saveKey = (key: string) => {
    setKey(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {
      /* ignore */
    }
  };

  const clearKey = () => {
    setKey("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return { adminKey, setAdminKey: setKey, saveKey, clearKey };
}
