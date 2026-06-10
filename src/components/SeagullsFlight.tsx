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
const WING = "rgba(238,231,220,0.97)";
const HEAD = "rgba(255,255,255,1)";
const HEAD_OUTLINE = "rgba(70,90,105,0.55)";
const BEAK = "rgba(240,135,25,1)";
const BEAK_OUTLINE = "rgba(180,90,10,0.9)";
const EYE = "rgba(30,25,20,1)";

// Цельное крыло (одна фигура) в трёх фазах взмаха
const WING_UP = "M40 25 C30 9 18 5 5 10 C18 12 30 18 40 27 Z";
const WING_MID = "M40 25 C30 19 18 17 4 22 C18 21 30 23 40 27 Z";
const WING_DOWN = "M40 25 C30 31 18 35 6 33 C18 30 30 28 40 27 Z";

function Seagull({ flap }: { flap: number }) {
  const dur = `${flap}s`;
  const wingAnim = (
    <animate
      attributeName="d"
      dur={dur}
      repeatCount="indefinite"
      values={`${WING_UP};${WING_MID};${WING_DOWN};${WING_MID};${WING_UP}`}
      keyTimes="0;0.25;0.5;0.75;1"
      calcMode="spline"
      keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
    />
  );

  return (
    <svg
      width="70"
      height="44"
      viewBox="0 0 80 44"
      fill="none"
      style={{ filter: "drop-shadow(0 2px 2px rgba(40,70,90,0.18))" }}
    >
      {/* левое крыло */}
      <path fill={WING}>{wingAnim}</path>

      {/* правое крыло — зеркало */}
      <g transform="translate(88 0) scale(-1 1)">
        <path fill={WING}>{wingAnim}</path>
      </g>

      {/* тело */}
      <ellipse cx="44" cy="25.5" rx="6.5" ry="3.6" fill={BODY} />
      {/* хвост */}
      <path d="M44 25.5 L36 28.5 L43 26.5 Z" fill={BODY} />

      {/* шея */}
      <path d="M48 24 C50 22 51 21 52 19.5 L54 21 C53 23 51 24.5 49 26 Z" fill={BODY} />
      {/* голова */}
      <circle cx="53" cy="19" r="3.3" fill={HEAD} stroke={HEAD_OUTLINE} strokeWidth="0.6" />
      {/* нижняя челюсть клюва */}
      <path d="M55.4 19.6 L61.5 19.3 L55.8 21 Z" fill={BEAK} stroke={BEAK_OUTLINE} strokeWidth="0.4" strokeLinejoin="round" />
      {/* верхняя челюсть клюва */}
      <path d="M55.4 18 L61.8 18.6 L55.8 19.4 Z" fill={BEAK} stroke={BEAK_OUTLINE} strokeWidth="0.4" strokeLinejoin="round" />
      {/* глаз */}
      <circle cx="53.6" cy="18.4" r="1" fill={EYE} />
      <circle cx="53.9" cy="18.1" r="0.32" fill="rgba(255,255,255,0.95)" />
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