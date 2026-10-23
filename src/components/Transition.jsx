import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { playSelectSound } from "../utils/audio.js";

/* Membungkus halaman: strip CSS menyapu + konten fade-in (lihat base.css).
 * `key={pathname}` membuat animasi diputar ulang di setiap pindah halaman. */
export default function Transition({ children }) {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; } // jangan bunyi saat load pertama
    playSelectSound();
  }, [pathname]);
  return (
    <>
      <div className="wipe" key={`w${pathname}`} aria-hidden="true"><i /><i /><i /></div>
      <div className="page-enter" key={pathname}>{children}</div>
    </>
  );
}
