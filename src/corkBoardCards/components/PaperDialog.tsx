import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Paper } from "../data";
import { HOLD_DURATION_MS, SECRET_PAPER_ID } from "../data";
import Lighter from "./Lighter";

function DialogShell({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        className="paper-dialog-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="paper-dialog"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
      >
        <div className="dialog-backlight" />
        <div className="dialog-scene">{children}</div>
        <button
          className="paper-dialog-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="paper-dialog-stamp">FILE // REVEAL</div>
      </motion.div>
    </>
  );
}

export default function PaperDialog({
  paper,
  onClose,
  onReveal,
}: {
  paper: Paper;
  onClose: () => void;
  onReveal: () => void;
}) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const firedRef = useRef(false);
  const isSecret = paper.id === SECRET_PAPER_ID;

  useEffect(() => {
    const cancel = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };

    if (isOver) {
      const start = performance.now() - progressRef.current * HOLD_DURATION_MS;
      const tick = (now: number) => {
        const next = Math.min(1, (now - start) / HOLD_DURATION_MS);
        progressRef.current = next;
        setProgress(next);
        if (next >= 1) {
          if (!firedRef.current && isSecret) {
            firedRef.current = true;
            onReveal();
          }
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else if (progressRef.current > 0 && !firedRef.current) {
      const fade = () => {
        progressRef.current = Math.max(0, progressRef.current - 0.025);
        setProgress(progressRef.current);
        if (progressRef.current > 0)
          rafRef.current = requestAnimationFrame(fade);
      };
      rafRef.current = requestAnimationFrame(fade);
    }

    return cancel;
  }, [isOver, isSecret, onReveal]);

  const handleLighterDrag = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const rect = paperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const point =
      "clientX" in event
        ? { x: event.clientX, y: event.clientY }
        : "touches" in event && event.touches[0]
          ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
          : null;
    if (!point) return;
    setIsOver(
      point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom,
    );
  };

  const curlClass = paper.curl ? ` curl-${paper.curl}` : "";

  return (
    <DialogShell onClose={onClose}>
      <motion.div
        ref={paperRef}
        className={`held-paper paper-${paper.type}${curlClass}`}
        initial={{ opacity: 0, y: 20, rotate: -12 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 200,
          damping: 22,
        }}
      >
        <div className="held-paper-surface" />
        {paper.label && <div className="held-paper-label">{paper.label}</div>}
        {isSecret && (
          <div className="held-paper-secret" style={{ opacity: progress }}>
            <div className="secret-stamp">UV-REACTIVE INK</div>
            <p className="ink-caption">ADAPTIVE TRANSIT · CASE 001</p>
            <p className="ink-sub">Decrypting project archive…</p>
          </div>
        )}
        <div className="uv-wash" style={{ opacity: progress * 0.9 }} />
      </motion.div>
      <Lighter onDrag={handleLighterDrag} onDragEnd={() => setIsOver(false)} />
      <div className="lighter-hint">
        <span className="hint-dot" />
        <span className="hint-text">
          hold the flame over one of the papers on the board to get the secret
        </span>
      </div>
    </DialogShell>
  );
}
