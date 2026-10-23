import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Transition from "./components/Transition.jsx";
import BackgroundMusic from "./components/BackgroundMusic.jsx";

/* [UBAH] Halaman selain Home di-lazy-load: kode & CSS-nya baru diunduh saat
 * dibuka → pembukaan pertama di HP jauh lebih ringan. */
const About = lazy(() => import("./pages/About.jsx"));
const Resume = lazy(() => import("./pages/Resume.jsx"));
const Socials = lazy(() => import("./pages/Socials.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));

export default function App() {
  const location = useLocation();
  return (
    <>
      {/* [UBAH] Background video diganti elemen CSS ringan (lihat base.css) */}
      <div className="site-bg" aria-hidden="true"><i /><i /><i /></div>
      <Transition>
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/sideproj" element={<Projects />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Transition>
      <BackgroundMusic />
    </>
  );
}
