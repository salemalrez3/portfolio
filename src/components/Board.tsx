import CorkBoardCards from "../corkBoardCards";
import "./board.css";

export default function Board({ onOpenMap }: { onOpenMap: () => void }) {
  return <div className="board"><CorkBoardCards onOpenMap={onOpenMap} /></div>;
}
