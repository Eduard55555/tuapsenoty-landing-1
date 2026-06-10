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
function createSea(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1100;

  // «волны»: медленно колышем частоту фильтра — слышен накат прибоя
  const surfLfo = ctx.createOscillator();
  surfLfo.frequency.value = 0.15;
  const surfDepth = ctx.createGain();
  surfDepth.gain.value = 700;
  surfLfo.connect(surfDepth);
  surfDepth.connect(filter.frequency);

  // громкость с собственным узлом для плавного вкл/выкл
  const innerGain = ctx.createGain();
  innerGain.gain.value = 0.6;

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0;

  noise.connect(filter);
  filter.connect(innerGain);
  innerGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  noise.start();
  surfLfo.start();

  return { masterGain };
}

export function useSeaSound() {
  const [enabled, setEnabled] = useState(false);
  const seaRef = useRef<{ masterGain: GainNode } | null>(null);

  const toggle = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    setEnabled((prev) => {
      const next = !prev;
      if (!seaRef.current) seaRef.current = createSea(ctx);
      const now = ctx.currentTime;
      const g = seaRef.current.masterGain.gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(next ? 0.5 : 0, now + 1);
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (seaRef.current) {
        try {
          seaRef.current.masterGain.disconnect();
        } catch {
          /* noop */
        }
      }
    };
  }, []);

  return { enabled, toggle };
}