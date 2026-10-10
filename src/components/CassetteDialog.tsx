import type { Cassette } from "./cassettes";

export default function CassetteDialog({ cassette, onClose }: { cassette: Cassette; onClose: () => void }) {
  return (
    <div className={`tv-playback tv-playback-${cassette.category}`} role="dialog" aria-label={`${cassette.name} playback`}>
      <div className={`playback-screen playback-image-${cassette.imageClass}`}>
        <span className="playback-scanlines" />
        <span className="playback-kicker">ARCHIVE PLAYBACK // 2005</span>
        <h1>{cassette.name}</h1>
        <p>{cassette.caption}</p>
        <button onClick={onClose}>Eject cassette</button>
      </div>
    </div>
  );
}
