import { THEMES } from "../lib/enso.js";

// export default function Navbar({ theme, onTheme, rows }) {
export default function Navbar({ theme, onTheme }) {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 px-2 text-xl font-bold">🌊 ENSO El Nina / El Nino</div>
      <div className="flex-none gap-2">

        <select
          className="select select-sm"
          value={theme}
          onChange={(e) => onTheme(e.target.value)}
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
