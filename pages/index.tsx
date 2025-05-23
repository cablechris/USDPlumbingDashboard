import Head from 'next/head';
import useSWR from 'swr';
import DialCard from '@/components/DialCard';
import Heartbeat from '@/components/Heartbeat';
import ThresholdExplainer from '@/components/ThresholdExplainer';
import type { SignalsResponse } from '../types/signals';
import useSignals from '@/hooks/useSignals';
import NetLiquidityChart from '@/components/NetLiquidityChart';
import PivotGauge from '@/components/PivotGauge';
import { metricDefs } from '@/constants/metrics';
import type { Status } from '@/components/DialCard';

const fetcher = (url: string) => fetch(url).then(r => r.json());
export default function Home() {
  const { signals, isLoading, isError } = useSignals();
  if (isLoading) return <p className="p-8 text-white">Loading …</p>;
  if (isError || !signals) return <p>Error loading data.</p>;

  // Map API metrics to DialMetric by merging with metricDefs
  const dialMetrics = metricDefs.map(def => {
    const apiMetric = signals.metrics.find(m => m.id.toUpperCase() === def.id);
    return {
      ...def,
      ...apiMetric,
      label: def.label,
      unit: def.unit,
      caption: def.caption,
      spark: [], // placeholder, replace with real spark data if available
      value: apiMetric && typeof apiMetric.value === 'number' ? apiMetric.value : null,
      status: apiMetric && ['green', 'amber', 'red', 'stale'].includes(apiMetric.status) ? apiMetric.status as Status : 'stale',
      lastUpdated: apiMetric ? apiMetric.lastUpdated : '',
    };
  });

  const reds = dialMetrics.filter((m) => m.status === 'red').length;
  const ambers = dialMetrics.filter((m) => m.status === 'amber').length;
  const moveMetric = dialMetrics.find((m) => m.id === 'MOVE');
  const move = moveMetric && typeof moveMetric.value === 'number' && ['green', 'amber', 'red'].includes(moveMetric.status)
    ? { value: moveMetric.value, status: moveMetric.status as 'green' | 'amber' | 'red' }
    : undefined;
  // Replace [] with your real net liquidity data if available
  const netLiquiditySeries: number[] = [];

  // Example: Calculate pivot probability (replace with your real logic)
  const pivotProb = Number((signals.red_count / 10).toFixed(2));

  return (
    <>
      <Head>
        <title>USD Plumbing Dashboard</title>
      </Head>

      <Heartbeat reds={reds} ambers={ambers} move={move} />

      <main className="min-h-screen bg-neutral-900 text-white pb-24 pt-20">
        {/* Dial grid */}
        <section className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {dialMetrics.map((m) => (
            <DialCard key={m.id} m={m} />
          ))}
        </section>

        {/* Net liquidity + pivot dial */}
        <section className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
          <NetLiquidityChart series={netLiquiditySeries} />
          <PivotGauge prob={pivotProb} />
        </section>
      </main>

      {/* explainer footer */}
      <div className="p-6">
        <ThresholdExplainer />
      </div>
    </>
  );
} 