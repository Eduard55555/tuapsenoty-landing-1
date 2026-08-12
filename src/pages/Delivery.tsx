import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PhoneLink from "@/components/PhoneLink";
import DeliveryInfo from "@/components/DeliveryInfo";
import useSeo from "@/hooks/useSeo";

export default function Delivery() {
  useSeo({
    title: "Доставка и оплата — магазин Туапсенотов",
    description:
      "Как мы отправляем фигурки Туапсенотов: способ отправки обсуждается индивидуально, отправка в течение 2 дней, оплата картой, СБП или переводом по номеру телефона.",
    path: "/delivery",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader showCart />

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--bronze)" }}>
            Покупателям
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
            Доставка и оплата
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "#6B4C35" }}>
            Всё просто и по-человечески: оформляете заказ, мы звоним и договариваемся об удобном способе
          </p>
        </div>

        <DeliveryInfo />

        <div
          className="rounded-3xl p-6 sm:p-8 mt-8"
          style={{ backgroundColor: "var(--sand)", border: "1px solid rgba(184,115,51,0.18)" }}
        >
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
            Как проходит заказ
          </h2>
          <ol className="space-y-3">
            {[
              "Вы оформляете заявку в корзине или звоните нам",
              "Мы перезваниваем, уточняем адрес и подбираем способ отправки",
              "Вы оплачиваете удобным способом: карта, СБП или перевод по номеру телефона",
              "В течение 2 дней отправляем посылку и присылаем трек-номер",
            ].map((t, i) => (
              <li key={t} className="flex items-start gap-3 font-body" style={{ color: "#3d2b1f", lineHeight: 1.6 }}>
                <span
                  className="flex items-center justify-center rounded-full flex-shrink-0 font-display font-bold text-sm"
                  style={{ width: 28, height: 28, backgroundColor: "var(--bronze)", color: "white" }}
                >
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center mt-10">
          <p className="font-body mb-4" style={{ color: "#6B4C35" }}>
            Остались вопросы? Позвоните — ответим и оформим заказ за минуту.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneLink
              className="inline-flex items-center justify-center gap-2 rounded-full font-display font-bold text-base px-8 py-4"
              style={{ backgroundColor: "var(--bronze)", color: "white" }}
              iconSize={20}
            />
            <a
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full font-display font-bold text-base px-8 py-4"
              style={{ backgroundColor: "#FF7A1A", color: "white", boxShadow: "0 8px 24px rgba(255,122,26,0.35)" }}
            >
              <Icon name="ShoppingBag" size={20} />
              В магазин
            </a>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
