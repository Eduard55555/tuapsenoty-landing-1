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
          <h1 className="font-display text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--warm-dark)" }}>
            Политика обработки персональных данных
          </h1>
        </div>

        <div className="font-body space-y-8" style={{ color: "#4A3527", lineHeight: 1.7 }}>
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              1. Общие положения
            </h2>
            <p>1.1. Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей сайта «Туапсеноты» (далее — Сайт), расположенного по адресу: tuapsenoty.ru.</p>
            <p>1.2. Оператор персональных данных: Сарбаев Эдуард Нажиевич, физическое лицо (далее — Оператор).</p>
            <p>1.3. Используя Сайт, заполняя формы, оформляя заказы, пользователь даёт согласие на обработку своих персональных данных в соответствии с настоящей Политикой.</p>
            <p>1.4. Политика размещена по адресу: https://tuapsenoty.ru/privacy. Ссылка на Политику находится в нижней части (футере) каждой страницы Сайта.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
              2. Какие персональные данные собираются
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "var(--sand)" }}>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Категория</th>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Перечень данных</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Контактные</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>имя, фамилия, телефон, адрес электронной почты</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Адресные</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>почтовый адрес (для доставки)</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Технические</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>IP-адрес, тип и версия браузера, сведения об устройстве, источник перехода на Сайт</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
              3. Цели обработки персональных данных
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "var(--sand)" }}>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Цель</th>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Данные</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Приём и выполнение заказов</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>имя, телефон, адрес доставки</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Доставка заказов (передача службам доставки)</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>имя, телефон, адрес</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Информирование о статусе заказа</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>телефон, e-mail</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Направление рекламных и информационных рассылок (только с отдельного согласия)</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>e-mail</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Улучшение работы Сайта, анализ статистики (обезличенно)</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>технические данные</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              4. Правовые основания обработки
            </h2>
            <p>4.1. Обработка персональных данных осуществляется на основании:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»;</li>
              <li>согласия пользователя, полученного путём отметки чекбокса при заполнении формы.</li>
            </ul>
            <p>4.2. Согласие считается полученным активным действием пользователя (галочка).</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              5. Сроки хранения и место хранения
            </h2>
            <p>5.1. Персональные данные хранятся на серверах, расположенных на территории Российской Федерации.</p>
            <p>5.2. Сроки хранения:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "var(--sand)" }}>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Тип данных</th>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Срок хранения</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Данные заказов</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>3 года с момента последнего заказа</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Данные подписчиков рассылки</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>до момента отзыва согласия</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Технические данные (логи)</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>1 год</td></tr>
                </tbody>
              </table>
            </div>
            <p>5.3. По истечении срока хранения данные удаляются без возможности восстановления.</p>
            <p>5.4. Способ уничтожения: удаление из информационной системы с составлением акта об уничтожении.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              6. Условия передачи персональных данных третьим лицам
            </h2>
            <p>6.1. Оператор не передаёт персональные данные третьим лицам, за исключением:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "var(--sand)" }}>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Получатель</th>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Передаваемые данные</th>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Цель</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>СДЭК</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>имя, телефон, адрес</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>доставка заказа</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Почта России</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>имя, телефон, адрес</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>доставка заказа</td></tr>
                </tbody>
              </table>
            </div>
            <p>6.2. В остальных случаях передача возможна только:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>с письменного согласия пользователя;</li>
              <li>по законному требованию суда или государственных органов.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              7. Файлы cookie (куки) и технические данные
            </h2>
            <p>7.1. Сайт использует файлы cookie для сбора технической информации (IP-адрес, тип браузера, сведения об устройстве).</p>
            <p>7.2. При первом посещении Сайта пользователю показывается cookie-баннер с информацией об использовании файлов cookie и возможностью отказаться от их сбора.</p>
            <p>7.3. Пользователь может в любой момент отключить cookie в настройках своего браузера.</p>
            <p>7.4. Сбор статистики (через счётчики типа Яндекс.Метрика) осуществляется только после получения согласия пользователя через cookie-баннер.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              8. Порядок получения согласия (чекбоксы)
            </h2>
            <p>8.1. Согласие на обработку персональных данных для оформления заказа даётся через отдельный чекбокс:</p>
            <p className="pl-5 italic">☐ «Я принимаю условия [Политики обработки персональных данных] и даю согласие на обработку моих персональных данных для оформления заказа»</p>
            <p>8.2. Согласие на получение рекламных и информационных рассылок даётся через отдельный чекбокс:</p>
            <p className="pl-5 italic">☐ «Я согласен получать информацию о новостях, акциях и новых сувенирах»</p>
            <p>8.3. Отсутствие галочки делает невозможной отправку формы.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
              9. Права пользователя
            </h2>
            <p className="mb-2">Пользователь имеет право:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "var(--sand)" }}>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Право</th>
                    <th className="text-left p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Запросить информацию об обработке своих данных</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>направить запрос на sen555551@mail.ru</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Потребовать уточнения, блокирования или удаления данных</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>направить запрос</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Отозвать согласие на обработку</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>направить уведомление</td></tr>
                  <tr><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>Обжаловать действия Оператора в Роскомнадзоре</td><td className="p-2 border" style={{ borderColor: "rgba(184,115,51,0.2)" }}>обратиться в уполномоченный орган</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2">Срок рассмотрения запроса — 10 рабочих дней.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              10. Меры по защите персональных данных
            </h2>
            <p>Оператор принимает следующие меры:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>ограничение доступа к персональным данным уполномоченных сотрудников;</li>
              <li>использование антивирусного программного обеспечения;</li>
              <li>регулярное резервное копирование данных;</li>
              <li>обеспечение физической безопасности сервера (хостинг-провайдер).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              11. Заключительные положения
            </h2>
            <p>11.1. Оператор вправе вносить изменения в Политику. Новая редакция вступает в силу с момента её размещения на Сайте.</p>
            <p>11.2. Действующая редакция всегда доступна по адресу: https://tuapsenoty.ru/privacy.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              12. Контакты
            </h2>
            <p>Сарбаев Эдуард Нажиевич</p>
            <p className="flex items-center gap-2"><Icon name="Mail" size={16} /> sen555551@mail.ru</p>
            <p className="flex items-center gap-2"><Icon name="Phone" size={16} /> 8-918-505-16-17</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold mb-2" style={{ color: "var(--warm-dark)" }}>
              13. Настройки файлов cookie
            </h2>
            <p className="mb-3">Вы можете в любой момент изменить своё решение по использованию файлов cookie.</p>
            <button
              onClick={() => window.dispatchEvent(new Event("cookie-settings-open"))}
              className="btn-primary inline-flex px-6 py-3">
              <Icon name="Cookie" size={18} /> Изменить настройки cookie
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}