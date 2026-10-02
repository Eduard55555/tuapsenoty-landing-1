import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import useSeo from "@/hooks/useSeo";

export default function Contests() {
  useSeo({
    title: "Конкурсы Туапсенотов — призы и розыгрыши",
    description: "Конкурсы и розыгрыши от Туапсенотов: ищите бронзовых енотов в Туапсе, делитесь фото и выигрывайте призы.",
    path: "/contests",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4" style={{ color: "var(--warm-dark)" }}>
            Конкурсы
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto mb-10" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
            Скоро здесь появятся конкурсы и розыгрыши с призами от Туапсенотов. Следите за новостями!
          </p>

          <div
            className="rounded-3xl p-6 sm:p-8 text-left"
            style={{ backgroundColor: "#fff", border: "1px solid rgba(184,115,51,0.18)" }}
          >
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
              Как не пропустить старт
            </h2>
            <p className="font-body mb-6" style={{ color: "#5A3E2B", lineHeight: 1.7 }}>
              Пока готовим конкурсы, можно уже сейчас найти енотов в городе и прислать фото в галерею.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-body font-semibold text-white"
                style={{ background: "var(--bronze)" }}
              >
                <Icon name="Camera" size={18} />
                Прислать фото
              </Link>
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-body font-semibold border"
                style={{ borderColor: "var(--bronze)", color: "var(--bronze)" }}
              >
                <Icon name="MapPin" size={18} />
                Карта енотов
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
