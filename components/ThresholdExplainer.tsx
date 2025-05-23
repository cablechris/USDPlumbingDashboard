import { useState } from "react";
import thresholds from "@/content/thresholds.json";
import { metricDefs } from "@/constants/metrics";
import ThresholdBar from "./ThresholdBar";
import { ChevronDown } from "lucide-react";

export default function ThresholdExplainer() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="explainer" className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-200">
        Why these colours?
      </h2>

      {metricDefs.map((def) => {
        const meta = thresholds.metrics.find((m) => m.id === def.id);
        if (!meta) return null;

        const open = openId === def.id;

        return (
          <article key={def.id}
                   className="rounded-md border border-slate-700 bg-slate-800">
            {/* header */}
            <button
              className="flex w-full items-center justify-between px-4 py-2 text-left"
              onClick={() => setOpenId(open ? null : def.id)}
            >
              <span className="font-medium text-slate-100">
                {def.label} — <span className="text-slate-400">{def.unit}</span>
              </span>
              <ChevronDown size={18}
                           className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="space-y-4 px-4 pb-4 text-sm text-slate-300">
                <p>{meta.description}</p>

                <ThresholdBar r={meta.ranges} />

                <table className="mt-2 w-full text-xs">
                  <thead className="text-slate-400">
                    <tr><th className="w-24 text-left">Date</th>
                        <th className="text-left">Follow-on event (≤ 14 d)</th></tr>
                  </thead>
                  <tbody>
                    {meta.history.map((h) => (
                      <tr key={h.date}>
                        <td>{h.date}</td><td>{h.event}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
} 