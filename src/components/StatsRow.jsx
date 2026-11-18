import { LABEL, MONTHS, phase } from "../lib/enso.js";

const when = (d) => `${MONTHS[d.month - 1]} ${d.year}`;

export default function StatsRow({ rows, counts }) {
  const last = rows.length ? rows[rows.length - 1] : null;
  const peak = rows.length ? rows.reduce((a, b) => (b.oni > a.oni ? b : a)) : null;
  const trough = rows.length ? rows.reduce((a, b) => (b.oni < a.oni ? b : a)) : null;

  return (
    <div className="stats stats-vertical lg:stats-horizontal w-full shadow">
      <div className="stat">
        <div className="stat-title">Dernière valeur</div>
        <div className="stat-value">{last ? last.oni.toFixed(2) : "–"}</div>
        <div className="stat-desc">{last ? `${when(last)} · ${LABEL[phase(last.oni)]}` : ""}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Pic El Niño</div>
        <div className="stat-value text-error">{peak ? peak.oni.toFixed(2) : "–"}</div>
        <div className="stat-desc">{peak ? when(peak) : ""}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Creux La Niña</div>
        <div className="stat-value text-info">{trough ? trough.oni.toFixed(2) : "–"}</div>
        <div className="stat-desc">{trough ? when(trough) : ""}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Mois en phase</div>
        <div className="stat-value text-lg">
          <span className="text-error">{counts.elnino}</span> /{" "}
          <span className="text-info">{counts.lanina}</span> / {counts.neutre}
        </div>
        <div className="stat-desc">El Niño / La Niña / Neutre</div>
      </div>
    </div>
  );
}
