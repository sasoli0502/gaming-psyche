"use client";

import { AxisScores, AXIS_LABELS, Locale } from "@/lib/types";

interface RadarChartProps {
  scores: AxisScores;
  locale: Locale;
  size?: number;
}

export function RadarChart({ scores, locale, size = 320 }: RadarChartProps) {
  const axes: (keyof AxisScores)[] = [
    "aggression",
    "altruism",
    "cooperation",
    "intuition",
    "mastery",
  ];

  const center = size / 2;
  const radius = size / 2 - 50; // More padding for labels
  const angleStep = (Math.PI * 2) / 5;

  // Convert scores to 0-100 range for display (from -100 to +100)
  const normalizedValues = axes.map(
    (axis) => ((scores[axis] + 100) / 200) * 100
  );

  // Generate polygon points
  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = normalizedValues.map((val, i) => getPoint(i, val));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Grid rings
  const rings = [25, 50, 75, 100];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto block">
      {/* Grid */}
      {rings.map((ring) => {
        const points = axes
          .map((_, i) => {
            const p = getPoint(i, ring);
            return `${p.x},${p.y}`;
          })
          .join(" ");
        return (
          <polygon
            key={ring}
            points={points}
            fill={ring === 100 ? "rgba(255, 184, 77, 0.02)" : "none"}
            stroke={ring === 100 ? "rgba(255, 184, 77, 0.15)" : "rgba(255, 255, 255, 0.05)"}
            strokeWidth={ring === 100 ? "1" : "0.5"}
          />
        );
      })}

      {/* Axis lines */}
      {axes.map((_, i) => {
        const end = getPoint(i, 100);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        );
      })}

      {/* Data polygon */}
      <path
        d={dataPath}
        fill="rgba(ff, 184, 77, 0.15)"
        stroke="rgba(255, 184, 77, 0.6)"
        strokeWidth="1.5"
        filter="url(#glow)"
        style={{ fill: "url(#dataGradient)" }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="#ffeed1"
          stroke="rgba(255, 184, 77, 0.8)"
          strokeWidth="1"
          filter="url(#glow)"
        />
      ))}

      {/* Labels */}
      {axes.map((axis, i) => {
        const labelPoint = getPoint(i, 125);
        return (
          <text
            key={axis}
            x={labelPoint.x}
            y={labelPoint.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255, 255, 255, 0.6)"
            fontSize="12"
            fontFamily="sans-serif"
            className="tracking-wide"
          >
            {AXIS_LABELS[axis][locale]}
          </text>
        );
      })}

      {/* Glow and Gradients */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 184, 77, 0.3)" />
          <stop offset="100%" stopColor="rgba(255, 123, 48, 0.1)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
