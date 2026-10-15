import type { Project } from "./mapTypes";

export function ProjectFolder({ project, onClose }: { project: Project; onClose: () => void }) {
  const redacted = project.redacted;
  return (
    <div className="folder-layer" role="presentation" onClick={onClose}>
      <aside
        className={`folder ${redacted ? "folder-classified" : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <svg className="folder-string" viewBox="0 0 100 260" aria-hidden="true">
          <path d="M 78 8 Q 50 40 65 90 T 30 180 T 55 250" />
        </svg>

        <div className="folder-tab">
          <span className="folder-tab-id">CASE {project.caseNo}</span>
          <span className="folder-tab-sep">·</span>
          <span className="folder-tab-name">{redacted ? "[ REDACTED ]" : project.name}</span>
        </div>

        <button className="folder-close" onClick={onClose} aria-label="Close folder">✕</button>

        <div className="folder-body">
          <div className="folder-document">
            <div className="doc-meta">
              <span>{project.zone}</span>
              <span>{project.status}</span>
            </div>

            <h2 className="doc-title">
              {redacted ? (
                <span className="doc-redact" title="Available upon request">REDACTED</span>
              ) : project.name}
            </h2>

            {redacted && <div className="doc-classified">████████████ · NDA PROTECTED</div>}

            {project.id === "transit" && (
              <svg className="doc-route" viewBox="0 0 440 90" aria-hidden="true">
                <path d="M20 70 Q 120 15 220 45 T 420 25" />
                <path d="M20 70 Q 120 15 220 45 T 420 25" strokeDasharray="3 5" className="doc-route-dash" />
                <circle cx="20" cy="70" r="4" />
                <circle cx="220" cy="45" r="4" />
                <circle cx="420" cy="25" r="4" />
                <circle cx="220" cy="45" r="8" className="doc-route-pulse" />
              </svg>
            )}

            <p className="doc-body">{project.description}</p>
            <div className="doc-tech">
              {project.tools.map((tool) => <span key={tool} className="doc-tag">{tool}</span>)}
            </div>

            {redacted && (
              <div className="doc-redacted-lines">
                {["React", "ASP.NET", "DevExpress"].map((word) => (
                  <span key={word} className="doc-redacted-line"><b>{word}</b></span>
                ))}
              </div>
            )}

            <div className="doc-footer">
              <span className={`doc-stamp ${redacted ? "doc-stamp-red" : ""}`}>
                {redacted ? "CLASSIFIED · CLEARANCE REQUIRED" : "ARCHIVE · ACTIVE"}
              </span>
              {redacted && (
                <a className="doc-contact" href="mailto:salem.seraj@gmail.com">
                  → CONTACT FOR DETAILS
                </a>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
