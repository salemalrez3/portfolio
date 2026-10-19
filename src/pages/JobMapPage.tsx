import { useEffect, useRef, useState } from "react";
import "./JobMapPage.css";
import { MapNode } from "./MapNode";
import { PROJECTS, STRINGS, projectById } from "./mapData";
import type { Project } from "./mapTypes";
import { MapLandmarks } from "./MapLandmarks";
import { ProjectFolder } from "./ProjectFolder";
import { pinOf } from "./mapTypes";
import { playDiscoveryAha, playSound, setRainDucked } from "../audioManager";
export default function JobMapPage({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState<Project | null>(null);
  const [stamp, setStamp] = useState(false);
  const ndaTimer = useRef<number | null>(null);

  useEffect(() => {
    setRainDucked(true);
    return () => setRainDucked(false);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (ndaTimer.current !== null) window.clearTimeout(ndaTimer.current);
        setStamp(false);
        setActive(null);
      }
    };
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      if (ndaTimer.current !== null) window.clearTimeout(ndaTimer.current);
    };
  }, []);

  const open = (p: Project) => {
    playSound("dialog");
    playDiscoveryAha("projects");
    if (ndaTimer.current !== null) {
      window.clearTimeout(ndaTimer.current);
      ndaTimer.current = null;
    }
    if (p.redacted) {
      setActive(null);
      setStamp(true);
      ndaTimer.current = window.setTimeout(() => {
        setStamp(false);
        setActive(p);
        ndaTimer.current = null;
      }, 500);
      return;
    }
    setStamp(false);
    setActive(p);
  };

  return (
    <main className="map-page">
      <div className="map-lamp" />
      <div className="map-grain" />
      <div className="map-vignette" />

      <header className="map-header">
        <button className="map-back" onClick={onBack}>← RETURN TO ROOM</button>
        <div className="map-title"><span>CASE FILE // 001 · PROJECTS</span></div>
        <div className="map-active"><span className="map-dot" />ACTIVE</div>
      </header>

      <section className="map-stage" aria-label="Project map">
        <div className="map-paper">
          <svg
            viewBox="0 0 1200 700"
            role="img"
            aria-label="Connected project case files"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="aging-1" cx="22%" cy="28%" r="55%">
                <stop offset="0%" stopColor="rgba(140,100,45,0.20)" />
                <stop offset="100%" stopColor="rgba(140,100,45,0)" />
              </radialGradient>
              <radialGradient id="aging-2" cx="78%" cy="72%" r="60%">
                <stop offset="0%" stopColor="rgba(120,80,30,0.20)" />
                <stop offset="100%" stopColor="rgba(120,80,30,0)" />
              </radialGradient>
              <radialGradient id="aging-3" cx="50%" cy="100%" r="55%">
                <stop offset="0%" stopColor="rgba(80,50,10,0.26)" />
                <stop offset="100%" stopColor="rgba(80,50,10,0)" />
              </radialGradient>
              <linearGradient id="paper-base" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f0e4bf" />
                <stop offset="55%" stopColor="#dccfa2" />
                <stop offset="100%" stopColor="#c2b17d" />
              </linearGradient>
              <pattern id="grid-fine" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M25 0H0V25" fill="none" stroke="#5a3c14" strokeOpacity="0.06" strokeWidth="0.4" />
              </pattern>
              <pattern id="grid-bold" width="125" height="125" patternUnits="userSpaceOnUse">
                <path d="M125 0H0V125" fill="none" stroke="#5a3c14" strokeOpacity="0.12" strokeWidth="0.6" />
              </pattern>
              <pattern id="industrial-hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <path d="M0 0V18" stroke="#2d1a06" strokeOpacity="0.07" strokeWidth="1.4" />
              </pattern>
              <radialGradient id="pin-red" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#f08a8a" />
                <stop offset="55%" stopColor="#b83030" />
                <stop offset="100%" stopColor="#5a1010" />
              </radialGradient>
              <radialGradient id="pin-dark" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#6a6560" />
                <stop offset="55%" stopColor="#1a1815" />
                <stop offset="100%" stopColor="#0a0908" />
              </radialGradient>
              <radialGradient id="coffee-ring" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="rgba(140,90,30,0)" />
                <stop offset="88%" stopColor="rgba(140,90,30,0.30)" />
                <stop offset="100%" stopColor="rgba(140,90,30,0)" />
              </radialGradient>
            </defs>

            {/* paper */}
            <rect width="1200" height="700" fill="url(#paper-base)" />
            <rect width="1200" height="700" fill="url(#aging-1)" />
            <rect width="1200" height="700" fill="url(#aging-2)" />
            <rect width="1200" height="700" fill="url(#aging-3)" />
            <rect width="1200" height="700" fill="url(#grid-fine)" />
            <rect width="1200" height="700" fill="url(#grid-bold)" />

            {/* coffee stains */}
            <circle cx="1040" cy="140" r="48" fill="none" stroke="url(#coffee-ring)" strokeWidth="10" />
            <circle cx="120" cy="640" r="38" fill="none" stroke="url(#coffee-ring)" strokeWidth="8" />

            {/* roads */}
            <path d="M-40 300 C 200 250 260 380 460 320 S 720 240 1040 320"
              fill="none" stroke="rgba(120,90,40,0.22)" strokeWidth="5" />
            <path d="M-40 300 C 200 250 260 380 460 320 S 720 240 1040 320"
              fill="none" stroke="rgba(60,40,15,0.18)" strokeWidth="0.8" strokeDasharray="3 6" />
            <path d="M180 740 C 300 560 320 500 500 460 S 720 440 900 -40"
              fill="none" stroke="rgba(120,90,40,0.22)" strokeWidth="4" />
            <path d="M 380 -20 C 400 180 420 350 520 480 S 640 620 700 720"
              fill="none" stroke="rgba(120,90,40,0.14)" strokeWidth="3" />

            {/* contour rings — very faint */}
            <g fill="none" stroke="#a98946" strokeOpacity="0.22" strokeWidth="0.5" strokeDasharray="5 7">
              <ellipse cx="500" cy="360" rx="310" ry="210" />
              <ellipse cx="500" cy="360" rx="220" ry="150" />
            </g>

            {/* industrial zone */}
            <rect x="0" y="470" width="600" height="230" fill="url(#industrial-hatch)" />
            <path d="M0 470 H600 V700 H0 Z" fill="rgba(20,12,6,0.14)" />
            <path d="M0 470 H600" stroke="rgba(45,26,6,0.4)" strokeWidth="0.7" strokeDasharray="4 4" />

            {/* districts */}
            <g className="districts">
              <text x="70" y="80">OLD QUARTER</text>
              <text x="740" y="70">UNIVERSITY</text>
              <text x="720" y="670">HARBOR</text>
              <text x="70" y="455">INDUSTRIAL</text>
              <text x="440" y="115">DOWNTOWN</text>
            </g>
            <path className="strike" d="M62 447 L 178 447" />

            {/* landmarks */}
            <MapLandmarks />

            {/* margin notes */}
            <g className="notes">
              <text x="855" y="605" transform="rotate(-6 855 605)">case closed →</text>
              <text x="820" y="640" transform="rotate(-3 820 640)">2026 · archive</text>
            </g>

            {/* compass + scale */}
            <g className="compass" transform="translate(1100 130)">
              <circle r="26" fill="none" stroke="rgba(45,26,6,0.35)" strokeWidth="0.7" />
              <circle r="18" fill="none" stroke="rgba(45,26,6,0.22)" strokeWidth="0.5" />
              <path d="M0 -18 L3 0 L0 18 L-3 0 Z" fill="rgba(45,26,6,0.55)" />
              <path d="M-18 0 L0 -3 L18 0 L0 3 Z" fill="rgba(139,30,30,0.6)" />
              <text y="-32" textAnchor="middle">N</text>
            </g>

            <g className="scale-bar" transform="translate(1000 685)">
              <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(45,26,6,0.5)" strokeWidth="0.8" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(45,26,6,0.5)" strokeWidth="0.8" />
              <line x1="60" y1="-3" x2="60" y2="3" stroke="rgba(45,26,6,0.5)" strokeWidth="0.8" />
              <line x1="120" y1="-3" x2="120" y2="3" stroke="rgba(45,26,6,0.5)" strokeWidth="0.8" />
              <text x="0" y="14" textAnchor="middle">0</text>
              <text x="60" y="14" textAnchor="middle">5</text>
              <text x="120" y="14" textAnchor="middle">10 km</text>
            </g>

            {/* strings back */}
            <g className="strings">
              {STRINGS.filter((s) => s[3] === "back").map(([from, to, sag], i) => {
                const a = pinOf(projectById(from));
                const b = pinOf(projectById(to));
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2 + sag;
                return <path key={`b-${i}`} d={`M${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`} />;
              })}
            </g>

            {/* nodes */}
            {PROJECTS.map((p) => (
              <MapNode
                key={p.id}
                project={p}
                active={active?.id === p.id}
                onClick={() => open(p)}
              />
            ))}

            {/* strings front */}
            <g className="strings">
              {STRINGS.filter((s) => s[3] === "front").map(([from, to, sag], i) => {
                const a = pinOf(projectById(from));
                const b = pinOf(projectById(to));
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2 + sag;
                return <path key={`f-${i}`} d={`M${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`} />;
              })}
            </g>
          </svg>

          <div className="map-curl" />
        </div>
      </section>

      <footer className="map-footer">
        <span>STAMP · DECLASSIFIED</span>
        <span>NODES · 07</span>
        <span>LAST UPDATED · MAY 2026</span>
      </footer>

      {stamp && <div className="nda-stamp" aria-hidden="true">[ REDACTED ]</div>}
      {active && <ProjectFolder project={active} onClose={() => setActive(null)} />}
    </main>
  );
}
