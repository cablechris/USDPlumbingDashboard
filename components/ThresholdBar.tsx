import React from 'react';

interface Props { green: string; amber: string; red: string; unit: string; }

export default function ThresholdBar({ green, amber, red, unit }: Props) {
  return (
    <div className="flex text-[10px] h-3 w-full rounded overflow-hidden border">
      <div className="flex-1 bg-status-green text-center text-white">≤ {green}{unit}</div>
      <div className="flex-1 bg-status-amber text-center text-white">{green}–{amber}{unit}</div>
      <div className="flex-1 bg-status-red text-center text-white">≥ {red}{unit}</div>
    </div>
  );
} 