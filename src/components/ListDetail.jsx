import { useState } from "react";
import { playSelectSound } from "../utils/audio.js";
import { useKeys, useGoBack, useMedia } from "../hooks/useKeys.js";
import BackButton from "./BackButton.jsx";
import "../styles/list.css";

/* [BARU] Layout "kartu + panel detail" yang dipakai Resume DAN Side Projects.
 * Dulu kedua halaman punya CSS & logika sendiri-sendiri (±700 baris, duplikat).
 * Layar lebar  : kartu di kiri, panel detail di kanan.
 * Layar sempit : panel detail muncul tepat di bawah kartu yang dipilih (akordeon). */
export default function ListDetail({ title, items, onEnter }) {
  const [active, setActive] = useState(0);
  const goBack = useGoBack();
  const narrow = useMedia("(max-width: 820px)");

  const select = (i) => { if (i !== active) { setActive(i); playSelectSound(); } };

  useKeys((e) => {
    if (e.key === "ArrowUp") select(Math.max(0, active - 1));
    else if (e.key === "ArrowDown") select(Math.min(items.length - 1, active + 1));
    else if (e.key === "Enter") onEnter?.(items[active]);
    else if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") goBack();
  });

  return (
    <main className="page ld">
      <BackButton />
      <div className="ld-left">
        <h1 className="page-title">{title}</h1>
        <ul className="ld-list">
          {items.map((it, i) => (
            <li key={it.title} className={`ld-item${i === active ? " active" : ""}`} style={{ "--i": i }}>
              <button type="button" className="ld-card" aria-expanded={i === active}
                onClick={() => select(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}>
                <span className="ld-badge"><b>{it.badge ?? i + 1}</b></span>
                <span className="ld-title">{it.title}</span>
                {it.rank != null && <span className="ld-rank">RANK <b>{it.rank}</b></span>}
                <span className="ld-sub">{it.subtitle}</span>
              </button>
              {narrow && i === active && <section className="ld-detail">{it.detail}</section>}
            </li>
          ))}
        </ul>
      </div>
      {!narrow && <section className="ld-detail side" key={active}>{items[active].detail}</section>}
    </main>
  );
}
