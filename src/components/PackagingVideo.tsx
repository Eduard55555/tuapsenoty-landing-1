import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const VIDEO_URL =
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/bucket/videos/packaging-light.mp4?v=5";

export default function PackagingVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let usedBlob = false;
    let blobUrl: string | null = null;
    let timer: number | undefined;

    const loadAsBlob = () => {
      if (usedBlob || v.readyState >= 3) return;
      usedBlob = true;
      fetch(`${VIDEO_URL}&b=1`, { cache: "no-store", mode: "cors" })
        .then((r) => r.blob())
        .then((b) => {
          blobUrl = URL.createObjectURL(b);
          v.src = blobUrl;
          v.load();
          v.play().catch(() => {});
        })
        .catch(() => {});
    };

    const onWaiting = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(loadAsBlob, 4000);
    };
    const onPlaying = () => window.clearTimeout(timer);

    timer = window.setTimeout(loadAsBlob, 5000);
    const retry = loadAsBlob;

    v.addEventListener("waiting", onWaiting);
    v.addEventListener("stalled", onWaiting);
    v.addEventListener("error", retry);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("canplay", onPlaying);
    return () => {
      window.clearTimeout(timer);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("stalled", onWaiting);
      v.removeEventListener("error", retry);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("canplay", onPlaying);
    };
  }, []);

  return (
    <div
      className="rounded-3xl overflow-hidden grid sm:grid-cols-2 items-center gap-6 sm:gap-10 p-5 sm:p-8"
      style={{
        background: "rgba(255,252,247,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 12px 40px rgba(184,115,51,0.18)",
      }}
    >
      <div className="order-2 sm:order-1 text-center sm:text-left">
        <span
          className="inline-flex items-center justify-center rounded-2xl mb-4"
          style={{ width: 52, height: 52, backgroundColor: "rgba(184,115,51,0.12)" }}
        >
          <Icon name="Gift" size={26} style={{ color: "var(--bronze)" }} />
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--warm-dark)" }}>
          Каждая фигурка бережно упаковывается
        </h2>
        <p className="font-body text-base mb-4" style={{ color: "#6B4C35", lineHeight: 1.7 }}>
          Мы вручную укладываем каждого енота в крафтовую коробочку с мягким наполнителем и перевязываем её
          бечёвкой. Фигурка приедет целой — и её сразу можно дарить.
        </p>
        <ul className="font-body text-sm space-y-2 inline-block text-left" style={{ color: "#3d2b1f" }}>
          {["Ручная упаковка", "Мягкий наполнитель — защита в дороге", "Готово к подарку"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Icon name="Check" size={16} style={{ color: "var(--bronze)" }} />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="order-1 sm:order-2 flex justify-center">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          poster="/opt/packaging-poster.webp"
          controls
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          className="w-full max-w-[300px] rounded-2xl"
          style={{ aspectRatio: "9 / 16", objectFit: "cover", boxShadow: "0 12px 30px rgba(61,43,31,0.25)" }}
        />
      </div>
    </div>
  );
}