import { useState } from "react";
import { SOCIALS } from "../data/profile.js";
import { playSelectSound } from "../utils/audio.js";
import { useKeys, useGoBack } from "../hooks/useKeys.js";
import Bars from "../components/Bars.jsx";
import BackButton from "../components/BackButton.jsx";
import newsign from "../assets/newsign.webp";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import "../styles/socials.css";

const ICONS = [icon1, icon2, icon3];

/* mailto: dibuka lewat location (window.open("mailto:") membuka tab kosong) */
const openLink = (href) => (href.startsWith("mailto:") ? (window.location.href = href) : window.open(href, "_blank", "noopener,noreferrer"));

export default function Socials() {
  const [active, setActive] = useState(0);
  const goBack = useGoBack();
  const n = SOCIALS.length;
  const item = SOCIALS[active];

  const select = (i) => { if (i !== active) { setActive(i); playSelectSound(); } };
  /* HP: ketukan pertama memilih (menampilkan link di bawah), ketukan kedua membuka */
  const pick = (i) => (i === active ? openLink(item.links[0].href) : select(i));

  useKeys((e) => {
    const k = e.key.toLowerCase();
    if (k === "arrowup" || k === "w") select(Math.max(0, active - 1));
    else if (k === "arrowdown" || k === "s") select(Math.min(n - 1, active + 1));
    else if (k === "enter" && document.activeElement?.tagName !== "A") openLink(item.links[0].href);
    else if (k === "escape" || k === "backspace" || k === "arrowleft") goBack();
  });

  return (
    <main className="page socials">
      <BackButton />
      <h1 className="page-title">SOCIALS</h1>
      <div className="socials-grid">
        <Bars items={SOCIALS} active={active} onHover={select} onPick={pick}
          extra={{ left: (it) => it.role, right: (it) => it.stats.map(([t, v]) => <span key={t}>{t}<b>{v}</b></span>) }} />

        {/* [UBAH] Dulu posisi tiap link dihitung px absolut (top: 155 + i*52px) → rusak di layar kecil.
         * Sekarang grid biasa: di desktop di kanan, di HP di bawah bar. */}
        <ul className="info-list" key={item.id}>
          {item.links.map((l, i) => (
            <li key={l.href} style={{ "--i": i }}>
              <a className="info-bar" href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer">
                <img className="info-new" src={newsign} alt="NEW" width="110" height="55" loading="lazy" decoding="async" />
                <img className="info-icon" src={ICONS[active % 3]} alt="" width="49" height="21" />
                {/* [UBAH] Dulu teks dipotong .slice(0,10)+"..." → link tidak terbaca. Sekarang penuh, wrap otomatis */}
                <span className="info-text">{l.text}</span>
                <span className="info-tag">{l.tag}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="hint">
        <span className="hint-kbd"><kbd>W/S</kbd>SELECT</span>
        <span className="hint-kbd"><kbd>↵</kbd>OPEN</span>
        <span className="hint-touch">TAP TWICE TO OPEN</span>
      </div>
    </main>
  );
}
