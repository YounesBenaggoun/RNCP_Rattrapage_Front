import { useState, useMemo, useEffect } from "react";

import Navbar from "./composants/Navbar.jsx";
import RangeFilter from "./composants/RangeFilter.jsx";

import { phase, makeDemo, monthLabel } from "./lib/enso.js";

function App() {

  const [theme, setTheme] = useState("light");

  const res = phase();
  console.log(res);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);



  return (
    <>
      <Navbar theme={theme} onTheme={setTheme} />
      <RangeFilter min={1900} max={maxY} from={2026} to={to} onFrom={setFrom} onTo={setTo} />


    </>
  )
}

export default App
