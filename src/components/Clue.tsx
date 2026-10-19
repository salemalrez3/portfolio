import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./clue.css";
import { playSound, setRainDucked } from "../audioManager";

export default function Clue() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setRainDucked(true);
    return () => setRainDucked(false);
  }, [isOpen]);

  const open = () => {
    playSound("dialog");
    setIsOpen(true);
  };

  return (
    <>
      <button className="age-clue" onClick={open} aria-label="Open time clue" />
      <AnimatePresence>
        {isOpen && (
          <div className="clue-dialog-layer">
            <motion.div className="clue-dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} />
            <motion.div className="clue-paper" role="dialog" aria-label="Time clue" aria-modal="true" initial={{ opacity: 0, scale: 0.8, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: -3 }} exit={{ opacity: 0, scale: 0.8, rotate: 5 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
              <span className="clue-paper-time">20:05</span>
              <button className="clue-dialog-close" onClick={() => setIsOpen(false)} aria-label="Close time clue">✕</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
