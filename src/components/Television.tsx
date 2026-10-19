import { useState } from "react";
import CassetteDialog from "./CassetteDialog";
import { CASSETTES, type Cassette } from "./cassettes";
import "./television.css";
import { playSound, setRainDucked } from "../audioManager";
import { useEffect } from "react";

export default function Television() {
  const [cassette, setCassette] = useState<Cassette | null>(null);

  useEffect(() => {
    if (!cassette) return;
    setRainDucked(true);
    return () => setRainDucked(false);
  }, [cassette]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const index = Number(event.dataTransfer.getData("text/cassette-index"));
    if (Number.isInteger(index) && CASSETTES[index]) {
      playSound("static");
      setCassette(CASSETTES[index]);
    }
  };

  return (
    <>
    <div className="television-scene" aria-label="Old television playing static">
      <div className="television">
        <div className="television-screen">
          {cassette ? (
            <div className={`tv-preview tv-preview-${cassette.category} tv-preview-${cassette.imageClass}`}>
              <span className="tv-preview-title">{cassette.name}</span>
              <span className="tv-preview-caption">ARCHIVE PLAYBACK · 2005</span>
            </div>
          ) : (
            <>
              <div className="static-noise" />
              <span className="static-label">NO SIGNAL</span>
            </>
          )}
        </div>
        <div className="television-controls">
          <span className="television-knob" />
          <span className="television-knob" />
          <span className="television-speaker" />
        </div>
      </div>
      <div
          className={`media-player ${cassette ? "is-playing" : ""}`}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        aria-label="Cassette player. Drop a cassette here to play it."
      >
        <div className="player-slot">{cassette ? "PLAY" : ""}</div>
        <span className="player-light" />
        <span className="player-button" />
      </div>
      <div className="television-stand">
        <div className="stand-shelf" />
        <span className="stand-leg stand-leg-left" />
        <span className="stand-leg stand-leg-right" />
      </div>
    </div>
        {cassette && (
  <CassetteDialog
    cassette={cassette}
    onClose={() => setCassette(null)}
    onSelect={(c) => setCassette(c)}
  />
)}
    </>
  );
}
