/* Profile Pengaturan Buat Edit Lebih Cepat Maintenance Dan Tidak Lupa */

export const profile = {
  name: "Alpanza Triadie",
  nameTag: ["Alpanza", "Triadie"],
  age: 18,
  location: "Indonesia",
  school: "SMK Putra Pakuan",
  major: "IT Network Engineer (TKJT)",
  github: "Panz-08",
  email: "astrapanz08@gmail.com",
  instagram: "panza_08",
};

/* MENU UTAMA — urutan & ukuran relatif tulisan (size 1 = terbesar).
 * Punya "to" = pindah halaman, punya "href" = buka link luar. */
export const MENU = [
  { id: "about",    label: "ABOUT ME",      to: "/about",    size: 1.0,  skew: -6,  skewY: 10 },
  { id: "resume",   label: "RESUME",        to: "/resume",   size: 0.82, skew: -11, skewY: -10 },
  { id: "github",   label: "GITHUB LINK",   href: `https://github.com/${profile.github}`, size: 0.84, skew: 0, skewY: -4 },
  { id: "socials",  label: "SOCIALS",       to: "/socials",  size: 0.92, skew: -3,  skewY: 5 },
  { id: "sideproj", label: "SIDE PROJECTS", to: "/sideproj", size: 0.72, skew: -4,  skewY: 7 },
];

/* HALAMAN ABOUT ME — 3 bar, tiap bar punya panel info saat diklik/ditap.
 * photo: null = tanpa foto. Kalau mau foto, taruh file di /public/images/
 *        lalu isi mis. "/images/me.webp" (aku nyaranin lebar ≤ 700px, .webp + dll) */
export const ABOUT = [
  { id: "me", label: "ABOUT ME", photo: null,
    upper: [`name: ${profile.name}`, `age: ${profile.age} years`, `location: ${profile.location}`],
    lower: `3rd year student - ${profile.major}` },
  { id: "edu", label: "EDUCATION", photo: null,
    upper: [`I study at ${profile.school},`, "taking the technical course in computer network."],
    lower: "PHP | Java | JavaScript | Web Dev | Game Dev" },
  { id: "focus", label: "FOCUS", photo: null,
    upper: ["Focused in backend development", "Driven by cognition."],
    lower: `github: github.com/${profile.github.toLowerCase()}` },
];

/* HALAMAN RESUME — 4 kartu; rows = [no, judul, status]; bullets = poin. */
export const RESUME = [
  { badge: "I", title: "EDUCATION", subtitle: `${profile.school} / TKJT`, rank: 1,
    rows: [["01", profile.school, "3rd Yr"], ["02", "IT Network Engineer", "Active"], ["03", "PHP + JavaScript", "Learning"], ["04", "Backend Practice", "Daily"]],
    bullets: ["Born to backend.", "Focus: PHP and JavaScript."] },
  { badge: "II", title: "SKILLS", subtitle: "PHP / Java / JavaScript / Networking", rank: 2,
    rows: [["01", "PHP", "Backend"], ["02", "Java", "OOP"], ["03", "JavaScript", "Web"], ["04", "VLAN / Routing", "Network"]],
    bullets: ["Logic & problem solving.", "Basic network configuration."] },
  { badge: "III", title: "PROJECTS", subtitle: "Web / Game Dev / Network", rank: 3,
    rows: [["01", "Web Development", "Active"], ["02", "Game Development", "Hobby"], ["03", "Network Lab", "School"]],
    bullets: ["See SIDE PROJECTS for the full list."] },
  { badge: "IV", title: "FOCUS", subtitle: "Network Engineer / Backend", rank: 4,
    rows: [["01", "Network Engineer", "Goal"], ["02", "Backend Developer", "Goal"], ["03", "Frontend", "Learning"]],
    bullets: ["Always learning, always building."] },
];

/* SIDE PROJECTS Bisa Ditambahkan */
export const PROJECTS = [
  { title: "PORTFOLIO SITE", stack: "React", summary: "This Persona 5 themed portfolio website.", href: `https://github.com/Panz-08/Porto-Panz08` },
  { title: "Static Web School", stack: "Static Web", summary: "IDK", href: `https://github.com/Panz-08/Web-Sekolah` },
  { title: "PORTO SIMPLE", stack: "TypeScript", summary: "Porto simple", href: `https://github.com/Panz-08/Porto-Simple` },
  { title: "Web Game Strategy", stack: "Game Development", summary: "Web-Based Game Strategy In Web", href: `https://github.com/Panz-08/Web-Based-Strategy-Game` },
];

/* SOCIALS — 3 bar; "links" = tautan di panel kanan. */
export const SOCIALS = [
  { id: "github", label: "GITHUB", role: "LEADER", handle: `@${profile.github}`,
    stats: [["USR", profile.github], ["TOP", "PROJECTS"]],
    links: [{ text: `github.com/${profile.github}`, tag: "REPOS", href: `https://github.com/${profile.github}?tab=repositories` }] },
  { id: "instagram", label: "INSTAGRAM", role: "PARTY", handle: `@${profile.instagram}`,
    stats: [["SOCIAL", "PICS"], ["MIND", "LIFE"]],
    links: [{ text: `instagram.com/${profile.instagram}`, tag: "POSTS", href: `https://instagram.com/${profile.instagram}` }] },
  { id: "email", label: "EMAIL", role: "PARTY", handle: profile.email,
    stats: [["CONTACT", "DIRECT"], ["TALK", "WORK"]],
    links: [{ text: profile.email, tag: "INBOX", href: `mailto:${profile.email}` }] },
];
