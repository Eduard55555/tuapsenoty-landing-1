import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../../backend/func2url.json";

const ORDERS_URL = (func2url as Record<string, string>)["orders-list"];

type OrderItem = { name?: string; price?: number; qty?: number };
type Order = {
  id: number;
  name: string;
  phone: string;
  email: string;
  delivery: string;
  address: string;
  items: OrderItem[];
  total: number;
  created_at: string | null;
};

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "";

export default function OrdersPanel({ adminKey }: { adminKey: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(ORDERS_URL, { headers: { "X-Admin-Key": adminKey } });
      const data = await res.json();
      setOrders(data.orders ?? []);
      setSum(data.sum ?? 0);
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2" style={{ backgroundColor: "var(--cream)", color: "var(--sea)" }}>
          <Icon name="ShoppingBag" size={18} />
          Всего заказов: {orders.length}
        </div>
        <div className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2" style={{ backgroundColor: "var(--cream)", color: "var(--bronze)" }}>
          <Icon name="Wallet" size={18} />
          На сумму: {sum.toLocaleString("ru-RU")} ₽
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2 border disabled:opacity-60"
          style={{ borderColor: "var(--sand)", color: "var(--warm-text)" }}
        >
          <Icon name={loading ? "Loader2" : "RefreshCw"} size={18} className={loading ? "animate-spin" : ""} />
          Обновить
        </button>
      </div>

      {error && <p style={{ color: "#C0392B" }}>{error}</p>}

      {!loading && orders.length === 0 && (
        <p className="text-center py-8" style={{ color: "var(--muted-foreground)" }}>
          Пока заказов нет.
        </p>
      )}

      <div className="space-y-3">
        {orders.map((o) => {
          const open = openId === o.id;
          return (
            <div key={o.id} className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--sand)" }}>
              <button
                onClick={() => setOpenId(open ? null : o.id)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <div className="min-w-0">
                  <div className="font-bold truncate" style={{ color: "var(--warm-dark)" }}>
                    №{o.id} · {o.name}
                  </div>
                  <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                    {formatDate(o.created_at)}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold" style={{ color: "var(--bronze)" }}>
                    {o.total.toLocaleString("ru-RU")} ₽
                  </span>
                  <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} />
                </div>
              </button>

              {open && (
                <div className="px-4 pb-4 pt-1 space-y-2 text-sm" style={{ color: "var(--warm-text)" }}>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} />
                    <a href={`tel:${o.phone}`} className="font-semibold" style={{ color: "var(--sea)" }}>
                      {o.phone}
                    </a>
                  </div>
                  {o.email && (
                    <div className="flex items-center gap-2 break-all">
                      <Icon name="Mail" size={16} />
                      {o.email}
                    </div>
                  )}
                  {o.delivery && (
                    <div className="flex items-center gap-2">
                      <Icon name="Truck" size={16} />
                      {o.delivery}
                    </div>
                  )}
                  {o.address && (
                    <div className="flex items-start gap-2">
                      <Icon name="MapPin" size={16} />
                      {o.address}
                    </div>
                  )}
                  <div className="rounded-lg p-3 space-y-1" style={{ backgroundColor: "var(--cream)" }}>
                    {o.items.map((it, i) => (
                      <div key={i} className="flex justify-between gap-3">
                        <span>
                          {it.name} × {it.qty ?? 1}
                        </span>
                        <span className="whitespace-nowrap font-semibold">
                          {((it.price ?? 0) * (it.qty ?? 1)).toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
