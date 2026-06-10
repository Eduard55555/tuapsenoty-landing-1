import { useCallback, useEffect, useRef, useState } from "react";

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    sharedCtx = new AC();
  }
  if (sharedCtx.state === "suspended") sharedCtx.resume();
  return sharedCtx;
}

/** Лёгкий звон монетки */
export function playCoin() {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
  gain.connect(ctx.destination);

  [1318, 1976].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + i * 0.02);
    osc.connect(gain);
    osc.start(now + i * 0.02);
    osc.stop(now + 0.35);
  });
}

/** Фоновый шум моря: фильтрованный белый шум с медленной волной */
interface Sea {
  masterGain: GainNode;
  start: () => void;
  stop: () => void;
}

function createSea(ctx: AudioContext): Sea {
  // длинный буфер розового шума (мягче белого, ближе к воде)
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.997 * b0 + 0.0299 * white;
    b1 = 0.985 * b1 + 0.0750 * white;
    b2 = 0.950 * b2 + 0.1538 * white;
    data[i] = (b0 + b1 + b2 + white * 0.1) * 0.3;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  // основной мягкий фон моря
  const bgFilter = ctx.createBiquadFilter();
  bgFilter.type = "lowpass";
  bgFilter.frequency.value = 480;
  const bgGain = ctx.createGain();
  bgGain.gain.value = 0.25;
  noise.connect(bgFilter);
  bgFilter.connect(bgGain);

  // канал «накатов» прибоя — полосовой фильтр + управляемая громкость
  const surfFilter = ctx.createBiquadFilter();
  surfFilter.type = "bandpass";
  surfFilter.frequency.value = 900;
  surfFilter.Q.value = 0.7;
  const surfGain = ctx.createGain();
  surfGain.gain.value = 0;
  noise.connect(surfFilter);
  surfFilter.connect(surfGain);

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0;
  bgGain.connect(masterGain);
  surfGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  noise.start();

  // один крик чайки: короткий «вскрик» с вибрато и нисходящим тоном
  const gullCry = (delay: number) => {
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    const base = 950 + Math.random() * 250;
    osc.frequency.setValueAtTime(base, t0);
    osc.frequency.linearRampToValueAtTime(base * 1.25, t0 + 0.06);
    osc.frequency.linearRampToValueAtTime(base * 0.8, t0 + 0.22);

    // вибрато
    const vib = ctx.createOscillator();
    vib.frequency.value = 28;
    const vibGain = ctx.createGain();
    vibGain.gain.value = 45;
    vib.connect(vibGain);
    vibGain.connect(osc.frequency);

    const cryFilter = ctx.createBiquadFilter();
    cryFilter.type = "bandpass";
    cryFilter.frequency.value = base * 1.4;
    cryFilter.Q.value = 4;

    const cryGain = ctx.createGain();
    cryGain.gain.setValueAtTime(0.0001, t0);
    cryGain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.04);
    cryGain.gain.setValueAtTime(0.12, t0 + 0.16);
    cryGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);

    osc.connect(cryFilter);
    cryFilter.connect(cryGain);
    cryGain.connect(masterGain);

    osc.start(t0);
    vib.start(t0);
    osc.stop(t0 + 0.3);
    vib.stop(t0 + 0.3);
  };

  let timer: ReturnType<typeof setTimeout> | null = null;
  let gullTimer: ReturnType<typeof setTimeout> | null = null;
  let alive = false;

  // редкие крики чаек: серия из 2-3 вскриков, потом долгая пауза
  const gulls = () => {
    if (!alive) return;
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) gullCry(i * (0.32 + Math.random() * 0.12));
    const next = (8 + Math.random() * 14) * 1000;
    gullTimer = setTimeout(gulls, next);
  };

  // один накат волны: нарастание -> шуршание -> затухание
  const wave = () => {
    if (!alive) return;
    const now = ctx.currentTime;
    const peak = 0.35 + Math.random() * 0.25;
    const rise = 1.4 + Math.random() * 1.2;
    const fall = 2.2 + Math.random() * 1.6;

    const g = surfGain.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(peak, now + rise);
    g.linearRampToValueAtTime(0.0001, now + rise + fall);

    // фильтр всплывает вверх на накате и опускается на откате — эффект «шшш»
    const f = surfFilter.frequency;
    f.cancelScheduledValues(now);
    f.setValueAtTime(700, now);
    f.linearRampToValueAtTime(1600, now + rise);
    f.linearRampToValueAtTime(500, now + rise + fall);

    const next = (rise + fall + 0.6 + Math.random() * 1.5) * 1000;
    timer = setTimeout(wave, next);
  };

  return {
    masterGain,
    start: () => {
      if (alive) return;
      alive = true;
      wave();
      gullTimer = setTimeout(gulls, (4 + Math.random() * 6) * 1000);
    },
    stop: () => {
      alive = false;
      if (timer) clearTimeout(timer);
      if (gullTimer) clearTimeout(gullTimer);
    },
  };
}

export function useSeaSound() {
  const [enabled, setEnabled] = useState(false);
  const seaRef = useRef<Sea | null>(null);

  const toggle = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    setEnabled((prev) => {
      const next = !prev;
      if (!seaRef.current) seaRef.current = createSea(ctx);
      const sea = seaRef.current;
      const now = ctx.currentTime;
      const g = sea.masterGain.gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(next ? 0.6 : 0, now + 1.2);
      if (next) sea.start();
      else setTimeout(() => sea.stop(), 1200);
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (seaRef.current) {
        try {
          seaRef.current.stop();
          seaRef.current.masterGain.disconnect();
        } catch {
          /* noop */
        }
      }
    };
  }, []);

  return { enabled, toggle };
}