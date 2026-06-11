interface Gull {
  top: string;
  scale: number;
  duration: number;
  delay: number;
  flap: number;
}

const GULLS: Gull[] = [
  { top: "12%", scale: 1, duration: 19, delay: -2, flap: 2.2 },
  { top: "21%", scale: 0.72, duration: 25, delay: -8, flap: 2.6 },
  { top: "8%", scale: 0.55, duration: 29, delay: -15, flap: 3.0 },
  { top: "27%", scale: 0.85, duration: 22, delay: -5, flap: 2.4 },
  { top: "16%", scale: 0.42, duration: 33, delay: -22, flap: 3.3 },
];

const STROKE = "rgba(60,78,92,0.85)";

// Силуэт чайки одной линией: изгиб крыльев буквой «М».
// Фазы взмаха — от поднятых крыльев (глубокая «V») до распахнутых почти горизонтально.
const WINGS_UP =
  "M2 26 C12 22 20 6 30 14 C33 16 34 16 35 14 C45 6 53 22 63 26";
const WINGS_MID =
  "M2 20 C13 18 22 10 30 15 C33 17 34 17 35 15 C44 10 52 18 63 20";
const WINGS_FLAT =
  "M2 16 C14 16 23 14 30 16 C33 17 34 17 35 16 C42 14 51 16 63 16";

function Seagull({ flap }: { flap: number }) {
  const dur = `${flap}s`;
  return (
    <svg
      width="70"
      height="34"
      viewBox="0 0 65 34"
      fill="none"
      style={{ filter: "drop-shadow(0 1px 1px rgba(40,70,90,0.12))" }}
    >
      <path
        fill="none"
        stroke={STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="d"
          dur={dur}
          repeatCount="indefinite"
          values={`${WINGS_UP};${WINGS_MID};${WINGS_FLAT};${WINGS_MID};${WINGS_UP}`}
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
        />
      </path>
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
          <div style={{ animation: `gull-bob ${g.flap.toFixed(2)}s ease-in-out infinite` }}>
            <Seagull flap={g.flap} />
          </div>
        </div>
      ))}
    </div>
  );
}
