// Ton API Express : GET /api/enso -> [{ year, month, oni }]
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/enso";

export const THEMES = ["light", "dark", "cupcake", "emerald", "synthwave", "night"];
export const COLORS = { elnino: "#ef4444", lanina: "#3b82f6", neutre: "#9ca3af" };
export const LABEL = { elnino: "El Niño", lanina: "La Niña", neutre: "Neutre" };
export const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

// Seuils NOAA : ONI >= 0,5 → El Niño, <= -0,5 → La Niña
export const phase = (v) => (v >= 0.5 ? "elnino" : v <= -0.5 ? "lanina" : "neutre");

export const monthLabel = (d) => `${d.year}-${String(d.month).padStart(2, "0")}`;

// Données de démo SYNTHÉTIQUES (pas des mesures réelles), utilisées si l'API est injoignable
export function makeDemo() {
  let seed = 42;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296) - 0.5;
  const out = [];
  let noise = 0;
  for (let y = 1950; y <= 2025; y++) {
    for (let m = 1; m <= 12; m++) {
      const t = (y - 1950) * 12 + m;
      noise = noise * 0.85 + rnd() * 0.45;
      const v =
        1.15 * Math.sin((2 * Math.PI * t) / 46) +
        0.6 * Math.sin((2 * Math.PI * t) / 78 + 1) +
        noise;
      out.push({ year: y, month: m, oni: Math.round(v * 100) / 100 });
    }
  }
  return out;
}

export function heatColor(v) {
  const a = Math.min(Math.abs(v) / 2.5, 1) * 0.85;
  return v >= 0 ? `rgba(239,68,68,${a})` : `rgba(59,130,246,${a})`;
}

export function downloadCsv(rows) {
  const csv =
    "year,month,oni,phase\n" +
    rows.map((r) => `${r.year},${r.month},${r.oni},${LABEL[phase(r.oni)]}`).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "enso.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}
