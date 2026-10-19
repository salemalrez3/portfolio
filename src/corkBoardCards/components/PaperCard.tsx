import type { Paper } from "../data";
import { playSound } from "../../audioManager";

export default function PaperCard({
  paper,
  onSelect,
}: {
  paper: Paper;
  onSelect: (paper: Paper) => void;
}) {
  const curlClass = paper.curl ? ` curl-${paper.curl}` : "";

  return (
    <button
      className={`paper paper-${paper.type}${curlClass}`}
      style={{
        top: `${paper.top}%`,
        left: `${paper.left}%`,
        width: `${paper.w}%`,
        height: `${paper.h}%`,
        transform: `rotate(${paper.rot}deg)`,
      }}
      onClick={() => {
        playSound("paper");
        onSelect(paper);
      }}
      aria-label={paper.label || "Open blank paper"}
    >
      <span className="paper-surface" />
      {paper.label && <span className="paper-label">{paper.label}</span>}
      <span className="paper-pin" />
    </button>
  );
}
