import SiteFooter from "@/components/SiteFooter";
import SeaSoundToggle from "@/components/SeaSoundToggle";
import TuapseMap from "@/components/TuapseMap";
import IndexHeader from "./index/IndexHeader";
import IndexHero from "./index/IndexHero";
import IndexNews from "./index/IndexNews";
import IndexCharacters from "./index/IndexCharacters";

export default function Index() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>

      {/* HEADER */}
      <IndexHeader />

      {/* HERO + ABOUT */}
      <IndexHero />

      {/* MAP */}
      <TuapseMap />

      {/* NEWS */}
      <IndexNews />

      {/* CHARACTERS + SUBSCRIBE + HOW TO HELP */}
      <IndexCharacters />

      {/* FOOTER */}
      <SiteFooter />

      <SeaSoundToggle />
    </div>
  );
}