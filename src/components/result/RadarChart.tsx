"use client";

import { AxisScores, AXIS_LABELS, Locale } from "@/lib/types";

interface RadarChartProps {
  scores: AxisScores;
  locale: Locale;
  size?: number;
}

export function RadarChart({ scores, locale, size = 280 }: RadarChartProps) {
  const axes: (keyof AxisScores)[] = [
    "aggression",
    "altruism",
    "cooperation",
    "intuition",
    "mastery",
  ];

  const center = size / 2;
  const radius = size / 2 - 40;
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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
            fill="none"
            stroke="rgba(0, 240, 255, 0.1)"
            strokeWidth="0.5"
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
            stroke="rgba(0, 240, 255, 0.1)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Data polygon */}
      <path
        d={dataPath}
        fill="rgba(0, 240, 255, 0.15)"
        stroke="rgba(0, 240, 255, 0.8)"
        strokeWidth="2"
        filter="url(#glow)"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#00f0ff"
          filter="url(#glow)"
        />
      ))}

      {/* Labels */}
      {axes.map((axis, i) => {
        const labelPoint = getPoint(i, 120);
        return (
          <text
            key={axis}
            x={labelPoint.x}
            y={labelPoint.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.6)"
            fontSize="11"
            fontFamily="monospace"
          >
            {AXIS_LABELS[axis][locale]}
          </text>
        );
      })}

      {/* Glow filter */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
