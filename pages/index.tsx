import Head from 'next/head';
import useSWR from 'swr';
import DialCard from '@/components/DialCard';
import Heartbeat from '@/components/Heartbeat';
import ThresholdExplainer from '@/components/ThresholdExplainer';
import type { SignalsResponse } from '../types/signals';
import useSignals from '@/hooks/useSignals';
import NetLiquidityChart from '@/components/NetLiquidityChart';
import PivotGauge from '@/components/PivotGauge';

const fetcher = (url: string) => fetch(url).then(r => r.json());
export default function Home() {
  const { signals, isLoading, isError } = useSignals();
  if (isLoading) return <p className="p-8 text-white">Loading …</p>;
  if (isError || !signals) return <p>Error loading data.</p>;

  const move = signals.metrics.find((m) => m.id === 'move');
  // Replace [] with your real net liquidity data if available
  const netLiquiditySeries = [];

  // Example: Calculate pivot probability (replace with your real logic)
  const pivotProb = Number((signals.red_count / 10).toFixed(2));

  return (
    <>
      <Head>
        <title>USD Plumbing Dashboard</title>
      </Head>

      <Heartbeat
        date={signals.date}
        reds={signals.red_count}
        ambers={signals.amber_count}
        move={move}
      />

      <main className="min-h-screen bg-neutral-900 text-white pb-24">
        {/* Dial grid */}
        <section className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {signals.metrics.map((m) => (
            <DialCard key={m.id} metric={m} />
          ))}
        </section>

        {/* Net liquidity + pivot dial */}
        <section className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
          <NetLiquidityChart series={netLiquiditySeries} />
          <PivotGauge prob={pivotProb} />
        </section>

        <ThresholdExplainer />
      </main>
    </>
  );
} 