import { format } from 'date-fns';

interface HeartbeatProps {
  date: string;
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
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">System Status</h2>
          <p className="text-sm text-neutral-400">
            Last updated: {format(new Date(date), 'PPpp')}
          </p>
        </div>
        <div className={`h-4 w-4 rounded-full ${statusColors[overallStatus]}`} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-mono font-bold text-white">{reds}</p>
          <p className="text-sm text-neutral-400">Red Alerts</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-mono font-bold text-white">{ambers}</p>
          <p className="text-sm text-neutral-400">Warnings</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-mono font-bold text-white">
            {move?.value.toFixed(2) ?? 'N/A'}
          </p>
          <p className="text-sm text-neutral-400">MOVE Index</p>
        </div>
      </div>
    </div>
  );
} 