interface Gull {
  top: string;
  scale: number;
  duration: number;
  delay: number;
  bob: number;
  src: string;
}

const GULL_A =
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/files/a4ba3bc2-ee01-488d-b2db-87c6cbf04b19.jpg";
const GULL_B =
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/files/951b8dea-1863-428d-b7e6-6ac640822bbb.jpg";
const GULL_C =
  "https://cdn.poehali.dev/projects/5c864877-cf84-4a78-897d-bd1766f6ada6/files/ff86623d-eaa5-4f7c-943d-d6d5208f5c2e.jpg";

const GULLS: Gull[] = [
  { top: "12%", scale: 1, duration: 26, delay: -2, bob: 4.2, src: GULL_C },
  { top: "21%", scale: 0.72, duration: 32, delay: -10, bob: 5.0, src: GULL_A },
  { top: "8%", scale: 0.55, duration: 38, delay: -19, bob: 5.6, src: GULL_B },
  { top: "27%", scale: 0.85, duration: 29, delay: -6, bob: 4.6, src: GULL_A },
  { top: "16%", scale: 0.42, duration: 44, delay: -28, bob: 6.2, src: GULL_C },
];

function Seagull({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      width={84}
      height={84}
      style={{
        width: 84,
        height: "auto",
        mixBlendMode: "multiply",
        filter: "drop-shadow(0 3px 4px rgba(40,70,90,0.18))",
      }}
    />
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
          <div style={{ animation: `gull-bob ${g.bob.toFixed(2)}s ease-in-out infinite` }}>
            <Seagull src={g.src} />
          </div>
        </div>
      ))}
    </div>
  );
}
