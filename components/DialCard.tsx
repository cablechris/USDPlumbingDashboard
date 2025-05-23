import type { Metric } from '@/types/signals';

interface DialCardProps {
  metric: Metric;
}

export default function DialCard({ metric }: DialCardProps) {
  const statusColors = {
    green: 'bg-status-green',
    amber: 'bg-status-amber',
    red: 'bg-status-red',
  };

  return (
    <div className="rounded-lg bg-neutral-800 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
        <div className={`h-3 w-3 rounded-full ${statusColors[metric.status]}`} />
      </div>
      
      <div className="mt-4">
        <p className="text-3xl font-mono font-bold text-white tabular-nums">
          {typeof metric.value === 'number' && !isNaN(metric.value)
            ? metric.value.toFixed(2)
            : 'N/A'}
        </p>
        <p className="mt-2 text-sm text-neutral-400">{metric.description}</p>
      </div>

      <div className="mt-4 text-xs text-neutral-500">
        Last updated: {new Date(metric.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
} 