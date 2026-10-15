import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { CASSETTES, type Cassette } from "./cassettes";
import { CassetteSigil } from "./CassetteSigil";
import "./CassetteDialog.css";

export default function CassetteDialog({
  cassette,
  onClose,
  onSelect,
}: {
  cassette: Cassette;
  onClose: () => void;
  onSelect?: (cassette: Cassette) => void;
}) {
  /* --- VHS timecode ticker --- */
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    setSeconds(0);
    const id = window.setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [cassette]);

  const fmt = (n: number) => {
    const h = String(Math.floor(n / 3600)).padStart(2, "0");
    const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0");
    const s = String(n % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  /* --- escape closes --- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rootStyle = {
    "--cassette-accent": cassette.signature.accent,
    "--cassette-dim": cassette.signature.dim,
  } as CSSProperties;

  const node = (
    <div
      className="cassette-overlay"
      style={rootStyle}
      role="dialog"
      aria-label={`${cassette.name} playback`}
      onClick={onClose}
    >
      <div className="cassette-shell" onClick={(e) => e.stopPropagation()}>
        <div className="cassette-glass">
          {/* key on name so the flicker animation replays when switching tapes */}
          <div
            key={cassette.name}
            className={`cassette-screen cassette-screen-image-${cassette.imageClass}`}
          >
            {/* --- station bar --- */}
            <div className="cassette-station">
              <span className="cassette-station-brand">
                <span className="cassette-station-sigil">
                  <CassetteSigil sigil={cassette.signature.sigil} size={14} />
                </span>
                ARCHIVE PLAYBACK <span className="cassette-station-sep">//</span> 2005
              </span>
              <span className="cassette-station-tc">
                <span className="cassette-tc-dot" />
                REC {fmt(seconds)}
              </span>
            </div>

            {/* --- scrolling body --- */}
            <div className="cassette-content">
              <div className="cassette-meta">
                <span className="cassette-category">
                  {cassette.category.toUpperCase()}
                </span>
                {cassette.badge && (
                  <span className="cassette-badge">{cassette.badge}</span>
                )}
              </div>

              <h1 className="cassette-title">{cassette.name}</h1>

              <p className="cassette-subtitle">
                <span className="cassette-role">{cassette.role}</span>
                {cassette.period && (
                  <>
                    <span className="cassette-dot">·</span>
                    <span>{cassette.period}</span>
                  </>
                )}
                {cassette.location && (
                  <>
                    <span className="cassette-dot">·</span>
                    <span>{cassette.location}</span>
                  </>
                )}
              </p>

              <p className="cassette-summary">{cassette.summary}</p>

              <div className="cassette-sections">
                {cassette.sections.map((section) => (
                  <section key={section.heading} className="cassette-section">
                    <h2 className="cassette-section-head">{section.heading}</h2>
                    <ul className="cassette-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              {cassette.tech && cassette.tech.length > 0 && (
                <div className="cassette-tech">
                  {cassette.tech.map((t) => (
                    <span key={t} className="cassette-tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* --- cassette rail (the "try another tape" cue) --- */}
            <div className="cassette-rail">
              <span className="cassette-rail-label">
                ARCHIVE · {String(CASSETTES.length).padStart(2, "0")} TAPES
              </span>
              <div className="cassette-rail-track">
                {CASSETTES.map((c) => {
                  const isActive = c.name === cassette.name;
                  const itemStyle = {
                    "--accent": c.signature.accent,
                    "--dim": c.signature.dim,
                  } as CSSProperties;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      className={`cassette-rail-item ${isActive ? "is-active" : ""}`}
                      style={itemStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isActive) onSelect?.(c);
                      }}
                      aria-label={c.name}
                      aria-pressed={isActive}
                      title={c.name}
                    >
                      <span className="cassette-rail-stripe" />
                      <span className="cassette-rail-body">
                        <span className="cassette-rail-sigil">
                          <CassetteSigil sigil={c.signature.sigil} size={13} />
                        </span>
                        <span className="cassette-rail-name">{c.shortName}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- controls --- */}
            <div className="cassette-controls">
              <button
                type="button"
                className="cassette-btn cassette-btn-ghost"
                onClick={onClose}
              >
                Back to room
              </button>
              <span className="cassette-controls-hint">ESC TO CLOSE</span>
              <button
                type="button"
                className="cassette-btn cassette-btn-eject"
                onClick={onClose}
              >
                <span className="cassette-eject-glyph" aria-hidden />
                Eject
              </button>
            </div>

            {/* --- CRT overlays --- */}
            <span className="cassette-scanlines" aria-hidden />
            <span className="cassette-vignette" aria-hidden />
            <span className="cassette-glare" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}