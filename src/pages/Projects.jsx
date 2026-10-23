import { PROJECTS } from "../data/profile.js";
import ListDetail from "../components/ListDetail.jsx";

const items = PROJECTS.map((p) => ({
  title: p.title,
  subtitle: p.stack,
  href: p.href,
  detail: (
    <>
      <span className="dt-tag">{p.stack}</span>
      <h2 className="dt-title">{p.title}</h2>
      <p className="dt-summary">{p.summary}</p>
      {/* [UBAH] Dulu klik kartu langsung membuka link (tanpa sempat membaca deskripsi). Sekarang ada tombol jelas. */}
      <a className="dt-link" href={p.href} target="_blank" rel="noopener noreferrer">OPEN ↗ {p.href.replace("https://", "")}</a>
    </>
  ),
}));

export default function Projects() {
  return <ListDetail title="PROJECT LOG" items={items} onEnter={(it) => window.open(it.href, "_blank", "noopener,noreferrer")} />;
}
