import { lazy, Suspense, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import { CartProvider } from "./context/CartContext";

const CookieBanner = lazy(() => import("./components/CookieBanner"));
const SeaSoundToggle = lazy(() => import("./components/SeaSoundToggle"));

const METRIKA_ID = 109954003;
let metrikaLoaded = false;

function loadMetrika() {
  if (metrikaLoaded || typeof window === "undefined") return;
  metrikaLoaded = true;
  const w = window as unknown as {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };
  };
  w.ym =
    w.ym ||
    function (...args: unknown[]) {
      (w.ym!.a = w.ym!.a || []).push(args);
    };
  w.ym.l = Date.now();
  const k = document.createElement("script");
  const a = document.getElementsByTagName("script")[0];
  k.async = true;
  k.src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;
  a.parentNode!.insertBefore(k, a);
  w.ym(METRIKA_ID, "init", {
    webvisor: false,
    clickmap: true,
    ecommerce: "dataLayer",
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

function hitMetrika(url: string) {
  if (!metrikaLoaded) return;
  const w = window as unknown as { ym?: (...args: unknown[]) => void };
  if (typeof w.ym !== "function") return;
  w.ym(METRIKA_ID, "hit", url);
}

function MetrikaTracker() {
  const location = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    hitMetrika(window.location.href);
  }, [location.pathname, location.search]);
  return null;
}

const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CharacterPage = lazy(() => import("./pages/CharacterPage"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Gallery = lazy(() => import("./pages/Gallery"));
const MapPage = lazy(() => import("./pages/MapPage"));
const QrEnofya = lazy(() => import("./pages/QrEnofya"));
const Newsletter = lazy(() => import("./pages/Newsletter"));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cream)" }}>
    <div className="w-10 h-10 rounded-full border-4 animate-spin"
      style={{ borderColor: "var(--bronze)", borderTopColor: "transparent" }} />
  </div>
);

const App = () => {
  useEffect(() => {
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
    };
    const start = () => {
      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(loadMetrika, { timeout: 4000 });
      } else {
        setTimeout(loadMetrika, 3000);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }, []);

  return (
    <>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <MetrikaTracker />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/characters/:slug" element={<CharacterPage />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/qr-enofya" element={<QrEnofya />} />
              <Route path="/newsletter" element={<Newsletter />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <CookieBanner />
            <SeaSoundToggle />
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </>
  );
};

export default App;