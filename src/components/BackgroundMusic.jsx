import { useEffect, useRef, useState } from "react";

const KEY_ON = "p5-bgm-enabled";
const KEY_VOL = "p5-bgm-volume";
const DEFAULT_VOLUME = 0.45;
const FADE_MS = 450;

/* [BARU] localStorage dibungkus try/catch — di mode privat Safari bisa melempar error
 * dan dulu membuat seluruh aplikasi blank. */
const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* abaikan */ } };

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const raf = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const v = Number(read(KEY_VOL));
    return Number.isFinite(v) && read(KEY_VOL) !== null ? Math.min(1, Math.max(0, v)) : DEFAULT_VOLUME;
  });

  const fadeTo = (target, done) => {
    const a = audioRef.current; if (!a) return;
    cancelAnimationFrame(raf.current);
    const from = a.volume, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / FADE_MS);
      a.volume = Math.min(1, Math.max(0, from + (target - from) * p));
      if (p < 1) raf.current = requestAnimationFrame(tick); else done?.();
    };
    raf.current = requestAnimationFrame(tick);
  };

  const start = async () => {
    const a = audioRef.current; if (!a) return false;
    a.volume = 0;
    try { await a.play(); fadeTo(volume); setPlaying(true); return true; }
    catch { setPlaying(false); return false; }
  };
  const stop = () => fadeTo(0, () => { audioRef.current?.pause(); setPlaying(false); });

  useEffect(() => { // simpan & terapkan volume
    if (playing && audioRef.current) audioRef.current.volume = volume;
    write(KEY_VOL, String(volume));
  }, [volume, playing]);
  useEffect(() => { write(KEY_ON, playing ? "1" : "0"); }, [playing]);

  /* Browser melarang autoplay → kalau sebelumnya BGM ON, lanjutkan saat sentuhan pertama */
  useEffect(() => {
    if (read(KEY_ON) !== "1") return;
    const unlock = () => start();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* [BARU] Musik dijeda otomatis saat tab/aplikasi disembunyikan (hemat baterai & kuota),
   * dan dilanjutkan saat kembali. */
  useEffect(() => {
    let wasPlaying = false;
    const onVis = () => {
      const a = audioRef.current; if (!a) return;
      if (document.hidden) { wasPlaying = !a.paused; a.pause(); }
      else if (wasPlaying) a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => { document.removeEventListener("visibilitychange", onVis); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div className="bgm-panel">
      {/* preload="none": file MP3 baru diunduh saat tombol BGM ditekan (hemat kuota) */}
      <audio ref={audioRef} loop preload="none" src="/audio/background.mp3" />
      <button type="button" className={`bgm-toggle${playing ? " on" : ""}`}
        onClick={() => (playing ? stop() : start())}
        aria-pressed={playing} aria-label="Toggle background music">
        {playing ? "BGM ON" : "BGM OFF"}
      </button>
      <label className="bgm-slider-wrap">
        VOL
        <input className="bgm-slider" type="range" min="0" max="1" step="0.01" value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          onKeyDown={(e) => { if (e.key.startsWith("Arrow")) e.stopPropagation(); }} />
        <span>{Math.round(volume * 100)}</span>
      </label>
    </div>
  );
}
