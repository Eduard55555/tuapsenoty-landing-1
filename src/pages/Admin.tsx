import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminKey } from "@/hooks/useAdminKey";
import Icon from "@/components/ui/icon";
import CounterAdmin from "@/components/CounterAdmin";
import OrdersPanel from "@/components/admin/OrdersPanel";
import PhotosPanel from "@/components/admin/PhotosPanel";
import NewsletterPanel from "@/components/admin/NewsletterPanel";
import func2url from "../../backend/func2url.json";

const CHECK_URL = (func2url as Record<string, string>)["orders-list"];

type Section = "orders" | "photos" | "counters" | "newsletter";

const SECTIONS: { id: Section; title: string; icon: string }[] = [
  { id: "orders", title: "Заказы", icon: "ShoppingBag" },
  { id: "photos", title: "Фото", icon: "Images" },
  { id: "counters", title: "Счётчики", icon: "Hash" },
  { id: "newsletter", title: "Рассылка", icon: "Mail" },
];

const isSection = (v: string | null): v is Section => SECTIONS.some((s) => s.id === v);

export default function Admin({ initial = "orders" }: { initial?: Section }) {
  const { adminKey, setAdminKey, saveKey, clearKey } = useAdminKey();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [section, setSection] = useState<Section>(() => {
    const fromHash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    return isSection(fromHash) ? fromHash : initial;
  });

  const login = async (key: string, silent = false) => {
    if (!key) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch(CHECK_URL, { headers: { "X-Admin-Key": key } });
      if (res.status === 403) {
        clearKey();
        if (!silent) setError("Неверный пароль");
      } else {
        saveKey(key);
        setAuthed(true);
      }
    } catch {
      if (!silent) setError("Ошибка соединения. Попробуйте ещё раз.");
    }
    setLoading(false);
  };

  const autoTried = useRef(false);
  useEffect(() => {
    if (autoTried.current || !adminKey) return;
    autoTried.current = true;
    login(adminKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  const choose = (s: Section) => {
    setSection(s);
    window.history.replaceState(null, "", `/admin#${s}`);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12" style={{ backgroundColor: "var(--cream)" }}>
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl p-5 sm:p-8 shadow-lg" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">🦝</span>
              <h1 className="text-xl sm:text-2xl font-extrabold" style={{ color: "var(--sea)", fontFamily: "'Nunito', sans-serif" }}>
                Панель управления
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-semibold border text-sm"
                style={{ borderColor: "var(--sand)", color: "var(--sea)" }}
              >
                <Icon name="Home" size={16} />
                <span className="hidden sm:inline">На сайт</span>
              </Link>
              {authed && (
                <button
                  onClick={() => {
                    clearKey();
                    setAuthed(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-semibold border text-sm"
                  style={{ borderColor: "var(--sand)", color: "var(--muted-foreground)" }}
                >
                  <Icon name="LogOut" size={16} />
                  <span className="hidden sm:inline">Выйти</span>
                </button>
              )}
            </div>
          </div>

          {!authed ? (
            <div className="space-y-4 max-w-md">
              <p style={{ color: "var(--warm-text)" }}>Введите пароль, чтобы войти.</p>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login(adminKey)}
                placeholder="Пароль"
                className="w-full rounded-xl px-4 py-3 outline-none border"
                style={{ borderColor: "var(--sand)", color: "var(--warm-dark)" }}
              />
              {error && <p style={{ color: "#C0392B" }}>{error}</p>}
              <button
                onClick={() => login(adminKey)}
                disabled={loading || !adminKey}
                className="w-full rounded-xl py-3 font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: "var(--sea)" }}
              >
                {loading ? <Icon name="Loader2" className="animate-spin" size={20} /> : <Icon name="LogIn" size={20} />}
                Войти
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {SECTIONS.map((s) => {
                  const active = section === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => choose(s.id)}
                      className="rounded-xl px-3 py-3 font-semibold flex items-center justify-center gap-2 border transition-colors"
                      style={
                        active
                          ? { backgroundColor: "var(--sea)", color: "#fff", borderColor: "var(--sea)" }
                          : { borderColor: "var(--sand)", color: "var(--warm-text)" }
                      }
                    >
                      <Icon name={s.icon} size={18} />
                      {s.title}
                    </button>
                  );
                })}
              </div>

              {section === "orders" && <OrdersPanel adminKey={adminKey} />}
              {section === "photos" && <PhotosPanel adminKey={adminKey} />}
              {section === "counters" && <CounterAdmin adminKey={adminKey} />}
              {section === "newsletter" && <NewsletterPanel adminKey={adminKey} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
