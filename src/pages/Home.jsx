import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MENU, profile } from "../data/profile.js";
import { playSelectSound } from "../utils/audio.js";
import { useKeys } from "../hooks/useKeys.js";
import "../styles/home.css";

const KEY = "p5-menu-active";
const saved = () => { try { return Math.min(MENU.length - 1, Number(sessionStorage.getItem(KEY)) || 0); } catch { return 0; } };

export default function Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState(saved);
  const [ready, setReady] = useState(false);

  useEffect(() => { const t = setTimeout(() => setReady(true), 350); return () => clearTimeout(t); }, []);

  const select = (i) => {
    if (i === active) return;
    setActive(i);
    try { sessionStorage.setItem(KEY, i); } catch { /* abaikan */ }
    playSelectSound();
  };
  const open = (item) => (item.href ? window.open(item.href, "_blank", "noopener,noreferrer") : navigate(item.to));

  useKeys((e) => {
    if (e.key === "ArrowUp") select(Math.max(0, active - 1));
    if (e.key === "ArrowDown") select(Math.min(MENU.length - 1, active + 1));
    if (e.key === "Enter") open(MENU[active]);
  });

  return (
    <main className="page home">
      <h1 className="home-tag">{profile.nameTag.map((t) => <span key={t}>{t}</span>)}<span className="sr-only"> — Portfolio</span></h1>

      <nav className="home-menu" aria-label="Main menu">
        {MENU.map((item, i) => {
          /* link internal pakai <Link> (tanpa reload), link luar pakai <a target=_blank> */
          const props = item.href
            ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
            : { to: item.to };
          const Tag = item.href ? "a" : Link;
          return (
            <Tag key={item.id} {...props}
              className={`p5-row${i === active ? " active" : ""}${ready ? " ready" : ""}`}
              style={{ "--size": item.size, "--skew": `${item.skew}deg`, "--skewy": `${item.skewY}deg`, "--i": i }}
              /* [UBAH] hover hanya untuk mouse; di layar sentuh "hover" palsu membuat menu perlu 2 ketukan */
              onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
              onFocus={() => select(i)}>
              <span className="p5-skew">
                <span className="p5-shadow" key={`s${i === active}`} />
                <span className="p5-hl" />
                <span className="p5-label">{item.label}</span>
              </span>
            </Tag>
          );
        })}
      </nav>

      <div className="hint">
        <span className="hint-kbd"><kbd>↑↓</kbd>NAVIGATE</span>
        <span className="hint-kbd"><kbd>↵</kbd>CONFIRM</span>
        <span className="hint-touch">TAP AN OPTION</span>
      </div>
    </main>
  );
}
