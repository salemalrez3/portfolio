const jobs = [
  { company: "Solution Soft Inc.", role: "Full-stack Engineer", period: "2024 — present", tools: "React · ASP.NET · DevExpress" },
  { company: "Damascus Vision", role: "Platform Engineer", period: "2023 — 2024", tools: "React · Civic data · Surveys" },
  { company: "Independent work", role: "Product & Web Developer", period: "2022 — present", tools: "FastAPI · WebSockets · TypeScript" },
];

export default function JobMapPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="job-map-page">
      <button className="job-map-back" onClick={onBack}>← return to the board</button>
      <p className="job-map-kicker">ARCHIVE // PROFESSIONAL RECORD</p>
      <h1>THE WORK MAP</h1>
      <p className="job-map-intro">A trail of shipped products, stubborn bugs, and systems built to last.</p>
      <section className="job-map-list" aria-label="Work history">
        {jobs.map((job, index) => (
          <article className="job-map-entry" key={job.company}>
            <span className="job-map-number">0{index + 1}</span>
            <div><p className="job-map-period">{job.period}</p><h2>{job.role}</h2><h3>{job.company}</h3><p>{job.tools}</p></div>
          </article>
        ))}
      </section>
    </main>
  );
}
