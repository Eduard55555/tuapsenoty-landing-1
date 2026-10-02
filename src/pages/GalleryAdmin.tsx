import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminKey } from "@/hooks/useAdminKey";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const URL = (func2url as Record<string, string>)["gallery-photos"];

type Photo = { id: number; url: string; comment: string; created_at: string | null };
type Tab = "pending" | "approved";

export default function GalleryAdmin() {
  const { adminKey, setAdminKey, saveKey, clearKey } = useAdminKey();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("pending");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async (key: string, status: Tab = tab, silent = false) => {
    if (!key) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${URL}?status=${status}`, { headers: { "X-Admin-Key": key } });
      if (res.status === 403) {
        clearKey();
        setAuthed(false);
        if (!silent) setError("Неверный пароль");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPhotos(data.photos ?? []);
      saveKey(key);
      setAuthed(true);
    } catch {
      if (!silent) setError("Ошибка соединения. Попробуйте ещё раз.");
    }
    setLoading(false);
  };

  const autoTried = useRef(false);
  useEffect(() => {
    if (autoTried.current || !adminKey) return;
    autoTried.current = true;
    load(adminKey, "pending", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  const switchTab = (t: Tab) => {
    setTab(t);
    load(adminKey, t);
  };

  const act = async (id: number, action: "approve" | "reject") => {
    if (action === "reject" && !confirm("Удалить это фото?")) return;
    setBusyId(id);
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
        body: JSON.stringify({ action, id }),
      });
      if (res.ok) setPhotos((p) => p.filter((x) => x.id !== id));
    } catch {
      setError("Не получилось, попробуйте ещё раз");
    }
    setBusyId(null);
  };

  const formatDate = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12" style={{ backgroundColor: "var(--cream)" }}>
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl p-5 sm:p-8 shadow-lg" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl sm:text-3xl">📸</span>
            <h1 className="text-xl sm:text-2xl font-extrabold" style={{ color: "var(--sea)", fontFamily: "'Nunito', sans-serif" }}>
              Фото от посетителей
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold border"
              style={{ borderColor: "var(--sand)", color: "var(--sea)" }}
            >
              <Icon name="Images" size={18} />
              Открыть галерею
            </Link>
            {authed && (
              <button
                onClick={() => {
                  clearKey();
                  setAuthed(false);
                }}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold border"
                style={{ borderColor: "var(--sand)", color: "var(--muted-foreground)" }}
              >
                <Icon name="LogOut" size={18} />
                Выйти
              </button>
            )}
          </div>

          {!authed ? (
            <div className="space-y-4">
              <p style={{ color: "var(--warm-text)" }}>Введите пароль, чтобы проверить присланные фото.</p>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && load(adminKey, "pending")}
                placeholder="Пароль"
                className="w-full rounded-xl px-4 py-3 outline-none border"
                style={{ borderColor: "var(--sand)", color: "var(--warm-dark)" }}
              />
              {error && <p style={{ color: "#C0392B" }}>{error}</p>}
              <button
                onClick={() => load(adminKey, "pending")}
                disabled={loading || !adminKey}
                className="w-full rounded-xl py-3 font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: "var(--sea)" }}
              >
                {loading ? <Icon name="Loader2" className="animate-spin" size={20} /> : <Icon name="LogIn" size={20} />}
                Войти
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex gap-2">
                {(["pending", "approved"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => switchTab(t)}
                    className="rounded-xl px-4 py-2.5 font-semibold border"
                    style={
                      tab === t
                        ? { backgroundColor: "var(--sea)", color: "#fff", borderColor: "var(--sea)" }
                        : { borderColor: "var(--sand)", color: "var(--warm-text)" }
                    }
                  >
                    {t === "pending" ? "На проверке" : "В галерее"}
                  </button>
                ))}
              </div>

              {error && <p style={{ color: "#C0392B" }}>{error}</p>}

              {loading ? (
                <div className="flex justify-center py-10">
                  <Icon name="Loader2" className="animate-spin" size={28} />
                </div>
              ) : photos.length === 0 ? (
                <p className="text-center py-10" style={{ color: "var(--warm-text)" }}>
                  {tab === "pending" ? "Новых фото нет" : "Пока ни одного одобренного фото"}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {photos.map((p) => (
                    <div key={p.id} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--sand)" }}>
                      <a href={p.url} target="_blank" rel="noreferrer">
                        <img src={p.url} alt="" className="w-full h-64 object-cover" style={{ background: "#f7f1ea" }} />
                      </a>
                      <div className="p-3 space-y-2">
                        <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          {formatDate(p.created_at)}
                        </div>
                        {p.comment && (
                          <p className="text-sm" style={{ color: "var(--warm-dark)" }}>
                            {p.comment}
                          </p>
                        )}
                        <div className="flex gap-2 pt-1">
                          {tab === "pending" && (
                            <button
                              onClick={() => act(p.id, "approve")}
                              disabled={busyId === p.id}
                              className="flex-1 rounded-lg py-2 font-semibold text-white flex items-center justify-center gap-1.5 disabled:opacity-60"
                              style={{ backgroundColor: "#2E8B57" }}
                            >
                              <Icon name="Check" size={16} />
                              Одобрить
                            </button>
                          )}
                          <button
                            onClick={() => act(p.id, "reject")}
                            disabled={busyId === p.id}
                            className="flex-1 rounded-lg py-2 font-semibold flex items-center justify-center gap-1.5 border disabled:opacity-60"
                            style={{ borderColor: "#C0392B", color: "#C0392B" }}
                          >
                            <Icon name="Trash2" size={16} />
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
