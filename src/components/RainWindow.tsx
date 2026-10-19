import { useEffect, useState } from "react";
import "./rain-window.css";
import { isRainActive, toggleRain } from "../audioManager";

type Building = { x: number; w: number; h: number };

/* silhouette skyline — positions, widths, heights as % of the glass */
const BUILDINGS: Building[] = [
  { x: 0,   w: 6,  h: 28 },
  { x: 6,   w: 5,  h: 44 },
  { x: 11,  w: 8,  h: 32 },
  { x: 19,  w: 4,  h: 56 },
  { x: 23,  w: 7,  h: 40 },
  { x: 30,  w: 5,  h: 68 },  // tallest
  { x: 35,  w: 6,  h: 42 },
  { x: 41,  w: 4,  h: 52 },
  { x: 45,  w: 8,  h: 34 },
  { x: 53,  w: 5,  h: 60 },
  { x: 58,  w: 4,  h: 46 },
  { x: 62,  w: 9,  h: 64 },  // has neon sign
  { x: 71,  w: 5,  h: 38 },
  { x: 76,  w: 6,  h: 54 },
  { x: 82,  w: 4,  h: 34 },
  { x: 86,  w: 7,  h: 48 },
  { x: 93,  w: 7,  h: 62 },
];

const RAIN_DROPS = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 17 + (index * index) % 23) % 100}%`,
  delay: `${(index * 0.13) % 2.2}s`,
  duration: `${0.85 + (index % 7) * 0.09}s`,
  opacity: 0.25 + ((index * 7) % 5) * 0.1,
}));

export default function RainWindow() {
  const [isRainOn, setIsRainOn] = useState(true);
  useEffect(() => setIsRainOn(isRainActive()), []);

  return (
    <section className={`rain-window ${isRainOn ? "is-live" : ""}`} aria-label="Rainy city window">
      <div className="rain-window-frame">
        <div className="rain-window-glass">
          {/* --- the world beyond the glass --- */}
          <div className="rain-world">
            <div className="rain-sky" />

            <div className="rain-buildings">
              {BUILDINGS.map((b, i) => (
                <span
                  key={i}
                  className={`rain-building ${b.x === 62 ? "has-neon" : ""}`}
                  style={{
                    left: `${b.x}%`,
                    width: `${b.w}%`,
                    height: `${b.h}%`,
                    // vary the window pattern per building
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            <span className="rain-neon" aria-hidden />
            <div className="rain-mist" aria-hidden />
          </div>

          {/* --- water ON the glass --- */}
          <div className="rain-rivulets" aria-hidden />
          <div className="rain-fall" aria-hidden>
            {RAIN_DROPS.map((drop, index) => (
              <i
                key={index}
                style={{
                  left: drop.left,
                  animationDelay: drop.delay,
                  animationDuration: drop.duration,
                  opacity: drop.opacity,
                }}
              />
            ))}
          </div>

          {/* --- atmosphere between glass and room --- */}
          <div className="rain-fog" aria-hidden />
          <div className="rain-sheen" aria-hidden />
        </div>

        <div className="rain-window-crossbar rain-window-crossbar-horizontal" />
        <div className="rain-window-crossbar rain-window-crossbar-vertical" />
        <div className="rain-window-sill" />
      </div>

      <button
        type="button"
        className={`rain-toggle ${isRainOn ? "is-on" : ""}`}
        onClick={() => setIsRainOn(toggleRain())}
        aria-pressed={isRainOn}
      >
        <span className="rain-toggle-dot" />
        Rain {isRainOn ? "on" : "off"}
      </button>
    </section>
  );
}