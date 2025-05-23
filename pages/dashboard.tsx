import useSWR from "swr";
import DialCard, { DialMetric } from "@/components/DialCard";
import { metricDefs } from "@/constants/metrics";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Dashboard() {
  const { data, error } = useSWR<DialMetric[] | null>(
    process.env.NEXT_PUBLIC_SIGNALS_URL ?? "",
    fetcher,
    { refreshInterval: 1000 * 60 * 5 } // auto-refresh every 5 min
  );

  if (error) return <p className="m-10 text-red-500">Failed to load data.</p>;
  if (!data) return <p className="m-10">Loading…</p>;

  // Map JSON array to keyed lookup
  const byId: Record<string, DialMetric> = Object.fromEntries(
    data.map((d) => [d.id, d])
  );

  // Build family groups preserving metricDefs order
  const families = ["Fed Valves", "Funding Markets", "Treasury Pulse"] as const;

  return (
    <main className="space-y-8 p-6">
      {families.map((fam) => (
        <section key={fam} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-200">{fam}</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metricDefs
              .filter((d) => d.family === fam)
              .map((def) => (
                <DialCard
                  key={def.id}
                  m={{
                    ...def,
                    ...byId[def.id],        // overlay live data
                    unit: def.unit,
                    caption: def.caption,
                  }}
                />
              ))}
          </div>
        </section>
      ))}
    </main>
  );
} 