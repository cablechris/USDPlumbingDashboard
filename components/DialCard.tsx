import StatusIcon from "./StatusIcon";
import SparkSVG from "./SparkSVG";
import clsx from "clsx";

export type Status = "green" | "amber" | "red" | "stale";
export interface DialMetric {
  id: string;
  label: string;
  value: number | null;
  unit: string;
  status: Status;
  spark: number[];
  caption: string;
  lastUpdated: string;    // ISO string
  delta?: number | null;  // optional day-over-day change
}

export default function DialCard({ m }: { m: DialMetric }) {
  const borderClr = {
    green: "border-status-green",
    amber: "border-status-amber",
    red:   "border-status-red",
    stale: "border-status-stale",
  }[m.status];

  return (
    <div
      className={clsx(
        "relative rounded-md border-l-4 bg-slate-800 px-4 py-3 shadow",
        borderClr
      )}
    >
      {/* header */}
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-slate-100">{m.label}</h3>
        <StatusIcon status={m.status} />
      </div>

      {/* value + unit */}
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-3xl tabular-nums text-slate-200">
          {m.value === null ? "N/A" : m.value.toLocaleString()}
        </span>
        {m.unit && <span className="text-xs text-slate-400">{m.unit}</span>}
      </div>

      {/* delta badge */}
      {typeof m.delta === "number" && (
        <span
          className={clsx(
            "absolute right-3 top-8 rounded-full px-1.5 py-0.5 text-[11px]",
            m.delta >= 0 ? "bg-emerald-700" : "bg-rose-700"
          )}
        >
          {m.delta >= 0 ? "▲" : "▼"} {Math.abs(m.delta).toFixed(1)}
        </span>
      )}

      {/* sparkline */}
      {m.spark?.length > 10 && (
        <SparkSVG data={m.spark} className="absolute bottom-1 right-2 h-6 w-24" />
      )}

      {/* caption */}
      <p className="mt-1 truncate text-xs text-slate-400">{m.caption}</p>
    </div>
  );
} 