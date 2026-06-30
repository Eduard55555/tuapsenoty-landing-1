import SiteFooter from "@/components/SiteFooter";
import IndexHeader from "./index/IndexHeader";
import IndexHero from "./index/IndexHero";
import IndexNews from "./index/IndexNews";
import IndexShop from "./index/IndexShop";
import IndexCharacters from "./index/IndexCharacters";
import { useCountFoundOnce } from "@/hooks/useFinderCount";
import useSeo from "@/hooks/useSeo";

export default function Index() {
  useCountFoundOnce();
  useSeo({
    title: "Туапсеноты — семья бронзовых енотов-хранителей Туапсе",
    description:
      "Восемь бронзовых енотов-хранителей с историями, ритуалами и душой на набережной Туапсе. Познакомьтесь с семьёй, найдите их на карте и поддержите проект.",
    path: "/",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>

      {/* HEADER */}
      <IndexHeader />

      {/* HERO + ABOUT */}
      <IndexHero />

      {/* SHOP / SOUVENIRS */}
      <IndexShop />

      {/* NEWS */}
      <IndexNews />

      {/* CHARACTERS + SUBSCRIBE + HOW TO HELP */}
      <IndexCharacters />

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}