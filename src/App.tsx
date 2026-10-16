import "./App.css";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import JobMapPage from "./pages/JobMapPage";

export default function App() {
  const [page, setPage] = useState<"home" | "job-map">("home");

  return (
    <div className="app">
      {page === "home"
        ? <HomePage onOpenMap={() => setPage("job-map")} />
        : <JobMapPage onBack={() => setPage("home")} />}
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
