import { useState, useMemo, useEffect } from "react";
import { useEnsoData } from "./hooks/useEnsoData.js";

import Navbar from "./components/Navbar.jsx";
import RangeFilter from "./components/RangeFilter.jsx";

import { phase, makeDemo, monthLabel } from "./lib/enso.js";

function App() {
  const { all, loading, demo } = useEnsoData();
  const [theme, setTheme] = useState("light");
  const [from, setFrom] = useState(1990);
  const [to, setTo] = useState(2025);
  const minY = all.length ? all[0].year : 1950;
  const maxY = all.length ? all[all.length - 1].year : 2025;
  console.log(all);
  console.log(loading);
  console.log(demo);

  const res = phase();
  console.log(res);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    if (all.length) {
      setFrom(Math.max(minY, maxY - 35));
      setTo(maxY);
    }
  }, [all.length, minY, maxY]);



  return (
    <>
      <Navbar theme={theme} onTheme={setTheme} />
      <RangeFilter min={minY} max={maxY} from={from} to={to} onFrom={setFrom} onTo={setTo} />


    </>
  )
}

export default App
