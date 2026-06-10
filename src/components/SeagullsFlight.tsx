interface Gull {
  top: string;
  scale: number;
  duration: number;
  delay: number;
  flap: number;
}

const GULLS: Gull[] = [
  { top: "12%", scale: 1, duration: 19, delay: -2, flap: 0.9 },
  { top: "21%", scale: 0.72, duration: 25, delay: -8, flap: 1.05 },
  { top: "8%", scale: 0.55, duration: 29, delay: -15, flap: 1.2 },
  { top: "27%", scale: 0.85, duration: 22, delay: -5, flap: 0.95 },
  { top: "16%", scale: 0.42, duration: 33, delay: -22, flap: 1.3 },
];

const BODY = "rgba(252,247,238,0.97)";
const WING = "rgba(232,224,212,0.97)";
const TIP = "rgba(120,120,128,0.9)";
const BEAK = "rgba(245,170,70,0.95)";

// Контуры крыльев в трёх фазах взмаха (вверх → ровно → вниз)
const WING_UP =
  "M40 24 C30 8 18 4 4 9 C16 9 26 14 33 22 C24 18 14 18 6 22 C18 23 31 24 40 26 Z";
const WING_MID =
  "M40 25 C30 18 18 16 3 21 C15 19 26 21 33 24 C24 23 14 24 6 27 C18 27 31 27 40 27 Z";
const WING_DOWN =
  "M40 26 C30 32 18 36 5 33 C16 31 26 29 33 26 C24 28 14 30 7 34 C18 31 31 28 40 27 Z";

function Seagull({ flap }: { flap: number }) {
  const dur = `${flap}s`;
  return (
    <svg
      width="70"
      height="44"
      viewBox="0 0 80 44"
      fill="none"
      style={{ filter: "drop-shadow(0 2px 2px rgba(40,70,90,0.18))" }}
    >
      {/* левое крыло (морфинг взмаха) */}
      <path fill={WING}>
        <animate
          attributeName="d"
          dur={dur}
          repeatCount="indefinite"
          values={`${WING_UP};${WING_MID};${WING_DOWN};${WING_MID};${WING_UP}`}
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
        />
      </path>

      {/* тело */}
      <ellipse cx="44" cy="25" rx="6" ry="3.6" fill={BODY} />
      {/* хвост */}
      <path d="M44 25 L36 28 L43 26 Z" fill={BODY} />
      {/* шея и голова */}
      <circle cx="49" cy="21.5" r="2.8" fill={BODY} />
      {/* клюв */}
      <path d="M51.2 20.6 L57 20 L51.6 22.6 Z" fill={BEAK} />
      {/* глаз */}
      <circle cx="49.6" cy="21" r="0.6" fill="rgba(60,50,40,0.85)" />

      {/* правое крыло — зеркало левого (морфинг в противофазе для глубины) */}
      <g transform="translate(88 0) scale(-1 1)">
        <path fill={WING} opacity="0.95">
          <animate
            attributeName="d"
            dur={dur}
            repeatCount="indefinite"
            values={`${WING_UP};${WING_MID};${WING_DOWN};${WING_MID};${WING_UP}`}
            keyTimes="0;0.25;0.5;0.75;1"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
          />
        </path>
      </g>

      {/* тёмные кончики крыльев для реализма */}
      <circle cx="6" cy="22" r="1.6" fill={TIP} opacity="0.55" />
      <circle cx="74" cy="22" r="1.6" fill={TIP} opacity="0.55" />
    </svg>
  );
}

export default function SeagullsFlight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]" aria-hidden="true">
      {GULLS.map((g, i) => (
        <div
          key={i}
          className="absolute left-0"
          style={{
            top: g.top,
            ["--gull-scale" as string]: g.scale,
            animation: `gull-fly ${g.duration}s linear ${g.delay}s infinite`,
          }}
        >
          <div style={{ animation: `gull-bob ${(g.flap * 2).toFixed(2)}s ease-in-out infinite` }}>
            <Seagull flap={g.flap} />
          </div>
        </div>
      ))}
    </div>
  );
}
