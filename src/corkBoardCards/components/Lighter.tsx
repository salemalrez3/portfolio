import { motion, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

export default function Lighter({
  onDrag,
  onDragEnd,
}: {
  onDrag: (event: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const pointerRef = useRef({ id: -1, x: 0, y: 0, startX: 0, startY: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const room = event.currentTarget.closest(".room") as HTMLElement | null;
    const scale = room && room.offsetWidth > 0
      ? room.getBoundingClientRect().width / room.offsetWidth
      : 1;
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: x.get(),
      startY: y.get(),
      scale,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (pointer.id !== event.pointerId) return;
    x.set(pointer.startX + (event.clientX - pointer.x) / pointer.scale);
    y.set(pointer.startY + (event.clientY - pointer.y) / pointer.scale);
    onDrag(event.nativeEvent);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerRef.current.id !== event.pointerId) return;
    pointerRef.current.id = -1;
    setIsDragging(false);
    onDragEnd();
  };

  return (
    <motion.div
      className="lighter"
      style={{ x, y }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      animate={{ scale: isDragging ? 1.1 : 1, rotate: isDragging ? -3 : 0 }}
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
