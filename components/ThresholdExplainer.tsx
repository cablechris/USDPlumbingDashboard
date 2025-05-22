import { useEffect, useState } from 'react';

type Threshold = {
  description: string;
  green: number;
  amber: number;
  direction: 'ceiling' | 'floor';
  history?: { date: string; event: string }[];
};

type Thresholds = Record<string, Threshold>;

export default function ThresholdExplainer() {
  return (
    <div className="mt-8 mx-auto max-w-4xl px-4">
      <div className="rounded-lg bg-neutral-800 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Threshold Guide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-neutral-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-status-green" />
              <h3 className="font-semibold text-white">Green</h3>
            </div>
            <p className="text-sm text-neutral-300">
              Normal operating conditions. All metrics within expected ranges.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-status-amber" />
              <h3 className="font-semibold text-white">Amber</h3>
            </div>
            <p className="text-sm text-neutral-300">
              Warning conditions. Some metrics approaching concerning levels.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-status-red" />
              <h3 className="font-semibold text-white">Red</h3>
            </div>
            <p className="text-sm text-neutral-300">
              Critical conditions. Immediate attention required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 