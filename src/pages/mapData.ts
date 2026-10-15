import type { Project } from "./mapTypes";

export const PROJECTS: Project[] = [
  {
    id: "transit", caseNo: "01", name: "ADAPTIVE TRANSIT", zone: "DOWNTOWN",
    x: 500, y: 390, rotation: -3, status: "PUBLISHED · MAY 2026",
    description: "A routing engine for informal bus networks where routes don't rely on fixed stops. Modeled routes as continuous polylines with sparse multigraph + state-based A* search. Offline-first mobile client.",
    tools: ["TypeScript", "Fastify", "PostGIS", "Python", "React Native", "A*"],
  },
  {
    id: "drhero", caseNo: "02", name: "DR. HERO", zone: "UNIVERSITY",
    x: 600, y: 175, rotation: 3, status: "LIVE · EDTECH",
    description: "Production learning platform with video lessons, quizzes, progress tracking, and instructor dashboards. Currently in active use.",
    tools: ["Next.js", "TypeScript", "HLS", "PostgreSQL"],
  },
  {
    id: "damascus", caseNo: "03", name: "DAMASCUS VISION", zone: "OLD QUARTER",
    x: 150, y: 210, rotation: 5, status: "LIVE · CIVIC",
    description: "Civic social-survey platform for publishing customizable public surveys and collecting citizen feedback. Includes an admin-managed experts page for moderated discussions.",
    tools: ["React", "Express.js", "PostgreSQL"],
  },
  {
    id: "meddit", caseNo: "04", name: "MEDDIT", zone: "HARBOR",
    x: 1040, y: 515, rotation: -5, status: "HACKATHON WINNER · 2025",
    description: "Winning project of the Syrian Hackathon 2025. Backend developer — FastAPI services and a WebSocket-based chat for real-time patient–doctor communication.",
    tools: ["FastAPI", "WebSockets", "Python", "Agile"], winner: true,
  },
  {
    id: "solution", caseNo: "05", name: "[ REDACTED ]", zone: "INDUSTRIAL",
    x: 205, y: 590, rotation: 2, status: "NDA · SEALED",
    description: "Full-stack engineering on enterprise-grade web applications. Details available upon request.",
    tools: ["React", "ASP.NET", "DevExpress", "Azure DevOps"], redacted: true,
  },
  {
    id: "icpc", caseNo: "06", name: "ICPC · STARTUP WKND", zone: "DOWNTOWN",
    x: 760, y: 630, rotation: -3, status: "COMPETITIONS",
    description: "Collegiate programming contests and 54-hour startup sprints. Algorithms under strict time. Cross-functional teams shipping MVPs from scratch.",
    tools: ["C++", "Python", "React", "Fastify"],
  },
  {
    id: "portfolio", caseNo: "07", name: "PORTFOLIO", zone: "ARCHIVE",
    x: 900, y: 300, rotation: 4, status: "PERSONAL · 2026",
    description: "A living archive of experiments, interfaces, and systems built from curiosity. The room, map, and case files are part of the work.",
    tools: ["React", "TypeScript", "CSS", "Motion"],
  },
];

export const STRINGS: Array<[string, string, number, "back" | "front"]> = [
  ["transit", "drhero", 45, "back"],
  ["transit", "damascus", 45, "front"],
  ["drhero", "portfolio", 38, "back"],
  ["meddit", "icpc", 28, "front"],
  ["damascus", "solution", 45, "back"],
  ["transit", "icpc", 38, "front"],
  ["transit", "portfolio", 34, "back"],
];

export function projectById(id: string): Project {
  const project = PROJECTS.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project id: ${id}`);
  return project;
}
