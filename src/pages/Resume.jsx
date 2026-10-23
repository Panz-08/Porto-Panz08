import { RESUME } from "../data/profile.js";
import ListDetail from "../components/ListDetail.jsx";

/* [UBAH] Dulu hanya kartu EDUCATION yang punya panel detail; 3 kartu lain kosong.
 * Sekarang semua kartu punya detail — isinya diedit di data/profile.js (RESUME). */
const items = RESUME.map((r) => ({
  ...r,
  detail: (
    <>
      <div className="dt-top"><span>{r.badge}</span><span>{r.title} LOG</span><span>{r.rows.length}/{r.rows.length}</span></div>
      <div className="dt-rows">
        {r.rows.map(([no, name, status]) => (
          <div className="dt-row" key={no}><span>{no}</span><span>{name}</span><span className="dt-status">{status}</span></div>
        ))}
      </div>
      <div className="dt-bullets">
        <h3>DETAILS</h3>
        {r.bullets.map((b) => <p key={b}>- {b}</p>)}
      </div>
    </>
  ),
}));

export default function Resume() {
  return <ListDetail title="LIST" items={items} />;
}
