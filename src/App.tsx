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
    </div>
  );
}
