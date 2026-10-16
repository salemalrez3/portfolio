import { useEffect, useState } from "react";
import Cabinet from "../components/Cabinet";
import Board from "../components/Board";
import Clue from "../components/Clue";
import Vault from "../components/Vault";
import Television from "../components/Television";
import BoxStack from "../components/BoxStack";
import RoomClock from "../components/RoomClock";
import Desk from "../components/Desk";

export default function HomePage({ onOpenMap }: { onOpenMap: () => void }) {
  const [briefingVisible, setBriefingVisible] = useState(true);
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / 2484, window.innerHeight / 1146),
  );

  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(window.innerWidth / 2484, window.innerHeight / 1146));
    };

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      <div
        className="room"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className="wall" />
        <Board onOpenMap={onOpenMap} />
        <div className="ground" />
        <BoxStack />
        <Vault />
        <Clue />
        <div className="cabinet-holder"><Cabinet /></div>
        <Television />
        <Desk />
        <RoomClock />
        <div className="junction-shadow" />
        <div className="baseboard" />
        <div className="lamp" />
        <div className="room-entry-light" aria-hidden="true" />
      </div>
      {briefingVisible && (
        <div className="opening-briefing" role="dialog" aria-label="Opening case briefing">
          <span className="opening-briefing-kicker">CASE FILE 20:05</span>
          <strong>You are the detective.</strong>
          <span>Search the room for my CV.</span>
          <button
            type="button"
            className="opening-briefing-close"
            onClick={() => setBriefingVisible(false)}
          >
            Begin investigation
          </button>
        </div>
      )}
    </>
  );
}
