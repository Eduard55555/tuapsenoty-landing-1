import SiteFooter from "@/components/SiteFooter";
import IndexHeader from "./index/IndexHeader";
import IndexHero from "./index/IndexHero";
import IndexNews from "./index/IndexNews";
import IndexCharacters from "./index/IndexCharacters";
import IndexMapTeaser from "./index/IndexMapTeaser";

export default function Index() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>

      {/* HEADER */}
      <IndexHeader />

      {/* HERO + ABOUT */}
      <IndexHero />

      {/* NEWS */}
      <IndexNews />

      {/* CHARACTERS + SUBSCRIBE + HOW TO HELP */}
      <IndexCharacters />

      {/* MAP TEASER */}
      <IndexMapTeaser />

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}