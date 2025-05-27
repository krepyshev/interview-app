import { useState, useMemo } from "react";
import styles from "./RiskManager.module.scss";

const percentSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function RiskManager() {
  /* -------- inputs -------- */
  const [equity, setEquity] = useState(0);
  const [entry, setEntry] = useState(0);
  const [stop, setStop] = useState(0);
  const [lev, setLev] = useState(20);

  /* -------- calculations -------- */
  const delta = Math.abs(entry - stop);

  const rows = useMemo(() => {
    if (!equity || !delta) return [];
    return percentSteps.map((pct) => {
      const riskUSDT = +((equity * pct) / 100).toFixed(2);
      const qty = +(riskUSDT / delta).toFixed(2);
      const notional = +(qty * entry).toFixed(2);
      const marginReq = +(notional / lev).toFixed(2);
      return { pct, riskUSDT, qty, notional, marginReq };
    });
  }, [equity, entry, lev, delta]);

  /* -------- UI -------- */
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Crypto&nbsp;Risk-Manager</h1>

      <div className={styles.grid}>
        <label className={styles.field}>
          Equity&nbsp;(USDT)
          <input
            type="number"
            value={equity || ""}
            onChange={(e) => setEquity(+e.target.value)}
          />
        </label>

        <label className={styles.field}>
          Leverage&nbsp;(×)
          <input
            type="number"
            min={1}
            value={lev}
            onChange={(e) => setLev(+e.target.value)}
          />
        </label>

        <label className={styles.field}>
          Entry&nbsp;Price
          <input
            type="number"
            value={entry || ""}
            onChange={(e) => setEntry(+e.target.value)}
          />
        </label>

        <label className={styles.field}>
          Stop&nbsp;Price
          <input
            type="number"
            value={stop || ""}
            onChange={(e) => setStop(+e.target.value)}
          />
        </label>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>% Risk</th>
              <th>USDT&nbsp;Risk</th>
              <th>Qty</th>
              <th>Notional&nbsp;$</th>
              <th>Margin&nbsp;$</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.pct}>
                <td>{r.pct}%</td>
                <td>{r.riskUSDT}</td>
                <td>{r.qty}</td>
                <td>{r.notional}</td>
                <td>{r.marginReq}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
