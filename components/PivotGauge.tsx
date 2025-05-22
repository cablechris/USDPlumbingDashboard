interface PivotGaugeProps {
  prob: number;
}

export default function PivotGauge({ prob }: PivotGaugeProps) {
  const getColor = (value: number) => {
    if (value >= 0.7) return 'bg-status-red';
    if (value >= 0.4) return 'bg-status-amber';
    return 'bg-status-green';
  };

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Pivot Probability</h2>
      
      <div className="relative h-32">
        {/* Gauge background */}
        <div className="absolute inset-0 bg-neutral-700 rounded-full" />
        
        {/* Gauge fill */}
        <div
          className={`absolute inset-0 ${getColor(prob)} rounded-full transition-all duration-500`}
          style={{ clipPath: `inset(0 ${100 - prob * 100}% 0 0)` }}
        />
        
        {/* Gauge value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-mono font-bold text-white">
            {(prob * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="mt-4 text-sm text-neutral-400 text-center">
        Probability of a Fed policy pivot in the next 30 days
      </div>
    </div>
  );
} 