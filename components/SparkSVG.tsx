import { useId } from "react";

export default function SparkSVG({
  data,
  className,
}: {
  data: number[];
  className?: string;
}) {
  const id = useId();
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const width = 100;
  const height = 24;
  const scaleX = width / (data.length - 1);
  const scaleY = max === min ? 0 : height / (max - min);

  const points = data
    .map(
      (d, i) => `${i * scaleX},${height - (d - min) * scaleY}`
    )
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className ?? "h-6 w-24"}
      aria-hidden
    >
      <polyline
        id={id}
        points={points}
        fill="none"
        stroke="#38bdf8" /* teal-400 */
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
} 