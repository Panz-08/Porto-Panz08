/* [UBAH] Dulu: setiap bunyi "select" membuat objek `new Audio()` baru (boros
 * memori & koneksi di HP). Sekarang: SATU elemen dipakai ulang, dibuat hanya
 * saat pertama kali dipakai, dan di-throttle supaya tidak spam. */
let sfx = null;
let last = 0;

export const playSelectSound = () => {
  const now = performance.now();
  if (now - last < 80) return;            // hindari bunyi ganda (mis. route + hover)
  last = now;
  if (!sfx) {
    sfx = new Audio("/audio/select.mp3");
    sfx.volume = 0.5;
  }
  sfx.currentTime = 0;
  sfx.play().catch(() => {});             // abaikan jika browser memblokir autoplay
};
