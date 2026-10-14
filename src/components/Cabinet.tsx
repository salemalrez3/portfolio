import { useState } from "react";
import { motion, useDragControls, type PanInfo } from "framer-motion";
import "./Cabinet.css";

const OPEN_Y = 132;
const OPEN_SCALE = 1.04;

type FolderItem = { id: string; label: string; sub: string; rotate: number };
type DrawerDef = { id: string; label: string; folders: FolderItem[] };

const DRAWERS: DrawerDef[] = [
  {
    id: "01",
    label: "ACADEMIC",
    folders: [
      { id: "1a", label: "B.SC ICT", sub: "AIU", rotate: -3 },
      { id: "1b", label: "CERTS", sub: "IBM · PEARSON", rotate: 2 },
      { id: "1c", label: "RESEARCH", sub: "TRANSIT", rotate: -1 },
    ],
  },
  {
    id: "02",
    label: "CASE FILES",
    folders: [
      { id: "2a", label: "TRANSIT", sub: "PUBLISHED", rotate: -4 },
      { id: "2b", label: "DR. HERO", sub: "LIVE", rotate: 3 },
      { id: "2c", label: "MEDDIT", sub: "HACKATHON", rotate: -1 },
    ],
  },
  {
    id: "03",
    label: "WITNESS",
    folders: [
      { id: "3a", label: "DAMASCUS", sub: "CIVIC", rotate: 3 },
      { id: "3b", label: "RELIEF", sub: "VOLUNTEER", rotate: -2 },
      { id: "3c", label: "STARTUP", sub: "WEEKEND", rotate: 1 },
    ],
  },
  {
    id: "04",
    label: "ARCHIVE",
    folders: [
      { id: "4a", label: "REDACTED", sub: "NDA", rotate: -2 },
      { id: "4b", label: "REDACTED", sub: "NDA", rotate: 3 },
      { id: "4c", label: "PERSONAL", sub: "MISC", rotate: 0 },
    ],
  },
];

function DrawerSlot({
  drawer,
  isOpen,
  onOpen,
  onClose,
  locked,
}: {
  drawer: DrawerDef;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  locked: boolean;
}) {
  const controls = useDragControls();

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (isOpen) {
      if (info.offset.y < -40 || info.velocity.y < -280) onClose();
    } else {
      if (info.offset.y > 40 || info.velocity.y > 280) onOpen();
    }
  };

  return (
    <div className={`drawer-slot ${isOpen ? "is-open" : ""} ${locked ? "is-locked" : ""}`}>
      {/* Steel rails in the side gutters */}
      <div className="slide-rail slide-rail-left" />
      <div className="slide-rail slide-rail-right" />

      {/* Dark cavity with folders behind the drawer face */}
      <div className="slot-cavity">
        <div className="folder-stack">
          {drawer.folders.map((f, i) => (
            <motion.div
              key={f.id}
              className="cabinet-folder"
              initial={false}
              animate={
                isOpen
                  ? { opacity: 1, y: 0, rotate: f.rotate }
                  : { opacity: 0, y: -8, rotate: 0 }
              }
              transition={{
                delay: isOpen ? 0.14 + i * 0.06 : 0,
                type: "spring",
                stiffness: 220,
                damping: 22,
              }}
            >
              <div className="folder-tab" />
              <div className="folder-label">{f.label}</div>
              <div className="folder-sub">{f.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The sliding drawer face */}
      <motion.div
        className="drawer"
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: OPEN_Y }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        animate={{
          y: isOpen ? OPEN_Y : 0,
          scale: isOpen ? OPEN_SCALE : 1,
        }}
        transition={{ type: "spring", stiffness: 210, damping: 24 }}
        onPointerDown={locked ? undefined : (e) => controls.start(e)}
      >
        <div className="drawer-face">
          {/* Brass glides riding on the rails */}
          <div className="drawer-glide drawer-glide-left" />
          <div className="drawer-glide drawer-glide-right" />

          <div className="drawer-content">
            <div className="nameplate">
              <span className="nameplate-id">{drawer.id}</span>
              <span className="nameplate-label">{drawer.label}</span>
            </div>

            {!locked && <motion.div
              className="handle"
              onTap={() => (isOpen ? onClose() : onOpen())}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="handle-post handle-post-l" />
              <div className="handle-post handle-post-r" />
              <div className="handle-bar" />
            </motion.div>}
            {locked && <div className="drawer-lock" aria-label="Locked drawer">LOCKED</div>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Cabinet() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="cabinet">
      <div className="cabinet-top" />
      <div className="cabinet-body">
        <div className="drawer-stack">
          {DRAWERS.map((d) => (
            <DrawerSlot
              key={d.id}
              drawer={d}
              isOpen={openId === d.id}
              onOpen={() => setOpenId(d.id)}
              onClose={() => setOpenId(null)}
              locked={d.id !== "01"}
            />
          ))}
        </div>
      </div>
      <div className="cabinet-bottom" />
    </div>
  );
}
