export default function RangeFilter({ min, max, from, to, onFrom, onTo }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body gap-3 py-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Début : <b>{from}</b></span>
            <input
              type="range"
              className="range range-sm"
              min={min}
              max={max}
              value={from}
              onChange={(e) => onFrom(Math.min(+e.target.value, to))}
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Fin : <b>{to}</b></span>
            <input
              type="range"
              className="range range-sm"
              min={min}
              max={max}
              value={to}
              onChange={(e) => onTo(Math.max(+e.target.value, from))}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
