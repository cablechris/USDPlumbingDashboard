import { format } from 'date-fns';
import { DialMetric } from "./DialCard";
import clsx from "clsx";

interface HeartbeatProps {
  date?: string;
  reds: number;
  ambers: number;
  move: { value: number; status: 'green' | 'amber' | 'red' } | undefined;
}

export default function Heartbeat({ date, reds, ambers, move }: HeartbeatProps) {
  const statusColors = {
    green: 'bg-status-green',
    amber: 'bg-status-amber',
    red: 'bg-status-red',
  };

  const overallStatus = reds > 0 ? 'red' : ambers > 0 ? 'amber' : 'green';

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-slate-200 sm:text-sm">
        {/* left – counts */}
        <div className="flex gap-6 font-mono">
          <CountCell label="Red Alerts" value={reds} status="red" />
          <CountCell label="Warnings" value={ambers} status="amber" />
          <CountCell label="Green" value={reds + ambers} status="green" className="hidden sm:block" />
        </div>

        {/* right – MOVE */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-semibold tabular-nums">
            {move?.value.toFixed(2) ?? 'N/A'}
          </span>
          <span className="text-[11px] text-slate-400">MOVE&nbsp;Index</span>
        </div>
      </div>
    </header>
  );
}

function CountCell({
  label,
  value,
  status,
  className,
}: {
  label: string;
  value: number;
  status: "green" | "amber" | "red";
  className?: string;
}) {
  const clr = {
    green: "text-status-green",
    amber: "text-status-amber",
    red:   "text-status-red",
  }[status];
  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <span className={clsx("text-base font-semibold", clr)}>{value}</span>
      <span className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
    </div>
  );
} 