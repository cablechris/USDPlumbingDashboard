import clsx from "classnames";

interface Ranges {
  greenMin: number; greenMax: number;
  amberMin: number; amberMax: number;
  redMin: number;   redMax: number;
}

export default function ThresholdBar({ r }: { r: Ranges }) {
  const span = r.greenMax - r.redMin || 1;
  const pct = (a: number, b: number) => ((b - a) / span) * 100;

  return (
    <div className="relative h-4 w-full rounded-sm bg-status-red/30">
      {/* amber band */}
      <div
        className="absolute top-0 h-full bg-status-amber/30"
        style={{ left: `${pct(r.redMin, r.redMax)}%`,
                 width: `${pct(r.amberMin, r.amberMax)}%` }}
      />
      {/* green band */}
      <div
        className="absolute top-0 h-full bg-status-green/30"
        style={{ left: `${pct(r.amberMax, r.amberMax)}%`,
                 width: `${pct(r.greenMin, r.greenMax)}%` }}
      />
      {/* boundary ticks */}
      {[r.redMax, r.amberMax].map((x) => (
        <div key={x}
             className="absolute top-0 h-full w-0.5 bg-slate-500 opacity-60"
             style={{ left: `${pct(r.redMin, x)}%` }} />
      ))}
    </div>
  );
} 