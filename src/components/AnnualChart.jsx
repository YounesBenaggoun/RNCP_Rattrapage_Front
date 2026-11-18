import { useMemo } from "react";
import {
  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid,
  ReferenceLine, ResponsiveContainer,
} from "recharts";
import { COLORS, LABEL, phase } from "../lib/enso.js";

export default function AnnualChart({ rows }) {
  const annual = useMemo(() => {
    const g = {};
    rows.forEach((d) => {
      (g[d.year] = g[d.year] || []).push(d.oni);
    });
    return Object.entries(g).map(([year, v]) => ({
      year,
      avg: Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 100) / 100,
    }));
  }, [rows]);

  return (
    <div style={{ height: 380 }}>
      <ResponsiveContainer>
        <BarChart data={annual}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} minTickGap={20} />
          <YAxis domain={[-2, 2]} />
          <Tooltip formatter={(v) => [Number(v).toFixed(2), LABEL[phase(v)]]} />
          <ReferenceLine y={0} stroke="#6b7280" />
          <Bar dataKey="avg">
            {annual.map((d) => (
              <Cell key={d.year} fill={COLORS[phase(d.avg)]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
