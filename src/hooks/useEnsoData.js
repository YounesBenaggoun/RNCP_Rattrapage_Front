import { useEffect, useMemo, useState } from "react";
import { API_URL, makeDemo } from "../lib/enso.js";

// Charge les données ENSO depuis l'API, avec repli sur des données de démo
export function useEnsoData() {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    fetch(API_URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setRaw)
      .catch(() => {
        setRaw(makeDemo());
        setDemo(true);
      })
      .finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  const all = useMemo(
    () =>
      raw
        .map((d) => ({ year: +d.year, month: +d.month, oni: +d.oni }))
        .sort((a, b) => a.year - b.year || a.month - b.month),
    [raw]
  );

  return { all, loading, demo };
}
