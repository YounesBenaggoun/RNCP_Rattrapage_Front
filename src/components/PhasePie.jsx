import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { COLORS, LABEL } from "../lib/enso.js";

export default function PhasePie({ counts, total }) {
  const data = Object.keys(counts).map((k) => ({ key: k, name: LABEL[k], value: counts[k] }));

  return (
    <div style={{ height: 380 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={130}
            paddingAngle={2}
            label={(e) => `${Math.round((e.value / total) * 100)}%`}
          >
            {data.map((d) => (
              <Cell key={d.key} fill={COLORS[d.key]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => [`${v} mois`, ""]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
