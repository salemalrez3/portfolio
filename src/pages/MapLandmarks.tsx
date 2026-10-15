import { projectById } from './mapData';
import type { Project } from './mapTypes';

const LANDMARK_RISE = 118;
const LANDMARK_SCALE = 0.72;
const positionOf = (id: Project['id']) => {
  const project = projectById(id);
  return { x: project.x, y: project.y - LANDMARK_RISE };
};

export function MapLandmarks() {
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
      <g transform={`translate(${oldQuarter.x} ${oldQuarter.y}) scale(${LANDMARK_SCALE})`}>
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
      <g transform={`translate(${university.x} ${university.y}) scale(${LANDMARK_SCALE})`}>
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
      <g className="landmark-skyline" transform={`translate(${downtown.x} ${downtown.y}) scale(${LANDMARK_SCALE})`}>
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
      <g className="landmark-ship" transform={`translate(${competition.x} ${competition.y}) scale(${LANDMARK_SCALE})`}>
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
      <g className="landmark-metro" transform={`translate(${downtown.x} ${downtown.y}) scale(${LANDMARK_SCALE})`}>
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
      <g className="landmark-hospital" transform={`translate(${harbor.x} ${harbor.y}) scale(${LANDMARK_SCALE})`}>
        <path d="M -58 78 V 4 H 58 V 78 Z" />
        <path d="M -18 4 V -18 H 18 V 4" />
        <path d="M -8 -18 V -42 M -20 -30 H 4" strokeWidth="3" />
        <path d="M -42 22 H -24 V 40 H -42 Z M -10 22 H 8 V 40 H -10 Z M 22 22 H 40 V 40 H 22 Z" />
        <path d="M -42 52 H -24 V 70 H -42 Z M 22 52 H 40 V 70 H 22 Z" />
        <path d="M -10 78 V 52 Q 0 42 10 52 V 78" />
        <path d="M -72 78 H 72" />
      </g>

      {/* ============ PORTFOLIO — detective office ============ */}
      <g className="landmark-portfolio" transform={`translate(${portfolio.x} ${portfolio.y}) scale(${LANDMARK_SCALE})`}>
        {/* office window and blinds */}
        <path d="M -58 12 H 58 V 58 H -58 Z" />
        <path d="M -52 22 H 52 M -52 32 H 52 M -52 42 H 52" strokeWidth="0.7" />
        {/* detective desk */}
        <path d="M -76 58 H 76 L 64 76 H -64 Z" />
        <path d="M -54 76 V 88 M 54 76 V 88" />
        {/* desk lamp */}
        <path d="M 18 58 V 20 L 4 10 H 32 L 18 20" />
        <path d="M 4 10 H 32" strokeWidth="2" />
        {/* evidence board with pinned notes */}
        <path d="M -42 48 V -28 H -4 V 48" />
        <path d="M -34 -16 H -12 M -34 -2 H -12 M -34 12 H -12" strokeWidth="0.6" />
        <circle cx="-28" cy="-22" r="2" />
        <circle cx="-18" cy="6" r="2" />
        <path d="M -28 -22 L -18 6" strokeWidth="0.5" />
        <path d="M -72 88 H 72" />
      </g>

      {/* ============ INDUSTRIAL — factory with smoke ============ */}
      <g className="landmark-dark" transform={`translate(${industrial.x} ${industrial.y}) scale(${LANDMARK_SCALE})`}>
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
