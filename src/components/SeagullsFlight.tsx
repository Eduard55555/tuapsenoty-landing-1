interface Gull {
  top: string;
  scale: number;
  duration: number;
  delay: number;
  flap: number;
}

const GULLS: Gull[] = [
  { top: "12%", scale: 1, duration: 18, delay: 0, flap: 0.6 },
  { top: "20%", scale: 0.7, duration: 24, delay: 4, flap: 0.75 },
  { top: "8%", scale: 0.55, duration: 28, delay: 9, flap: 0.7 },
  { top: "26%", scale: 0.85, duration: 21, delay: 13, flap: 0.65 },
  { top: "16%", scale: 0.45, duration: 32, delay: 7, flap: 0.8 },
];

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
          <svg width="46" height="20" viewBox="0 0 46 20" fill="none">
            <g
              style={{
                transformOrigin: "center",
                animation: `gull-flap ${g.flap}s ease-in-out infinite`,
              }}
            >
              <path
                d="M2 14 Q12 2 23 11 Q34 2 44 14"
                stroke="rgba(245,230,211,0.9)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
