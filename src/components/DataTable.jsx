import { useEffect, useMemo, useState } from "react";
import { LABEL, MONTHS, phase } from "../lib/enso.js";

const PAGE = 12;
const BADGE = { elnino: "badge-error", lanina: "badge-info", neutre: "badge-ghost" };

export default function DataTable({ rows }) {
  const [phases, setPhases] = useState({ elnino: true, lanina: true, neutre: true });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () =>
      rows
        .filter((d) => phases[phase(d.oni)])
        .filter((d) => !search || String(d.year).includes(search.trim()))
        .reverse(),
    [rows, phases, search]
  );

  useEffect(() => setPage(0), [rows, phases, search]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const shown = filtered.slice(page * PAGE, page * PAGE + PAGE);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <input
          className="input input-sm input-bordered"
          placeholder="Filtrer par année…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {Object.keys(LABEL).map((k) => (
          <label key={k} className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={phases[k]}
              onChange={() => setPhases({ ...phases, [k]: !phases[k] })}
            />
            <span className="text-sm">{LABEL[k]}</span>
          </label>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr><th>Année</th><th>Mois</th><th>ONI</th><th>Phase</th></tr>
          </thead>
          <tbody>
            {shown.map((d) => (
              <tr key={`${d.year}-${d.month}`}>
                <td>{d.year}</td>
                <td>{MONTHS[d.month - 1]}</td>
                <td className="tabular-nums">{d.oni.toFixed(2)}</td>
                <td>
                  <span className={`badge ${BADGE[phase(d.oni)]}`}>{LABEL[phase(d.oni)]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="join">
        <button className="join-item btn btn-sm" disabled={page === 0} onClick={() => setPage(page - 1)}>«</button>
        <button className="join-item btn btn-sm">Page {page + 1} / {pages}</button>
        <button className="join-item btn btn-sm" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>»</button>
      </div>
    </div>
  );
}
