export type MetricFamily = "Fed Valves" | "Funding Markets" | "Treasury Pulse";

export interface MetricDef {
  id: string;              // key in signals_latest.json
  label: string;           // pretty label on card
  unit: "B" | "bp" | "%" | ""; // unit tag
  caption: string;         // sub-text, ≤ 7 words
  family: MetricFamily;
}

export const metricDefs: MetricDef[] = [
  // ---- Fed Valves ----
  { id: "ON_RRP", label: "ON-RRP", unit: "B", caption: "Cash parked overnight", family: "Fed Valves" },
  { id: "RESERVES", label: "Reserve Balances", unit: "B", caption: "Bank deposits at Fed", family: "Fed Valves" },
  { id: "SRF_USAGE", label: "SRF Usage", unit: "B", caption: "Standing repo take-up", family: "Fed Valves" },

  // ---- Funding Markets ----
  { id: "SOFR_IOER_SPREAD", label: "SOFR–IOER", unit: "bp", caption: "GC repo vs IOER", family: "Funding Markets" },
  { id: "FRA_OIS_3M", label: "3-m FRA-OIS", unit: "bp", caption: "Interbank stress gauge", family: "Funding Markets" },
  { id: "EURUSD_BASIS_3M", label: "EURUSD FX-basis", unit: "bp", caption: "Cross-currency dollar demand", family: "Funding Markets" },

  // ---- Treasury Pulse ----
  { id: "MOVE", label: "MOVE Index", unit: "", caption: "Treasury vol smoke-alarm", family: "Treasury Pulse" },
  { id: "AUCTION_TAIL_10Y", label: "10-y Auction Tail", unit: "bp", caption: "Demand for duration", family: "Treasury Pulse" },
  { id: "TREASURY_FAILS", label: "Treasury Fails", unit: "B", caption: "Settlement hiccups", family: "Treasury Pulse" },
  { id: "BILL_SHARE_PCT", label: "Bill-share", unit: "%", caption: "Short-term issuance", family: "Treasury Pulse" },
]; 