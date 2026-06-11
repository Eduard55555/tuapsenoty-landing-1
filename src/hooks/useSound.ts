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

// короткий буфер белого шума — переиспользуем для «удара» металла
let clickBuffer: AudioBuffer | null = null;
function getClickBuffer(ctx: AudioContext): AudioBuffer {
  if (!clickBuffer) {
    const len = Math.floor(ctx.sampleRate * 0.05);
    clickBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = clickBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return clickBuffer;
}

/** Один звон монетки: шумовой удар металла + негармоничные обертоны */
function coinPing(ctx: AudioContext, t0: number, base: number, vol: number) {
  const out = ctx.createGain();
  out.gain.value = vol;
  out.connect(ctx.destination);

  // 1) удар металла — короткий фильтрованный всплеск шума
  const noise = ctx.createBufferSource();
  noise.buffer = getClickBuffer(ctx);
  const nbp = ctx.createBiquadFilter();
  nbp.type = "bandpass";
  nbp.frequency.value = base * 2.5;
  nbp.Q.value = 1.5;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.9, t0);
  ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.03);
  noise.connect(nbp);
  nbp.connect(ng);
  ng.connect(out);
  noise.start(t0);
  noise.stop(t0 + 0.05);

  // 2) металлический звон — негармонические частоты (как у колокольчика/монеты)
  const partials = [1, 2.76, 5.4, 8.93];
  partials.forEach((mult, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = base * mult;
    const g = ctx.createGain();
    const peak = 0.5 / (i + 1);
    const decay = 0.25 - i * 0.04;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(0.08, decay));
    osc.connect(g);
    g.connect(out);
    osc.start(t0);
    osc.stop(t0 + 0.3);
  });
}

/** Звон горсти монет: несколько монеток вразнобой */
export function playCoin() {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const bases = [2100, 2480, 2790, 3100, 3520];
  const count = 4 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    const t0 = now + i * (0.04 + Math.random() * 0.06);
    const base = bases[Math.floor(Math.random() * bases.length)] * (0.96 + Math.random() * 0.08);
    const vol = 0.12 + Math.random() * 0.06;
    coinPing(ctx, t0, base, vol);
  }
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

  // убираем низкий «рокот/гул» — оставляем только шуршание воды
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 700;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 6000;

  // накаты прибоя — плавное изменение только громкости, фильтры статичны
  const surfGain = ctx.createGain();
  surfGain.gain.value = 0.06;
  noise.connect(hp);
  hp.connect(lp);
  lp.connect(surfGain);

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0;
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

  // один накат волны: только плавное нарастание и затухание громкости
  const wave = () => {
    if (!alive) return;
    const now = ctx.currentTime;
    const peak = 0.28 + Math.random() * 0.18;
    const rise = 1.6 + Math.random() * 1.4;
    const fall = 2.6 + Math.random() * 1.8;

    const g = surfGain.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(peak, now + rise);
    g.linearRampToValueAtTime(0.06, now + rise + fall);

    const next = (rise + fall + 0.4 + Math.random() * 1.2) * 1000;
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