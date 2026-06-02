import Icon from "@/components/ui/icon";

export default function Privacy() {
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
          <a href="/" className="font-body text-sm" style={{ color: "var(--warm-dark)" }}>
            ← На главную
          </a>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="font-body text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--bronze)" }}>
            Документы
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: "var(--warm-dark)" }}>
            Политика обработки персональных данных
          </h1>
          <p className="font-body text-sm" style={{ color: "#6B4C35" }}>
            Дата вступления в силу: 2 июня 2026 г.
          </p>
        </div>

        <div className="font-body space-y-6" style={{ color: "#4A3527", lineHeight: 1.7 }}>
          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              1. Общие положения
            </h2>
            <p>
              Настоящая Политика определяет порядок обработки и защиты персональных данных
              пользователей сайта проекта «Туапсеноты» (далее — Сайт). Используя Сайт, оставляя
              заявки и оформляя заказы, вы соглашаетесь с условиями настоящей Политики.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              2. Какие данные мы собираем
            </h2>
            <p>Мы можем обрабатывать следующие персональные данные:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>имя и фамилия;</li>
              <li>контактный телефон;</li>
              <li>адрес электронной почты;</li>
              <li>адрес доставки;</li>
              <li>иные данные, добровольно предоставленные при оформлении заказа.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              3. Цели обработки данных
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>обработка и выполнение заказов;</li>
              <li>связь с пользователем по вопросам заказа;</li>
              <li>информирование о статусе заказа и проекте;</li>
              <li>улучшение работы Сайта.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              4. Правовые основания
            </h2>
            <p>
              Обработка персональных данных осуществляется на основании согласия пользователя,
              которое он даёт при отправке данных через формы Сайта, в соответствии с Федеральным
              законом № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              5. Защита и хранение данных
            </h2>
            <p>
              Мы принимаем необходимые организационные и технические меры для защиты персональных
              данных от неправомерного доступа, изменения, раскрытия или уничтожения. Данные
              хранятся не дольше, чем этого требуют цели обработки или законодательство РФ.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              6. Передача третьим лицам
            </h2>
            <p>
              Персональные данные не передаются третьим лицам, за исключением случаев, необходимых
              для выполнения заказа (например, службам доставки), а также случаев, предусмотренных
              законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              7. Права пользователя
            </h2>
            <p>
              Вы вправе запросить информацию об обработке ваших данных, потребовать их уточнения,
              блокирования или удаления, а также отозвать согласие на обработку, направив обращение
              на контактный email.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              8. Контакты
            </h2>
            <p>
              По всем вопросам, связанным с обработкой персональных данных, обращайтесь:
            </p>
            <div className="mt-2 space-y-1">
              <p className="flex items-center gap-2">
                <Icon name="Mail" size={16} /> sen555551@mail.ru
              </p>
              <p className="flex items-center gap-2">
                <Icon name="Phone" size={16} /> 8-918-505-16-17
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
