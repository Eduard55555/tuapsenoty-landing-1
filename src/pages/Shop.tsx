import { useState } from "react";
import Icon from "@/components/ui/icon";

const PLANETA_URL = "https://planeta.ru/campaigns/244619";

const PRODUCTS = [
  {
    id: "mini-figure",
    name: "Мини-фигурка «Енотыч — хранитель уюта»",
    price: 479,
    emoji: "🗿",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/1dfa0dd2-540a-4897-a4ba-8a240e6f23e2.jpg",
    description: "Маленький друг для больших дел\n\nЭто не просто фигурка. Это тот самый Енотыч, который теперь живёт на набережной, но в миниатюре. Можно поставить на рабочий стол — и работа пойдёт веселее. Можно в машину — чтобы рядом был свой бронзовый хранитель дорог. Можно на полку — просто потому, что мило.\n\n• Размер: 5 см — помещается на ладони\n• Материал: полимерная смола, ручная роспись «под бронзу»\n• Вес: приятный, увесистый\n• Детали: фуражка, удочка, полосатый хвост — всё как у большого\n\nЧтобы улыбаться, напоминать о море и загадывать желания — ритуал с удочкой работает и в миниатюре.\n\nКаждая фигурка расписывается вручную и может иметь крошечные уникальные отличия.",
    badge: "Хит",
    badgeColor: "#4CAF50",
  },
  {
    id: "bronze-original",
    name: "Коллекционная бронзовая статуэтка — Енотыч",
    price: 100000,
    emoji: "🏆",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/5c66f1c9-0b53-4bf7-9724-81ede89caadf.jpg",
    description: "Тот самый. С набережной.\n\nПеред вами не сувенир. Это точная бронзовая копия Енотыча, который теперь живёт на набережной Туапсе и встречает гостей города. Такая же поза, та же удочка, та же лёгкая улыбка.\n\nПочему эта цена?\n• Материал: настоящая бронза (не имитация)\n• Технология: литьё по выплавляемой модели, патинирование, финишная обработка вручную\n• Размер: 20 см — увесистая, основательная\n• Ручная работа: каждая фигурка создаётся мастером индивидуально\n• Легенда: это не просто предмет, а персонаж с душой и историей\n\nКому и зачем?\n• Коллекционерам — уникальный экземпляр ограниченной серии\n• Поклонникам проекта — иметь дома того самого хранителя\n• Для офиса, кабинета, дома — статуэтка, которая притягивает взгляд\n• Как премиальный подарок — который запомнят\n\nХотите другого размера?\nМы можем изготовить Енотыча высотой от 10 до 30 см и более.\n💬 Стоимость и сроки — по запросу. Напишите нам, обсудим детали.\n\nВ комплекте\n• Бронзовая фигурка\n• Сертификат подлинности\n• Подарок от автора проекта — мини-фигурки всей семьи Туапсенотов",
    badge: "Эксклюзив",
    badgeColor: "#B8732F",
  },
  {
    id: "bronze-enofya",
    name: "Коллекционная бронзовая статуэтка — Енофья",
    price: 100000,
    emoji: "🧺",
    image: "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/942e525e-ab66-4f68-a8c6-8380b1f3e60e.jpg",
    description: "Хранительница уюта. Та самая, из парка.\n\nПеред вами точная бронзовая копия Енофьи — бабушки с корзинкой, которая скоро займёт своё место в городском парке. Мудрая, добрая, с лёгкой улыбкой. Та, к кому хочется подойти и погладить корзинку.\n\nПочему эта цена?\n• Материал: настоящая бронза (не имитация)\n• Технология: литьё по выплавляемой модели, патинирование, финишная обработка вручную\n• Размер: 20 см — увесистая, основательная\n• Ручная работа: каждая фигурка создаётся мастером индивидуально\n• Легенда: не просто статуэтка, а персонаж с характером и душой\n\nКому и зачем?\n• Коллекционерам — редкий экземпляр ограниченной серии\n• Поклонникам проекта — хранительница домашнего уюта\n• Для дома, кабинета, гостиной — статуэтка, которая согревает взгляд\n• Как премиальный подарок — женщинам, мамам, бабушкам, тем, кто ценит тепло\n\nХотите другого размера?\nМы можем изготовить Енофью высотой от 10 до 30 см и более.\n💬 Стоимость и сроки — по запросу. Напишите нам, обсудим детали.\n\nВ комплекте\n• Бронзовая фигурка\n• Сертификат подлинности\n• Подарок от автора проекта",
    badge: "Эксклюзив",
    badgeColor: "#B8732F",
  },
];

export default function Shop() {
  const [added, setAdded] = useState<string | null>(null);

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    setAdded(product.id);
    setTimeout(() => {
      window.location.href = `/cart?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}`;
    }, 500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <header className="fixed top-0 left-0 right-0 z-40"
        style={{ background: "rgba(253,246,238,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(184,115,51,0.15)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦝</span>
            <span className="font-display text-xl font-bold" style={{ color: "var(--bronze)" }}>
              Туапсеноты
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/" className="font-body text-sm hidden sm:block" style={{ color: "var(--warm-dark)" }}>
              ← На главную
            </a>
            <a href="/cart" className="btn-primary text-sm px-4 py-2">
              <Icon name="ShoppingCart" size={18} />
              Корзина
            </a>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--bronze)" }}>
            Магазин
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4"
            style={{ color: "var(--warm-dark)" }}>
            Возьми частичку Туапсе домой
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "#6B4C35" }}>
            Каждый заказ — это вклад в проект и живая память о Туапсенотах
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden card-hover"
              style={{ backgroundColor: "var(--sand)", border: "1px solid rgba(184,115,51,0.15)" }}>
              <div className="relative">
                <img src={p.image} alt={p.name}
                  className="w-full object-contain"
                  style={{ maxHeight: "180px", backgroundColor: "#f5f0eb" }} />
                <span className="absolute top-2 left-2 font-body text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: p.badgeColor, color: "white" }}>
                  {p.badge}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-display text-base font-bold mb-1" style={{ color: "var(--warm-dark)" }}>
                  {p.name}
                </h2>
                <div className="font-body text-xs mb-3" style={{ color: "#6B4C35", lineHeight: 1.5 }}>
                  {p.description.split("\n\n").map((block, i) => (
                    <p key={i} className="mb-1 whitespace-pre-line">{block}</p>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-lg font-bold" style={{ color: "var(--bronze)" }}>
                    {p.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <button
                    onClick={() => handleAdd(p)}
                    className="btn-primary text-xs px-3 py-2"
                    style={added === p.id ? { backgroundColor: "#4CAF50" } : {}}>
                    {added === p.id ? (
                      <><Icon name="Check" size={14} /> Добавлено</>
                    ) : (
                      <><Icon name="ShoppingCart" size={14} /> В корзину</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, var(--sea), #3d7a90)" }}>
          <p className="font-body text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--teal-light)" }}>
            Краудфандинг
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: "var(--cream)" }}>
            Хочешь поддержать весь проект?
          </h3>
          <p className="font-body mb-6" style={{ color: "rgba(245,230,211,0.8)" }}>
            Стань частью истории на Planeta.ru — поддержи краудфандинг
          </p>
          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex text-base px-8 py-4">
            <Icon name="Heart" size={18} />
            Поддержать на Planeta.ru
          </a>
        </div>
      </div>
    </div>
  );
}