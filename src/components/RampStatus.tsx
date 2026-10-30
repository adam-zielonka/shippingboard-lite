import { Status } from "../store/Ramp";

const statuses: Record<Status, { symbol: string; label: string }> = {
  loaded: { symbol: "✓", label: "Completed" },
  progress: { symbol: "◐", label: "In progress" },
  "not-started": { symbol: "○", label: "Not started" },
  empty: { symbol: "—", label: "Empty" },
  "": { symbol: "—", label: "No status" },
};

export function RampStatus({ status }: { status: Status }) {
  const { symbol, label } = statuses[status];
  return <span className="RampStatus">
    <span aria-hidden="true" className="symbol">{symbol}</span> {label}
  </span>;
}
