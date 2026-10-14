export type Project = {
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

export function pinOf(project: Project) {
  return { x: project.x, y: project.y - 6 };
}
