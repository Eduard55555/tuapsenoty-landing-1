import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { CartProvider } from "./context/CartContext";
import CookieBanner from "./components/CookieBanner";
import SeaSoundToggle from "./components/SeaSoundToggle";
import MetrikaTracker from "./components/MetrikaTracker";

const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CharacterPage = lazy(() => import("./pages/CharacterPage"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Gallery = lazy(() => import("./pages/Gallery"));
const MapPage = lazy(() => import("./pages/MapPage"));
const QrEnofya = lazy(() => import("./pages/QrEnofya"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cream)" }}>
    <div className="w-10 h-10 rounded-full border-4 animate-spin"
      style={{ borderColor: "var(--bronze)", borderTopColor: "transparent" }} />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieBanner />
          <SeaSoundToggle />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;