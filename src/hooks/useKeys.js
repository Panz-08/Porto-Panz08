import { useEffect, useRef, useSyncExternalStore } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* [BARU] Hook keyboard bersama. Dulu tiap halaman memasang & melepas listener
 * sendiri setiap state berubah. Sekarang handler disimpan di ref, jadi
 * listener cukup dipasang SEKALI per halaman. */
export function useKeys(handler) {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    const onKey = (e) => ref.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/* [BARU] Deteksi layar kecil lewat matchMedia (tanpa polling resize). */
export function useMedia(query) {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(query); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/* [BARU] Tombol/Esc "kembali". Dulu navigate(-1) saja → kalau pengunjung
 * membuka langsung /about lalu menekan back, dia keluar dari situsmu.
 * Sekarang: kalau tidak ada riwayat dalam situs, pulang ke menu utama. */
export function useGoBack() {
  const navigate = useNavigate();
  const { key } = useLocation();
  return () => (key !== "default" ? navigate(-1) : navigate("/"));
}
