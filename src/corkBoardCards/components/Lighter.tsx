import { motion } from "framer-motion";

export default function Lighter({
  onDrag,
  onDragEnd,
}: {
  onDrag: (event: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd: () => void;
}) {
  return (
    <motion.div
      className="lighter"
      drag
      dragMomentum={false}
      dragElastic={0.08}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.1, rotate: -3 }}
      whileHover={{ scale: 1.05, rotate: -2 }}
      aria-label="Drag the old lighter over the paper"
    >
      <div className="lighter-flame"><div className="flame-inner" /><div className="flame-outer" /></div>
      <div className="lighter-lid" />
      <div className="lighter-body">
        <div className="lighter-engraving">Z</div>
      </div>
    </motion.div>
  );
}
