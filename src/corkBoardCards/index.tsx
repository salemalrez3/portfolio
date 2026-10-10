import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import { PAPERS, type Paper } from "./data";
import PaperDialog from "./components/PaperDialog";
import PaperCard from "./components/PaperCard";
import StringLayer from "./components/StringLayer";

export default function CorkBoardCards({ onOpenMap }: { onOpenMap: () => void }) {
  const [selected, setSelected] = useState<Paper | null>(null);

  return (
    <>
      <StringLayer className="strings-back" layer="back" />
      {PAPERS.map((paper) => <PaperCard key={paper.id} paper={paper} onSelect={setSelected} />)}
      <StringLayer className="strings-front" layer="front" />
      <AnimatePresence>
        {selected && (
          <PaperDialog
            key={selected.id}
            paper={selected}
            onClose={() => setSelected(null)}
            onReveal={() => {
              setSelected(null);
              onOpenMap();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
