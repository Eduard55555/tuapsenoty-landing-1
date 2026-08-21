import SiteFooter from "@/components/SiteFooter";
import SocialLinks from "@/components/SocialLinks";
import IndexHeader from "./index/IndexHeader";
import IndexHero from "./index/IndexHero";
import IndexAbout from "./index/IndexAbout";
import IndexNews from "./index/IndexNews";
import IndexShop from "./index/IndexShop";
import IndexCharacters from "./index/IndexCharacters";
import ReviewsSection from "@/components/ReviewsSection";
import { useCountFoundOnce } from "@/hooks/useFinderCount";
import useSeo from "@/hooks/useSeo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Index() {
  useCountFoundOnce();

  const location = useLocation();
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    let tries = 0;
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (tries < 20) {
        tries += 1;
        setTimeout(scroll, 100);
      }
    };
    scroll();
  }, [location.hash]);
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

      {/* HERO */}
      <IndexHero />

      {/* SHOP / SOUVENIRS */}
      <IndexShop />

      {/* REVIEWS */}
      <ReviewsSection background="linear-gradient(180deg, var(--sand) 0%, var(--cream) 100%)" />

      {/* ABOUT */}
      <IndexAbout />

      {/* NEWS */}
      <IndexNews />

      {/* CHARACTERS + SUBSCRIBE + HOW TO HELP */}
      <IndexCharacters />

      {/* SOCIAL */}
      <SocialLinks />

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}