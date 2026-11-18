import { useMemo } from "react";
import { LABEL, MONTHS, heatColor, phase } from "../lib/enso.js";

export default function Heatmap({ rows }) {
  const heat = useMemo(() => {
    const g = {};
    rows.forEach((d) => {
      (g[d.year] = g[d.year] || {})[d.month] = d.oni;
    });
    return Object.entries(g).sort((a, b) => b[0] - a[0]);
  }, [rows]);

  return (
    <div className="max-h-[420px] overflow-auto">
      <table className="table table-xs table-pin-rows">
        <thead>
          <tr>
            <th>Année</th>
            {MONTHS.map((m) => (
              <th key={m} className="text-center">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heat.map(([year, row]) => (
            <tr key={year}>
              <th>{year}</th>
              {MONTHS.map((_, i) => {
                const v = row[i + 1];
                return (
                  <td
                    key={i}
                    className="text-center tabular-nums"
                    style={{ background: v === undefined ? "transparent" : heatColor(v) }}
                    title={v === undefined ? "" : LABEL[phase(v)]}
                  >
                    {v === undefined ? "" : v.toFixed(1)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
