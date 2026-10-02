import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../../backend/func2url.json";

const URL = (func2url as Record<string, string>)["gallery-photos"];

type Photo = { id: number; url: string; comment: string; created_at: string | null };
type Tab = "pending" | "approved";

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "";

export default function PhotosPanel({ adminKey }: { adminKey: string }) {
  const [tab, setTab] = useState<Tab>("pending");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async (status: Tab) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${URL}?status=${status}`, { headers: { "X-Admin-Key": adminKey } });
      const data = await res.json();
      setPhotos(data.photos ?? []);
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    }
    setLoading(false);
  };

  useEffect(() => {
    load(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

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

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["pending", "approved"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
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
        <button
          onClick={() => load(tab)}
          disabled={loading}
          className="rounded-xl px-4 py-2.5 font-semibold flex items-center gap-2 border disabled:opacity-60"
          style={{ borderColor: "var(--sand)", color: "var(--warm-text)" }}
        >
          <Icon name="RefreshCw" size={16} />
          Обновить
        </button>
      </div>

      {error && <p style={{ color: "#C0392B" }}>{error}</p>}

      {loading ? (
        <div className="flex justify-center py-10">
          <Icon name="Loader2" className="animate-spin" size={28} />
        </div>
      ) : photos.length === 0 ? (
        <p className="text-center py-10" style={{ color: "var(--muted-foreground)" }}>
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
  );
}
