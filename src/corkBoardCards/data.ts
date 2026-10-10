export type PaperType = "card" | "torn" | "photo" | "note" | "receipt";
export type CurlCorner = "br" | "bl" | "tr" | "tl" | null;

export type Paper = {
  id: string;
  label: string;
  detail: string;
  top: number;
  left: number;
  w: number;
  h: number;
  rot: number;
  type: PaperType;
  curl: CurlCorner;
};

export const SECRET_PAPER_ID = "p7";
export const HOLD_DURATION_MS = 1000;

export const PAPERS: Paper[] = [
  { id: "p1", label: "CASE 001", detail: "Full-stack engineering at Solution Soft Inc. Enterprise web apps. React, ASP.NET, DevExpress.", top: 6, left: 3, w: 40, h: 22, rot: -9, type: "card", curl: "br" },
  { id: "p2", label: "Secret", detail: "Adaptive Transit Navigation System — published May 2026 on ResearchGate.", top: 2, left: 42, w: 46, h: 20, rot: 7, type: "torn", curl: null },
  { id: "p3", label: "S@L3M", detail: "Dr. Hero — production learning platform with video lessons and instructor dashboards.", top: 22, left: 32, w: 30, h: 28, rot: -4, type: "photo", curl: null },
  { id: "p4", label: "EMPTY CARD", detail: "Damascus Vision — civic survey platform. Custom public surveys, citizen feedback.", top: 38, left: 4, w: 34, h: 18, rot: 14, type: "card", curl: "tl" },
  { id: "p5", label: "Invisible Ink", detail: "Meddit — Syrian Hackathon 2025 winner. FastAPI + WebSocket chat.", top: 42, left: 44, w: 42, h: 26, rot: -18, type: "note", curl: null },
  { id: "p6", label: "20:05", detail: "D.O.B. — 01 / 01 / 2005. Damascus.", top: 66, left: 10, w: 20, h: 22, rot: 9, type: "receipt", curl: null },
  { id: SECRET_PAPER_ID, label: "", detail: "", top: 68, left: 38, w: 46, h: 24, rot: -6, type: "torn", curl: null },
  { id: "p8", label: "SALEM", detail: "MHD Salem Alrez — ICT Engineer & Full-Stack Developer.", top: 26, left: 8, w: 24, h: 14, rot: -24, type: "card", curl: "bl" },
];

export const CONNECTIONS: Array<[string, string, "back" | "front"]> = [
  ["p1", "p2", "back"],
  ["p1", "p4", "front"],
  ["p2", "p5", "back"],
  ["p3", "p5", "back"],
  ["p4", "p6", "front"],
  ["p5", SECRET_PAPER_ID, "back"],
  ["p6", SECRET_PAPER_ID, "front"],
  ["p8", "p4", "back"],
];

export function findPaper(id: string) {
  return PAPERS.find((paper) => paper.id === id)!;
}
