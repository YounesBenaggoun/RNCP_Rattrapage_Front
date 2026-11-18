import { useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  ReferenceLine, Brush, ResponsiveContainer,
} from "recharts";
import { COLORS, monthLabel } from "../lib/enso.js";

export default function EvolutionChart({ rows }) {
  const series = useMemo(
    () =>
      rows.map((d) => ({
        label: monthLabel(d),
        pos: Math.max(d.oni, 0),
        neg: Math.min(d.oni, 0),
      })),
    [rows]
  );

  return (
    <div style={{ height: 380 }}>
      <ResponsiveContainer>
        <AreaChart data={series}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} minTickGap={40} />
          <YAxis domain={[-3, 3]} />
          <Tooltip
            formatter={(v, n) => [Number(v).toFixed(2), n === "pos" ? "El Niño (+)" : "La Niña (−)"]}
          />
          <ReferenceLine y={0.5} stroke={COLORS.elnino} strokeDasharray="4 4"
            label={{ value: "+0,5", fontSize: 11, fill: COLORS.elnino }} />
          <ReferenceLine y={-0.5} stroke={COLORS.lanina} strokeDasharray="4 4"
            label={{ value: "−0,5", fontSize: 11, fill: COLORS.lanina }} />
          <Area type="monotone" dataKey="pos" stackId="1"
            stroke={COLORS.elnino} fill={COLORS.elnino} fillOpacity={0.55} />
          <Area type="monotone" dataKey="neg" stackId="1"
            stroke={COLORS.lanina} fill={COLORS.lanina} fillOpacity={0.55} />
          <Brush dataKey="label" height={24} travellerWidth={8} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
