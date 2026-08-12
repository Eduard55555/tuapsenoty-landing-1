export interface DeliveryFact {
  icon: string;
  title: string;
  text: string;
}

export const DELIVERY_FACTS: DeliveryFact[] = [
  {
    icon: "Truck",
    title: "Способ отправки",
    text: "Обсуждается индивидуально — подберём удобный вариант доставки при звонке.",
  },
  {
    icon: "Clock",
    title: "Сроки отправки",
    text: "Отправляем в течение 2 дней после оформления заказа.",
  },
  {
    icon: "CreditCard",
    title: "Способы оплаты",
    text: "Карта, СБП, перевод по номеру телефона.",
  },
  {
    icon: "Wallet",
    title: "Стоимость доставки",
    text: "Обсуждается индивидуально — зависит от региона и выбранного способа.",
  },
];
