import "./App.css";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import JobMapPage from "./pages/JobMapPage";

export default function App() {
  const [page, setPage] = useState<"home" | "job-map">("home");
  const [briefingOpen, setBriefingOpen] = useState(true);

  return (
    <div className="app">
      {!briefingOpen && (
        page === "home"
          ? <HomePage onOpenMap={() => setPage("job-map")} />
          : <JobMapPage onBack={() => setPage("home")} />
      )}
      {briefingOpen && (
        <div className="opening-screen">
          <div
            className="opening-briefing"
            role="dialog"
            aria-modal="true"
            aria-label="Opening case briefing"
          >
            <span className="opening-briefing-kicker">CASE FILE 20:05</span>
            <strong>You are the detective.</strong>
            <p className="opening-briefing-intro">
              Find the three main parts of my CV, hidden in three places around
              the room.
            </p>
            <div className="opening-briefing-clues">
              <span><b>PROJECTS</b><small>Follow the map.</small></span>
              <span><b>EDUCATION</b><small>Search the folders.</small></span>
              <span><b>OCCUPATIONS</b><small>Find the CDs.</small></span>
            </div>
            <button
              type="button"
              className="opening-briefing-close"
              onClick={() => setBriefingOpen(false)}
            >
              <span>Enter the room</span>
              <small>Begin investigation</small>
            </button>
          </div>
        </div>
      )}
      <div className="device-notice" role="status">
        <strong>Best experienced on PC</strong>
        <span>Open this case file on a larger screen for the full room experience.</span>
      </div>
      <div className="portrait-gate" role="status">
        <span className="portrait-gate-icon" aria-hidden="true">↻</span>
        <strong>Rotate to landscape</strong>
        <span>This case is designed as a panoramic room. Turn your phone sideways to enter.</span>
      </div>
    </div>
  );
}
