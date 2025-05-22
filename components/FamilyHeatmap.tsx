import type { Metric } from '@/types/signals';

interface Props {
  metrics: Metric[];
}

const statusClass: Record<Metric['status'], string> = {
  green: 'bg-status-green',
  amber: 'bg-status-amber',
  red: 'bg-status-red',
};

export default function FamilyHeatmap({ metrics }: Props) {
  return (
    <div
      className="grid gap-[1px] overflow-x-auto text-[6px]"
      style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}
      role="grid"
      aria-label="Family Heatmap"
    >
      {metrics.map((m) => (
        <div
          key={m.id}
          title={`${m.id} • ${m.status}`}
          className={`aspect-square ${statusClass[m.status]}`}
          role="gridcell"
          aria-label={`${m.id}: ${m.status}`}
        />
      ))}
    </div>
  );
} 