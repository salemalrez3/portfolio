import { useEffect, useRef, useState } from "react";
import "./JobMapPage.css";
import { MapNode } from "./MapNode";

type Project = {
  id: string;
  caseNo: string;
  name: string;
  zone: string;
  x: number;
  y: number;
  rotation: number;
  status: string;
  description: string;
  tools: string[];
  redacted?: boolean;
  winner?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "transit", caseNo: "01", name: "ADAPTIVE TRANSIT", zone: "DOWNTOWN",
    x: 490, y: 380, rotation: -3,
    status: "PUBLISHED · MAY 2026",
    description:
      "A routing engine for informal bus networks where routes don't rely on fixed stops. Modeled routes as continuous polylines with sparse multigraph + state-based A* search. Offline-first mobile client.",
    tools: ["TypeScript", "Fastify", "PostGIS", "Python", "React Native", "A*"],
  },
  {
    id: "drhero", caseNo: "02", name: "DR. HERO", zone: "UNIVERSITY",
    x: 780, y: 180, rotation: 3,
    status: "LIVE · EDTECH",
    description:
      "Production learning platform with video lessons, quizzes, progress tracking, and instructor dashboards. Currently in active use.",
    tools: ["Next.js", "TypeScript", "HLS", "PostgreSQL"],
  },
  {
    id: "damascus", caseNo: "03", name: "DAMASCUS VISION", zone: "OLD QUARTER",
    x: 190, y: 200, rotation: 5,
    status: "LIVE · CIVIC",
    description:
      "Civic social-survey platform for publishing customizable public surveys and collecting citizen feedback. Includes an admin-managed experts page for moderated discussions.",
    tools: ["React", "Express.js", "PostgreSQL"],
  },
  {
    id: "meddit", caseNo: "04", name: "MEDDIT", zone: "HARBOR",
    x: 830, y: 500, rotation: -5,
    status: "HACKATHON WINNER · 2025",
    description:
      "Winning project of the Syrian Hackathon 2025. Backend developer — FastAPI services and a WebSocket-based chat for real-time patient–doctor communication.",
    tools: ["FastAPI", "WebSockets", "Python", "Agile"],
    winner: true,
  },
  {
    id: "solution", caseNo: "05", name: "[ REDACTED ]", zone: "INDUSTRIAL",
    x: 280, y: 570, rotation: 2,
    status: "NDA · SEALED",
    description:
      "Full-stack engineering on enterprise-grade web applications. Details available upon request.",
    tools: ["React", "ASP.NET", "DevExpress", "Azure DevOps"],
    redacted: true,
  },
  {
    id: "icpc", caseNo: "06", name: "ICPC · STARTUP WKND", zone: "DOWNTOWN",
    x: 640, y: 610, rotation: -3,
    status: "COMPETITIONS",
    description:
      "Collegiate programming contests and 54-hour startup sprints. Algorithms under strict time. Cross-functional teams shipping MVPs from scratch.",
    tools: ["C++", "Python", "React", "Fastify"],
  },
  {
    id: "portfolio", caseNo: "07", name: "PORTFOLIO", zone: "ARCHIVE",
    x: 820, y: 350, rotation: 4,
    status: "PERSONAL · 2026",
    description:
      "A living archive of experiments, interfaces, and systems built from curiosity. The room, map, and case files are part of the work.",
    tools: ["React", "TypeScript", "CSS", "Motion"],
  },
];

const STRINGS: Array<[string, string, number, "back" | "front"]> = [
  ["transit", "drhero",   80, "back"],
  ["transit", "damascus", 60, "front"],
  ["drhero",  "meddit",   90, "back"],
  ["meddit",  "icpc",     40, "front"],
  ["damascus","solution", 70, "back"],
  ["transit", "icpc",     60, "front"],
  ["transit", "portfolio", 55, "back"],
  ["portfolio", "icpc", 45, "front"],
];

const pinOf = (p: Project) => ({ x: p.x, y: p.y - 6 });
const LANDMARK_RISE = 175;
const positionOf = (id: Project["id"]) => {
  const project = PROJECTS.find((item) => item.id === id);
  if (!project) {
    throw new Error(`Unknown landmark project id: ${id}`);
  }
  return { x: project.x, y: project.y - LANDMARK_RISE };
};

/* ============================================================
   LANDMARK SILHOUETTES — each landmark is anchored to its project node
   ============================================================ */
function Landmarks() {
  const oldQuarter = positionOf("damascus");
  const university = positionOf("drhero");
  const downtown = positionOf("transit");
  const harbor = positionOf("meddit");
  const industrial = positionOf("solution");
  const competition = positionOf("icpc");
  const portfolio = positionOf("portfolio");

  return (
    <g className="landmarks">
      {/* ============ OLD QUARTER — mosque with minarets ============ */}
      <g transform={`translate(${oldQuarter.x} ${oldQuarter.y})`}>
        {/* main dome */}
        <path d="M -32 22 Q 0 -28 32 22" />
        <path d="M -32 22 L -38 30 L 38 30 L 32 22" />
        {/* finial + crescent */}
        <path d="M 0 -28 L 0 -42" />
        <circle cx="0" cy="-46" r="3" />
        {/* main body */}
        <path d="M -38 30 L -38 78 L 38 78 L 38 30" />
        {/* arch windows */}
        <path d="M -22 50 Q -22 42 -14 42 Q -6 42 -6 50 L -6 70 L -22 70 Z" />
        <path d="M 6 50 Q 6 42 14 42 Q 22 42 22 50 L 22 70 L 6 70 Z" />
        {/* door */}
        <path d="M -6 78 L -6 60 Q 0 54 6 60 L 6 78" />
        {/* left minaret */}
        <path d="M -58 12 L -58 82 L -46 82 L -46 12 Z" />
        <path d="M -60 12 L -44 12 L -52 2 Z" />
        <path d="M -52 2 L -52 -6" />
        <circle cx="-52" cy="-9" r="2" />
        {/* right minaret */}
        <path d="M 46 12 L 46 82 L 58 82 L 58 12 Z" />
        <path d="M 44 12 L 60 12 L 52 2 Z" />
        <path d="M 52 2 L 52 -6" />
        <circle cx="52" cy="-9" r="2" />
        {/* ground line */}
        <path d="M -75 82 L 75 82" />
        {/* hatching on base for shadow */}
        <path d="M -38 78 L -32 74 M -34 78 L -28 74 M -30 78 L -24 74" strokeWidth="0.5" />
      </g>

      {/* ============ UNIVERSITY — clock tower building ============ */}
      <g transform={`translate(${university.x} ${university.y})`}>
        {/* central tower */}
        <path d="M -14 78 L -14 10 L 14 10 L 14 78 Z" />
        {/* tower roof */}
        <path d="M -20 10 L 0 -12 L 20 10 Z" />
        <path d="M 0 -12 L 0 -22" />
        <circle cx="0" cy="-25" r="2" />
        {/* clock face */}
        <circle cx="0" cy="28" r="9" />
        <path d="M 0 28 L 0 22 M 0 28 L 5 28" strokeWidth="0.6" />
        {/* tower windows */}
        <path d="M -6 50 L 6 50 L 6 58 L -6 58 Z" />
        {/* left wing */}
        <path d="M -52 30 L -52 78 L -14 78" />
        <path d="M -52 30 L -14 30" />
        {/* pediment on wing */}
        <path d="M -52 30 L -46 20 L -20 20 L -14 30" />
        {/* left windows */}
        <path d="M -46 42 L -40 42 L -40 52 L -46 52 Z" />
        <path d="M -34 42 L -28 42 L -28 52 L -34 52 Z" />
        <path d="M -46 60 L -40 60 L -40 70 L -46 70 Z" />
        <path d="M -34 60 L -28 60 L -28 70 L -34 70 Z" />
        {/* right wing */}
        <path d="M 14 30 L 14 78 L 52 78 L 52 30 Z" />
        <path d="M 14 30 L 20 20 L 46 20 L 52 30" />
        <path d="M 20 42 L 26 42 L 26 52 L 20 52 Z" />
        <path d="M 32 42 L 38 42 L 38 52 L 32 52 Z" />
        <path d="M 20 60 L 26 60 L 26 70 L 20 70 Z" />
        <path d="M 32 60 L 38 60 L 38 70 L 32 70 Z" />
        {/* ground + steps */}
        <path d="M -70 78 L 70 78" />
        <path d="M -60 84 L 60 84" />
      </g>

      {/* ============ DOWNTOWN — skyline silhouette ============ */}
      <g className="landmark-skyline" transform={`translate(${downtown.x} ${downtown.y})`}>
        {/* building 1 */}
        <path d="M -60 78 L -60 30 L -40 30 L -40 78 Z" />
        <path d="M -60 30 L -50 20 L -40 30" />
        <path d="M -56 40 H -44 M -56 48 H -44 M -56 56 H -44 M -56 64 H -44 M -56 72 H -44" strokeWidth="0.5" />
        {/* building 2 — tallest, with antenna */}
        <path d="M -32 78 L -32 8 L 0 8 L 0 78 Z" />
        <path d="M -32 8 L -16 -8 L 0 8" />
        <path d="M -16 -8 L -16 -22" />
        <circle cx="-16" cy="-25" r="1.5" />
        <path d="M -28 20 H -4 M -28 30 H -4 M -28 40 H -4 M -28 50 H -4 M -28 60 H -4 M -28 70 H -4" strokeWidth="0.5" />
        {/* building 3 */}
        <path d="M 8 78 L 8 22 L 34 22 L 34 78 Z" />
        <path d="M 8 22 L 21 12 L 34 22" />
        <path d="M 12 34 H 30 M 12 44 H 30 M 12 54 H 30 M 12 64 H 30" strokeWidth="0.5" />
        {/* building 4 — shorter */}
        <path d="M 42 78 L 42 45 L 66 45 L 66 78 Z" />
        <path d="M 42 45 L 54 35 L 66 45" />
        <path d="M 46 55 H 62 M 46 65 H 62" strokeWidth="0.5" />
        {/* ground + city haze */}
        <path d="M -80 78 L 80 78" />
        {/* hatching for shadow */}
        <path d="M -60 78 L -55 73 M -55 78 L -50 73 M -50 78 L -45 73" strokeWidth="0.4" opacity="0.5" />
      </g>

      {/* ============ HARBOR — ship with lighthouse ============ */}
      <g className="landmark-ship" transform={`translate(${competition.x} ${competition.y})`}>
        {/* sailboat hull */}
        <path d="M -50 40 Q -40 52 -10 52 L 30 52 Q 42 52 50 40 L 40 40 L -40 40 Z" />
        {/* mast */}
        <path d="M -8 40 L -8 -20" />
        {/* main sail */}
        <path d="M -8 36 L -8 -14 Q 12 -6 16 30 L -8 36 Z" />
        {/* jib sail */}
        <path d="M -8 36 L -8 -10 Q -24 0 -28 30 Z" />
        {/* rigging */}
        <path d="M -8 -18 L 32 38" strokeWidth="0.5" />
        <path d="M -8 -18 L -44 40" strokeWidth="0.5" />
        {/* flag at top */}
        <path d="M -8 -20 L 8 -24 L -8 -28" />
        {/* water ripples */}
        <path d="M -70 60 Q -55 56 -40 60 T -10 60 T 20 60 T 50 60 T 80 60" strokeWidth="0.6" />
        <path d="M -60 68 Q -45 64 -30 68 T 0 68 T 30 68 T 60 68" strokeWidth="0.6" opacity="0.7" />
        <path d="M -50 76 Q -35 72 -20 76 T 10 76 T 40 76" strokeWidth="0.6" opacity="0.4" />
        {/* lighthouse on rock */}
        <path d="M 55 52 L 52 20 L 66 20 L 63 52 Z" />
        <path d="M 50 20 L 68 20 L 68 14 L 50 14 Z" />
        <path d="M 52 6 L 66 6 L 68 14 L 50 14 Z" />
        {/* lighthouse light beams */}
        <path d="M 59 6 L 45 -6" strokeWidth="0.5" opacity="0.6" />
        <path d="M 59 6 L 78 -6" strokeWidth="0.5" opacity="0.6" />
        {/* rock under lighthouse */}
        <path d="M 46 52 Q 59 46 74 52 L 76 60 L 44 60 Z" />
        {/* birds */}
        <path d="M -60 -10 Q -55 -14 -50 -10" strokeWidth="0.6" />
        <path d="M -52 -2 Q -47 -6 -42 -2" strokeWidth="0.6" />
      </g>

      {/* ============ TRANSIT — elevated metro station ============ */}
      <g className="landmark-metro" transform={`translate(${downtown.x} ${downtown.y})`}>
        <path d="M -82 22 H 82" />
        <path d="M -64 22 V 76 M 64 22 V 76" />
        <path d="M -78 76 H 78" />
        <path d="M -54 22 V 2 Q -54 -22 -30 -22 H 30 Q 54 -22 54 2 V 22 Z" />
        <path d="M -40 2 H 40 M -34 -10 H -20 M -10 -10 H 4 M 14 -10 H 28" strokeWidth="0.7" />
        <circle cx="-25" cy="10" r="2" />
        <circle cx="0" cy="10" r="2" />
        <circle cx="25" cy="10" r="2" />
        <path d="M -72 38 H 72" strokeDasharray="3 4" strokeWidth="0.6" />
      </g>

      {/* ============ MEDDIT — hospital ============ */}
      <g className="landmark-hospital" transform={`translate(${harbor.x} ${harbor.y})`}>
        <path d="M -58 78 V 4 H 58 V 78 Z" />
        <path d="M -18 4 V -18 H 18 V 4" />
        <path d="M -8 -18 V -42 M -20 -30 H 4" strokeWidth="3" />
        <path d="M -42 22 H -24 V 40 H -42 Z M -10 22 H 8 V 40 H -10 Z M 22 22 H 40 V 40 H 22 Z" />
        <path d="M -42 52 H -24 V 70 H -42 Z M 22 52 H 40 V 70 H 22 Z" />
        <path d="M -10 78 V 52 Q 0 42 10 52 V 78" />
        <path d="M -72 78 H 72" />
      </g>

      {/* ============ PORTFOLIO — desk archive ============ */}
      <g className="landmark-portfolio" transform={`translate(${portfolio.x} ${portfolio.y})`}>
        <path d="M -58 42 H 58 L 48 74 H -48 Z" />
        <path d="M -42 42 V 14 H 42 V 42" />
        <path d="M -30 14 V -6 H 30 V 14" />
        <path d="M -20 -6 V -30 H 20 V -6" />
        <circle cx="0" cy="-18" r="5" />
        <path d="M -68 78 H 68" />
      </g>

      {/* ============ INDUSTRIAL — factory with smoke ============ */}
      <g className="landmark-dark" transform={`translate(${industrial.x} ${industrial.y})`}>
        {/* main sawtooth building */}
        <path d="M -85 78 L -85 35 L -70 15 L -55 35 L -55 78 Z" />
        <path d="M -55 78 L -55 35 L -40 15 L -25 35 L -25 78 Z" />
        <path d="M -25 78 L -25 35 L -10 15 L 5 35 L 5 78 Z" />
        {/* sawtooth roof hatching (glass panels) */}
        <path d="M -82 38 L -73 22 M -78 38 L -69 22 M -74 38 L -65 22" strokeWidth="0.4" opacity="0.5" />
        <path d="M -52 38 L -43 22 M -48 38 L -39 22 M -44 38 L -35 22" strokeWidth="0.4" opacity="0.5" />
        <path d="M -22 38 L -13 22 M -18 38 L -9 22 M -14 38 L -5 22" strokeWidth="0.4" opacity="0.5" />
        {/* workshop extension */}
        <path d="M 5 78 L 5 50 L 60 50 L 60 78 Z" />
        <path d="M 5 50 L 15 42 L 60 42 L 60 50" />
        {/* workshop windows */}
        <path d="M 12 56 H 22 M 28 56 H 38 M 44 56 H 54" strokeWidth="0.5" />
        {/* industrial windows on main building */}
        <path d="M -78 48 H -62 M -78 58 H -62 M -78 68 H -62" strokeWidth="0.4" />
        <path d="M -48 48 H -32 M -48 58 H -32 M -48 68 H -32" strokeWidth="0.4" />
        <path d="M -18 48 H -2 M -18 58 H -2 M -18 68 H -2" strokeWidth="0.4" />
        {/* chimney 1 with smoke */}
        <path d="M -75 15 L -75 -35 L -65 -35 L -65 15" />
        <path d="M -70 -35 L -70 -45" strokeWidth="0.7" />
        <path d="M -78 -48 Q -70 -55 -62 -48 T -70 -36" strokeWidth="0.6" opacity="0.6" />
        <path d="M -82 -58 Q -72 -68 -60 -58" strokeWidth="0.5" opacity="0.4" />
        {/* chimney 2 */}
        <path d="M 15 42 L 15 -20 L 25 -20 L 25 42" />
        <path d="M 20 -20 L 20 -30" strokeWidth="0.7" />
        <path d="M 12 -32 Q 20 -40 28 -32 T 20 -22" strokeWidth="0.6" opacity="0.6" />
        <path d="M 8 -44 Q 20 -54 32 -44" strokeWidth="0.5" opacity="0.4" />
        {/* pipes */}
        <path d="M 5 60 L -5 60 L -5 45 L -25 45" strokeWidth="0.8" />
        <path d="M 60 62 L 68 62 L 68 78" strokeWidth="0.8" />
        {/* ground line */}
        <path d="M -100 78 L 80 78" />
        {/* shadow under building */}
        <path d="M -85 78 L -78 72 M -78 78 L -71 72 M -71 78 L -64 72" strokeWidth="0.4" opacity="0.5" />
      </g>
    </g>
  );
}
/* ============================================================
   FOLDER DIALOG
   ============================================================ */
function ProjectFolder({ project, onClose }: { project: Project; onClose: () => void }) {
  const redacted = project.redacted;
  return (
    <div
      className="folder-layer"
      role="presentation"
      onClick={onClose}
    >
      <aside
        className={`folder ${redacted ? "folder-classified" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* dangling red string */}
        <svg className="folder-string" viewBox="0 0 100 260" aria-hidden="true">
          <path d="M 78 8 Q 50 40 65 90 T 30 180 T 55 250" />
        </svg>

        {/* tab */}
        <div className="folder-tab">
          <span className="folder-tab-id">CASE {project.caseNo}</span>
          <span className="folder-tab-sep">·</span>
          <span className="folder-tab-name">
            {redacted ? "[ REDACTED ]" : project.name}
          </span>
        </div>

        <button className="folder-close" onClick={onClose} aria-label="Close folder">✕</button>

        {/* folder body */}
        <div className="folder-body">
          <div className="folder-document">
            <div className="doc-meta">
              <span>{project.zone}</span>
              <span>{project.status}</span>
            </div>

            <h2 className="doc-title">
              {redacted ? (
                <span className="doc-redact" title="Available upon request">REDACTED</span>
              ) : (
                project.name
              )}
            </h2>

            {redacted && (
              <div className="doc-classified">████████████ · NDA PROTECTED</div>
            )}

            {project.id === "transit" && (
              <svg className="doc-route" viewBox="0 0 440 90" aria-hidden="true">
                <path d="M20 70 Q 120 15 220 45 T 420 25" />
                <path d="M20 70 Q 120 15 220 45 T 420 25" strokeDasharray="3 5" className="doc-route-dash" />
                <circle cx="20" cy="70" r="4" />
                <circle cx="220" cy="45" r="4" />
                <circle cx="420" cy="25" r="4" />
                <circle cx="220" cy="45" r="8" className="doc-route-pulse" />
              </svg>
            )}

            <p className="doc-body">{project.description}</p>

            <div className="doc-tech">
              {project.tools.map((t) => (
                <span key={t} className="doc-tag">{t}</span>
              ))}
            </div>

            {redacted && (
              <div className="doc-redacted-lines">
                {["React", "ASP.NET", "DevExpress"].map((w) => (
                  <span key={w} className="doc-redacted-line"><b>{w}</b></span>
                ))}
              </div>
            )}

            <div className="doc-footer">
              <span className={`doc-stamp ${redacted ? "doc-stamp-red" : ""}`}>
                {redacted ? "CLASSIFIED · CLEARANCE REQUIRED" : "ARCHIVE · ACTIVE"}
              </span>
              {redacted && (
                <a className="doc-contact" href="mailto:salem.seraj@gmail.com">
                  → CONTACT FOR DETAILS
                </a>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function JobMapPage({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState<Project | null>(null);
  const [stamp, setStamp] = useState(false);
  const ndaTimer = useRef<number | null>(null);

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

  const byID = (id: string): Project => {
    const project = PROJECTS.find((item) => item.id === id);
    if (!project) {
      throw new Error(`Unknown project id: ${id}`);
    }
    return project;
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
            viewBox="0 0 1000 700"
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
            <rect width="1000" height="700" fill="url(#paper-base)" />
            <rect width="1000" height="700" fill="url(#aging-1)" />
            <rect width="1000" height="700" fill="url(#aging-2)" />
            <rect width="1000" height="700" fill="url(#aging-3)" />
            <rect width="1000" height="700" fill="url(#grid-fine)" />
            <rect width="1000" height="700" fill="url(#grid-bold)" />

            {/* coffee stains */}
            <circle cx="855" cy="140" r="48" fill="none" stroke="url(#coffee-ring)" strokeWidth="10" />
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
            <Landmarks />

            {/* margin notes */}
            <g className="notes">
              <text x="855" y="605" transform="rotate(-6 855 605)">case closed →</text>
              <text x="820" y="640" transform="rotate(-3 820 640)">2026 · archive</text>
            </g>

            {/* compass + scale */}
            <g className="compass" transform="translate(920 130)">
              <circle r="26" fill="none" stroke="rgba(45,26,6,0.35)" strokeWidth="0.7" />
              <circle r="18" fill="none" stroke="rgba(45,26,6,0.22)" strokeWidth="0.5" />
              <path d="M0 -18 L3 0 L0 18 L-3 0 Z" fill="rgba(45,26,6,0.55)" />
              <path d="M-18 0 L0 -3 L18 0 L0 3 Z" fill="rgba(139,30,30,0.6)" />
              <text y="-32" textAnchor="middle">N</text>
            </g>

            <g className="scale-bar" transform="translate(830 685)">
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
                const a = pinOf(byID(from));
                const b = pinOf(byID(to));
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
                const a = pinOf(byID(from));
                const b = pinOf(byID(to));
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