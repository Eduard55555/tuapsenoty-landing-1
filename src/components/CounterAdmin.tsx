import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { CHARACTER_API } from "@/hooks/useFinderCount";

const ITEMS: { slug: string; title: string }[] = [
  { slug: "enofya", title: "Енофья с малышом" },
  { slug: "enira", title: "Енира с Тыдочкой" },
];

type Row = { count: number | null; loading: boolean };

export default function CounterAdmin({ adminKey }: { adminKey: string }) {
  const [rows, setRows] = useState<Record<string, Row>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    ITEMS.forEach((it) => {
      fetch(`${CHARACTER_API}?slug=${it.slug}`, { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => setRows((p) => ({ ...p, [it.slug]: { count: d.count ?? 0, loading: false } })))
        .catch(() => setRows((p) => ({ ...p, [it.slug]: { count: null, loading: false } })));
    });
  }, []);

  const apply = async (slug: string, payload: Record<string, number>) => {
    setError("");
    setRows((p) => ({ ...p, [slug]: { count: p[slug]?.count ?? 0, loading: true } }));
    try {
      const res = await fetch(CHARACTER_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
        body: JSON.stringify({ slug, ...payload }),
      });
      const data = await res.json();
      if (typeof data.count !== "number") {
        setError("Не удалось изменить счётчик");
        setRows((p) => ({ ...p, [slug]: { count: p[slug]?.count ?? 0, loading: false } }));
        return;
      }
      setRows((p) => ({ ...p, [slug]: { count: data.count, loading: false } }));
      setInputs((p) => ({ ...p, [slug]: "" }));
    } catch {
      setError("Ошибка соединения");
      setRows((p) => ({ ...p, [slug]: { count: p[slug]?.count ?? 0, loading: false } }));
    }
  };

  return (
    <div className="rounded-xl border p-4 space-y-4" style={{ borderColor: "var(--sand)" }}>
      <h2 className="font-extrabold flex items-center gap-2" style={{ color: "var(--sea)" }}>
        <Icon name="Gauge" size={18} />
        Счётчики «нашли енота»
      </h2>

      {ITEMS.map((it) => {
        const row = rows[it.slug];
        const val = inputs[it.slug] ?? "";
        const num = parseInt(val, 10);
        const valid = !isNaN(num) && num !== 0;
        return (
          <div key={it.slug} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-sm" style={{ color: "var(--warm-dark)" }}>
                {it.title}
              </span>
              <span className="font-extrabold tabular-nums" style={{ color: "var(--bronze)" }}>
                {row?.loading ? "…" : row?.count ?? "—"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => apply(it.slug, { delta: 1 })}
                disabled={row?.loading}
                className="rounded-lg px-3 py-1.5 text-sm font-bold text-white disabled:opacity-60"
                style={{ backgroundColor: "var(--sea)" }}
              >
                +1
              </button>
              <button
                onClick={() => apply(it.slug, { delta: -1 })}
                disabled={row?.loading}
                className="rounded-lg px-3 py-1.5 text-sm font-bold text-white disabled:opacity-60"
                style={{ backgroundColor: "var(--bronze)" }}
              >
                −1
              </button>
              <input
                type="number"
                value={val}
                onChange={(e) => setInputs((p) => ({ ...p, [it.slug]: e.target.value }))}
                placeholder="напр. 77"
                className="w-28 rounded-lg px-3 py-1.5 text-sm outline-none border"
                style={{ borderColor: "var(--sand)", color: "var(--warm-dark)" }}
              />
              <button
                onClick={() => apply(it.slug, { delta: num })}
                disabled={!valid || row?.loading}
                className="rounded-lg px-3 py-1.5 text-sm font-bold text-white disabled:opacity-60"
                style={{ backgroundColor: "var(--sea)" }}
              >
                Прибавить
              </button>
              <button
                onClick={() => apply(it.slug, { count: isNaN(num) ? 0 : num })}
                disabled={isNaN(num) || row?.loading}
                className="rounded-lg px-3 py-1.5 text-sm font-bold disabled:opacity-60"
                style={{ backgroundColor: "var(--cream)", color: "var(--sea)" }}
              >
                Задать точно
              </button>
            </div>
          </div>
        );
      })}

      {error && <p style={{ color: "#C0392B" }}>{error}</p>}
    </div>
  );
}
