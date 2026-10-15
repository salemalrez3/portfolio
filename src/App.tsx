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
    </div>
  );
}
