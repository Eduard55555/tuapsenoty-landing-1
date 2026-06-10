import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

interface ARHologramProps {
  image: string;
  video?: string;
  name: string;
  onClose: () => void;
}

export default function ARHologram({ image, video, name, onClose }: ARHologramProps) {
  const camRef = useRef<HTMLVideoElement>(null);
  const holoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState(1);
  const [muted, setMuted] = useState(true);
  const [hasAudio, setHasAudio] = useState(true);

  const checkAudio = () => {
    const v = holoRef.current as (HTMLVideoElement & {
      mozHasAudio?: boolean;
      webkitAudioDecodedByteCount?: number;
      audioTracks?: { length: number };
    }) | null;
    if (!v) return;
    const detected =
      v.mozHasAudio ||
      Boolean(v.webkitAudioDecodedByteCount) ||
      Boolean(v.audioTracks && v.audioTracks.length > 0);
    setHasAudio(detected);
  };

  const toggleSound = () => {
    const v = holoRef.current;
    if (!v) return;
    const nextMuted = !muted;
    if (!nextMuted) {
      v.muted = false;
      v.volume = 1;
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          v.muted = true;
          setMuted(true);
        });
      }
    } else {
      v.muted = true;
    }
    setMuted(nextMuted);
  };

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (camRef.current) {
          camRef.current.srcObject = stream;
          await camRef.current.play();
          setReady(true);
        }
      } catch (e) {
        setError(
          "Не удалось включить камеру. Разреши доступ к камере в настройках браузера и попробуй снова."
        );
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <video
        ref={camRef}
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {ready && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="ar-hologram" style={{ transform: `scale(${scale})` }}>
            {video ? (
              <video
                ref={holoRef}
                src={video}
                className="ar-hologram-img"
                autoPlay
                loop
                muted={muted}
                playsInline
                onLoadedData={checkAudio}
                onPlaying={checkAudio}
              />
            ) : (
              <img
                src={image}
                alt={name}
                className="ar-hologram-img"
                draggable={false}
              />
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm text-center">
            <div className="text-5xl mb-4">📷</div>
            <p className="font-body text-base mb-6" style={{ color: "#5A3E2B" }}>
              {error}
            </p>
            <button onClick={onClose} className="btn-primary inline-flex">
              <Icon name="ArrowLeft" size={18} />
              Назад
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
      >
        <Icon name="X" size={24} className="text-white" />
      </button>

      {ready && !error && (
        <>
          <div className="absolute top-5 left-5 z-10 px-4 py-2 rounded-full"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
            <span className="font-body text-sm font-bold text-white">✨ {name} оживает</span>
          </div>

          {video && hasAudio && (
            <button
              onClick={toggleSound}
              className="absolute z-10 flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{ top: "5rem", left: "1.25rem", background: muted ? "var(--bronze)" : "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
            >
              <Icon name={muted ? "VolumeX" : "Volume2"} size={18} className="text-white" />
              <span className="font-body text-sm font-bold text-white">
                {muted ? "Включить звук" : "Звук вкл"}
              </span>
            </button>
          )}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 px-5 py-3 rounded-full"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
            <button
              onClick={() => setScale((s) => Math.max(0.4, s - 0.2))}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white/20"
            >
              <Icon name="Minus" size={22} className="text-white" />
            </button>
            <button
              onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white/20"
            >
              <Icon name="Plus" size={22} className="text-white" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}