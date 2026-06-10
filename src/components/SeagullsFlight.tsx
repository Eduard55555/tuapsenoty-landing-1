interface Gull {
  top: string;
  scale: number;
  duration: number;
  delay: number;
  flap: number;
}

const GULLS: Gull[] = [
  { top: "12%", scale: 1, duration: 18, delay: 0, flap: 0.7 },
  { top: "20%", scale: 0.7, duration: 24, delay: 4, flap: 0.85 },
  { top: "8%", scale: 0.55, duration: 28, delay: 9, flap: 0.8 },
  { top: "26%", scale: 0.85, duration: 21, delay: 13, flap: 0.75 },
  { top: "16%", scale: 0.45, duration: 32, delay: 7, flap: 0.9 },
];

const FILL = "rgba(250,243,230,0.96)";
const BEAK = "rgba(245,160,80,0.95)";

function Seagull({ flap }: { flap: number }) {
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
      {/* тело */}
      <ellipse cx="32" cy="22" rx="5" ry="3.4" fill={FILL} />
      {/* хвост */}
      <path d="M32 22 L26 26 L31 23 Z" fill={FILL} />
      {/* голова */}
      <circle cx="36.5" cy="18.5" r="2.6" fill={FILL} />
      {/* клюв */}
      <path d="M38.5 17.6 L43 17 L38.8 19.4 Z" fill={BEAK} />

      {/* левое крыло (машет) */}
      <path
        d="M32 21 C24 14 14 12 3 20 C13 17 21 18 28 22 Z"
        fill={FILL}
        style={{
          transformOrigin: "30px 21px",
          animation: `gull-flap ${flap}s ease-in-out infinite`,
        }}
      />
      {/* правое крыло (машет) */}
      <path
        d="M33 21 C41 13 51 10 62 17 C51 15 43 17 36 22 Z"
        fill={FILL}
        style={{
          transformOrigin: "34px 21px",
          animation: `gull-flap ${flap}s ease-in-out infinite`,
        }}
      />
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
          <Seagull flap={g.flap} />
        </div>
      ))}
    </div>
  );
}
