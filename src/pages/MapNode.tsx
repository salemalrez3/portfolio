import type { KeyboardEvent } from "react";
import type { Project } from "./mapTypes";
import { playSound } from "../audioManager";
import { pinOf } from "./mapTypes";

type MapNodeProps = {
  project: Project;
  active: boolean;
  onClick: () => void;
};

export function MapNode({ project, active, onClick }: MapNodeProps) {
  const position = pinOf(project);
  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") onClick();
  };

  return (
    <g
      className={"node " + (project.redacted ? "node-redacted " : "") + (active ? "is-active" : "")}
      transform={`translate(${position.x - 75} ${position.y + 6}) rotate(${project.rotation} 75 0)`}
      onClick={() => {
        playSound("paper");
        onClick();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <rect className="node-shadow" x="4" y="6" width="150" height="88" rx="1" />
      <rect className="node-paper" x="0" y="0" width="150" height="88" rx="1" />
      <line className="node-rule" x1="10" y1="30" x2="140" y2="30" />
      <text className="node-case" x="10" y="20">CASE {project.caseNo}</text>
      <text className="node-name" x="10" y="54">{project.name}</text>
      <text className="node-status" x="10" y="76">{project.status}</text>

      {project.winner && (
        <g className="node-ribbon">
          <rect x="106" y="-11" width="52" height="14" rx="1" />
          <text x="132" y="-1">WINNER</text>
        </g>
      )}

      <g className="node-pin" transform="translate(75 0)">
        <ellipse className="pin-shadow" cx="0" cy="1" rx="8" ry="2.5" />
        <circle className="pin-head" cx="0" cy="-4" r="7" />
        <circle className="pin-glint" cx="-2" cy="-6" r="1.8" />
      </g>
    </g>
  );
}
