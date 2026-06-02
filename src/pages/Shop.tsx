import { useState } from "react";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/SiteFooter";

const PLANETA_URL = "https://planeta.ru/campaigns/244619";

const PRODUCTS = [
  {
    id: "mini-figure",
    name: "Мини-фигурка «Енотыч-хранитель набережной и добрых мгновений»",
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
    description: "Хранительница уюта. Та самая, из парка.\n\nПеред вами точная бронзовая копия Енофьи — бабушки с корзинкой, которая скоро займёт своё место в городе. Мудрая, добрая, с лёгкой улыбкой. Та, к кому хочется подойти и погладить корзинку.\n\nПочему эта цена?\n• Материал: настоящая бронза (не имитация)\n• Технология: литьё по выплавляемой модели, патинирование, финишная обработка вручную\n• Размер: 20 см — увесистая, основательная\n• Ручная работа: каждая фигурка создаётся мастером индивидуально\n• Легенда: не просто статуэтка, а персонаж с характером и душой\n\nКому и зачем?\n• Коллекционерам — редкий экземпляр ограниченной серии\n• Поклонникам проекта — хранительница домашнего уюта\n• Для дома, кабинета, гостиной — статуэтка, которая согревает взгляд\n• Как премиальный подарок — женщинам, мамам, бабушкам, тем, кто ценит тепло\n\nХотите другого размера?\nМы можем изготовить Енофью высотой от 10 до 30 см и более.\n💬 Стоимость и сроки — по запросу. Напишите нам, обсудим детали.\n\nВ комплекте\n• Бронзовая фигурка\n• Сертификат подлинности\n• Подарок от автора проекта",
    badge: "Эксклюзив",
    badgeColor: "#B8732F",
  },
];

export default function Shop() {
  const [added, setAdded] = useState<string | null>(null);
  const [qtys, setQtys] = useState<Record<string, number>>({});

  const getQty = (id: string) => qtys[id] || 1;
  const changeQty = (id: string, delta: number) => {
    setQtys((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  };

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    setAdded(product.id);
    const qty = getQty(product.id);
    setTimeout(() => {
      window.location.href = `/cart?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&qty=${qty}`;
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1100px 600px at 12% -8%, rgba(122,177,191,0.30), transparent 58%), radial-gradient(1000px 600px at 95% 8%, rgba(184,115,51,0.28), transparent 55%), radial-gradient(900px 700px at 50% 115%, rgba(122,177,191,0.18), transparent 60%), linear-gradient(180deg, #261913, #1a110c 55%, #120b07)",
      }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(184,115,51,0.45), transparent 70%)" }} />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full opacity-45 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(122,177,191,0.40), transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(212,160,90,0.40), transparent 70%)" }} />
      </div>
      <header className="fixed top-0 left-0 right-0 z-40"
        style={{ background: "rgba(26,17,12,0.75)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(212,160,90,0.25)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦝</span>
            <span className="font-display text-xl font-bold" style={{ color: "#E6B873" }}>
              Туапсеноты
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/" className="font-body text-sm hidden sm:block" style={{ color: "rgba(245,230,211,0.85)" }}>
              ← На главную
            </a>
            <a href="/cart" className="btn-primary text-sm px-4 py-2">
              <Icon name="ShoppingCart" size={18} />
              Корзина
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: "#E6B873" }}>
            Магазин
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4"
            style={{ color: "#FBF3E8" }}>
            Возьми частичку Туапсе домой
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: "rgba(245,230,211,0.75)" }}>
            Каждый заказ — это вклад в проект и живая память о Туапсенотах
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden card-hover"
              style={{
                background: "rgba(54,37,26,0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(212,160,90,0.30)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
              }}>
              <div className="relative">
                <img src={p.image} alt={p.name}
                  className="w-full object-contain"
                  style={{ maxHeight: "180px", backgroundColor: "rgba(245,240,235,0.92)" }} />
                <span className="absolute top-2 left-2 font-body text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: p.badgeColor, color: "white" }}>
                  {p.badge}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-display text-base font-bold mb-1" style={{ color: "#FBF3E8" }}>
                  {p.name}
                </h2>
                <div className="font-body text-xs mb-3" style={{ color: "rgba(240,224,205,0.78)", lineHeight: 1.5 }}>
                  {p.description.split("\n\n").map((block, i) => (
                    <p key={i} className="mb-1 whitespace-pre-line">{block}</p>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-display text-lg font-bold" style={{ color: "#E6B873" }}>
                    {p.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <div className="flex items-center gap-1 rounded-full px-1 py-1"
                    style={{ border: "1.5px solid rgba(212,160,90,0.4)", backgroundColor: "rgba(255,255,255,0.08)" }}>
                    <button
                      type="button"
                      onClick={() => changeQty(p.id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full"
                      style={{ color: "#E6B873" }}
                      aria-label="Уменьшить">
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="font-body font-bold text-sm w-6 text-center" style={{ color: "#FBF3E8" }}>
                      {getQty(p.id)}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQty(p.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full"
                      style={{ color: "#E6B873" }}
                      aria-label="Увеличить">
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(p)}
                  className="btn-primary text-xs px-3 py-2 w-full justify-center"
                  style={added === p.id ? { backgroundColor: "#4CAF50" } : {}}>
                  {added === p.id ? (
                    <><Icon name="Check" size={14} /> Добавлено</>
                  ) : (
                    <><Icon name="ShoppingCart" size={14} /> В корзину</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #2c5d6b, #1c3d47)", border: "1px solid rgba(212,160,90,0.25)", boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: "var(--cream)" }}>
            Поддержать проект
          </h3>
          <p className="font-body mb-6" style={{ color: "rgba(245,230,211,0.8)" }}>
            Стань частью истории на Planeta.ru
          </p>
          <a href={PLANETA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex text-base px-8 py-4">
            <Icon name="Heart" size={18} />
            Поддержать на Planeta.ru
          </a>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}