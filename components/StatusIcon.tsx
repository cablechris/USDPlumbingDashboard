import { CheckCircle, AlertCircle, XCircle, HelpCircle } from "lucide-react";

type Status = "green" | "amber" | "red" | "stale";

export default function StatusIcon({ status }: { status: Status }) {
  const size = 16;
  switch (status) {
    case "green":
      return <CheckCircle size={size} className="text-status-green" />;
    case "amber":
      return <AlertCircle size={size} className="text-status-amber" />;
    case "red":
      return <XCircle size={size} className="text-status-red" />;
    default:
      return <HelpCircle size={size} className="text-status-stale" />;
  }
} 