import type { JSX } from "react/jsx-runtime";
import type { CassetteSigil as SigilId } from "./cassettes";

export function CassetteSigil({
  sigil,
  size = 20,
}: {
  sigil: SigilId;
  size?: number;
}) {
  const paths: Record<SigilId, JSX.Element> = {
    grid: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
      </>
    ),
    triangle: <path d="M12 3.5 L20.5 20 L3.5 20 Z" />,
    circle: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
      </>
    ),
    cross: (
      <>
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </>
    ),
    wave: (
      <>
        <path d="M3 10 Q 7.5 6 12 10 T 21 10" />
        <path d="M3 15 Q 7.5 11 12 15 T 21 15" />
      </>
    ),
    star: (
      <polygon points="12 3 14.6 10 22 10 16 14.4 18.3 21.5 12 17.3 5.7 21.5 8 14.4 2 10 9.4 10" />
    ),
    heart: (
      <path d="M12 20.5s-7-5-7-10.8a3.9 3.9 0 0 1 7-2.5 3.9 3.9 0 0 1 7 2.5c0 5.8-7 10.8-7 10.8Z" />
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[sigil]}
    </svg>
  );
}