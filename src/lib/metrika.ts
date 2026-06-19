const METRIKA_ID = 109954003;
let loaded = false;

export function loadMetrika() {
  if (loaded) return;
  if (typeof window === "undefined") return;
  loaded = true;

  const w = window as unknown as {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };
  };
  w.ym =
    w.ym ||
    function (...args: unknown[]) {
      (w.ym!.a = w.ym!.a || []).push(args);
    };
  w.ym.l = Date.now();

  const src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;
  const k = document.createElement("script");
  const a = document.getElementsByTagName("script")[0];
  k.async = true;
  k.src = src;
  a.parentNode!.insertBefore(k, a);

  w.ym(METRIKA_ID, "init", {
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

export function hitMetrika(url: string) {
  if (!loaded) return;
  const w = window as unknown as { ym?: (...args: unknown[]) => void };
  if (typeof w.ym === "function") {
    w.ym(METRIKA_ID, "hit", url);
  }
}