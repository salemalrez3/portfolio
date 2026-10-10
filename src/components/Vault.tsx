import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./vault.css";
import { CASSETTES } from "./cassettes";

export default function Vault() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const close = () => {
    setIsDialogOpen(false);
    setPassword("");
    setError(false);
  };

  const unlock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "2005") {
      setIsUnlocked(true);
      setIsDialogOpen(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <button
        className={`vault ${isUnlocked ? "is-open" : ""}`}
        onClick={isUnlocked ? undefined : () => setIsDialogOpen(true)}
        aria-label={isUnlocked ? "Opened archive safe" : "Unlock archive safe"}
      >
        {/* Interior cavity (revealed when door opens) */}
        <span className="vault-interior">
          <span className="vault-interior-light" />

          <span className="vault-shelf">
            {CASSETTES.map((item, index) => (
              <span
                className="vault-cassette"
                key={item.name}
                data-cat={item.category}
                draggable={isUnlocked}
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/cassette-name", item.name);
                  event.dataTransfer.setData("text/cassette-index", String(index));
                  event.dataTransfer.effectAllowed = "copy";
                }}
              >
                <span className="cassette-shell">
                  <span className="cassette-screw cassette-screw-tl" />
                  <span className="cassette-screw cassette-screw-tr" />

                  <span className="cassette-paper">
                    <span className="cassette-name">{item.name}</span>
                  </span>

                  <span className="cassette-reels">
                    <span className="reel">
                      <span className="reel-hub" />
                    </span>
                    <span className="reel">
                      <span className="reel-hub" />
                    </span>
                  </span>
                </span>
              </span>
            ))}
          </span>
        </span>

        {/* Door (rotates down on unlock) */}
        <motion.span
          className="vault-door"
          animate={{ opacity:isUnlocked?0:1}}
          style={{display:isUnlocked?"none":""}}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
          <span className="vault-rivet vault-rivet-tl" />
          <span className="vault-rivet vault-rivet-tr" />
          <span className="vault-rivet vault-rivet-bl" />
          <span className="vault-rivet vault-rivet-br" />

          <span className="vault-plate">ARCHIVE</span>

          <span className="vault-keypad" aria-hidden="true">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
              (d, i) => (
                <span key={i} className={d ? "" : "is-blank"}>
                  {d}
                </span>
              ),
            )}
          </span>

          <span className="vault-handle" />
        </motion.span>

        {/* Base plinth + hinges */}
        <span className="vault-base" />
        <span className="vault-hinge vault-hinge-left" />
        <span className="vault-hinge vault-hinge-right" />
      </button>

      <AnimatePresence>
        {isDialogOpen && (
          <div className="vault-dialog-layer">
            <motion.div
              className="vault-dialog-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              className="vault-dialog"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <button
                className="vault-dialog-close"
                onClick={close}
                aria-label="Close safe"
              >
                ✕
              </button>
              <form className="vault-lock" onSubmit={unlock}>
                <span className="vault-kicker">DIGITAL LOCK</span>
                <h2>Safe locked</h2>
                <p>Enter the four-digit code from the clue paper.</p>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.replace(/\D/g, ""));
                    setError(false);
                  }}
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  autoFocus
                  aria-label="Safe password"
                />
                <button className="vault-submit" type="submit">
                  Unlock safe
                </button>
                {error && (
                  <span className="vault-error">Incorrect passcode.</span>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
