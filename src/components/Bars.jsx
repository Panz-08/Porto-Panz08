import char1 from "../assets/char1.webp";
import char2 from "../assets/char2.webp";
import char3 from "../assets/char3.webp";
import "../styles/bars.css";

const CHARS = [char1, char2, char3];

/* [BARU] Komponen bar bersama untuk About & Socials.
 * Dulu kedua halaman menyalin ±300 baris CSS & JSX yang hampir identik. */
export default function Bars({ items, active, onHover, onPick, extra }) {
  return (
    <ul className="bars">
      {items.map((it, i) => (
        <li key={it.id} className={`bar${i === active ? " active" : ""}`} style={{ "--i": i }}>
          <button type="button" className="bar-btn" aria-current={i === active}
            onClick={() => onPick(i)}
            onPointerEnter={(e) => e.pointerType === "mouse" && onHover(i)}
            onFocus={() => onHover(i)}>
            {/* [UBAH] PNG 1601px (±100 KB) → WebP 480px (2–7 KB); lazy + async decode */}
            <img className="bar-char" src={CHARS[i % CHARS.length]} alt="" width="480" height="205" loading="lazy" decoding="async" />
            <span className="bar-fill" />
            {extra?.left && <span className="bar-role">{extra.left(it)}</span>}
            <span className="bar-label">{it.label}</span>
            {extra?.right && <span className="bar-stats">{extra.right(it)}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}
