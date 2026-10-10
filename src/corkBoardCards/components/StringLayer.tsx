import { CONNECTIONS, findPaper } from "../data";

function pinOf(paper: ReturnType<typeof findPaper>) {
  return { x: paper.left + paper.w / 2, y: paper.top };
}

export default function StringLayer({
  className,
  layer,
}: {
  className: string;
  layer: "back" | "front";
}) {
  const lines = CONNECTIONS.filter((connection) => connection[2] === layer);

  return (
    <svg className={`strings ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      {lines.map(([from, to], index) => {
        const start = pinOf(findPaper(from));
        const end = pinOf(findPaper(to));
        return <line key={index} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
      })}
    </svg>
  );
}
