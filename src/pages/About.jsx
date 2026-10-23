import { useEffect, useRef, useState } from "react";
import { ABOUT } from "../data/profile.js";
import { playSelectSound } from "../utils/audio.js";
import { useKeys, useGoBack } from "../hooks/useKeys.js";
import Bars from "../components/Bars.jsx";
import BackButton from "../components/BackButton.jsx";
import "../styles/about.css";

export default function About() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const goBack = useGoBack();
  const closeRef = useRef(null);
  const n = ABOUT.length;

  const select = (i) => { if (i !== active) { setActive(i); playSelectSound(); } };
  const step = (d) => select((active + d + n) % n);

  /* [UBAH] Dulu panel info hanya bisa dibuka dengan Enter/→ (mouse & HP tidak bisa).
   * Sekarang klik/tap bar langsung membuka panel. */
  const pick = (i) => { select(i); setOpen(true); };

  useEffect(() => { if (open) closeRef.current?.focus(); }, [open]);

  useKeys((e) => {
    if (e.key === "ArrowUp") step(-1);
    else if (e.key === "ArrowDown") step(1);
    else if (e.key === "Enter" || e.key === "ArrowRight") setOpen(true);
    else if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") (open ? setOpen(false) : goBack());
  });

  const item = ABOUT[active];
  return (
    <main className="page about">
      <BackButton />
      <h1 className="page-title">ABOUT ME</h1>
      <Bars items={ABOUT} active={active} onHover={select} onPick={pick} />
      <div className="hint">
        <span className="hint-kbd"><kbd>↑↓</kbd>SELECT</span>
        <span className="hint-kbd"><kbd>↵</kbd>REVEAL</span>
        <span className="hint-touch">TAP A BAR</span>
      </div>

      {open && (
        <div className="reveal" role="dialog" aria-modal="true" aria-label={item.label} onClick={() => setOpen(false)}>
          {/* foto opsional: lihat ABOUT[].photo di data/profile.js */}
          {item.photo && <img className="reveal-photo" src={item.photo} alt="" loading="lazy" decoding="async" />}
          <div className="reveal-nav" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)} aria-label="Previous">◄ LB</button>
            <span>{item.label}</span>
            <button type="button" onClick={() => step(1)} aria-label="Next">RB ►</button>
          </div>
          <div className="reveal-card" key={item.id} onClick={(e) => e.stopPropagation()}>
            <div className="reveal-upper">
              {item.upper.map((l) => <p key={l}>{l}</p>)}
            </div>
            <div className="reveal-lower">{item.lower}</div>
          </div>
          <button ref={closeRef} type="button" className="reveal-close" onClick={() => setOpen(false)}>✕ CLOSE</button>
        </div>
      )}
    </main>
  );
}
