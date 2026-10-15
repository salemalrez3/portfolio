import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import EducationDashboard from "./EducationalDashboard";
import "./CabinetFolderPage.css";

export type CabinetFolder = {
  id: string;
  label: string;
  sub: string;
  rotate: number;
};

export default function EducationFolderPage({
  folder,
  onClose,
}: {
  folder: CabinetFolder;
  onClose: () => void;
}) {
  return createPortal(
    <motion.div
      className="edu-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="presentation"
    >
      <div className="edu-grain" aria-hidden />
      <div className="edu-vignette" aria-hidden />

      <motion.div
        className="edu-folder"
        initial={{ opacity: 0, y: 70, scale: 0.9, rotate: folder.rotate - 5 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: folder.rotate * 0.12 }}
        exit={{ opacity: 0, y: 50, scale: 0.92, rotate: folder.rotate - 8 }}
        transition={{ type: "spring", stiffness: 170, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${folder.label} education folder`}
      >
        {/* dangling red string */}
        <svg className="edu-string" viewBox="0 0 80 300" aria-hidden>
          <path d="M 62 8 Q 30 55 58 120 T 22 220 T 48 292" />
        </svg>

        {/* manila tab */}
        <div className="edu-tab">
          <span className="edu-tab-id">PERSONAL FILE</span>
          <span className="edu-tab-dot">·</span>
          <span className="edu-tab-sep" />
        </div>

        <button className="edu-close" onClick={onClose} aria-label="Close folder">✕</button>

        {/* the bright paper that holds the LMS */}
        <motion.div
          className="edu-paper"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
        >
          <div className="edu-paper-glow" aria-hidden />
          <div className="edu-paper-inner">
            <EducationDashboard onClose={onClose} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}