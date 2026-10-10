import { useEffect, useState } from "react";
import "./room-clock.css";

export default function RoomClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // update every second; hands will be smooth enough
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  // angles in degrees — 6° per sec, 6° per min, 30° per hour
  const secAngle  = seconds * 6;
  const minAngle  = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  return (
    <div className="room-clock" aria-label="Wall clock">
      <div className="clock-face">
        {/* 12, 3, 6, 9 marks */}
        <span className="clock-mark clock-mark-12" />
        <span className="clock-mark clock-mark-3" />
        <span className="clock-mark clock-mark-6" />
        <span className="clock-mark clock-mark-9" />

        {/* 4 small dots for the rest */}
        <span className="clock-dot clock-dot-1" />
        <span className="clock-dot clock-dot-2" />
        <span className="clock-dot clock-dot-3" />
        <span className="clock-dot clock-dot-4" />
        <span className="clock-dot clock-dot-5" />
        <span className="clock-dot clock-dot-6" />
        <span className="clock-dot clock-dot-7" />
        <span className="clock-dot clock-dot-8" />

        <div className="clock-brand">SALEM</div>

        <span
          className="clock-hand clock-hour"
          style={{ transform: `rotate(${hourAngle}deg)` }}
        />
        <span
          className="clock-hand clock-minute"
          style={{ transform: `rotate(${minAngle}deg)` }}
        />
        <span
          className="clock-hand clock-second"
          style={{ transform: `rotate(${secAngle}deg)` }}
        />
        <span className="clock-center" />
      </div>
    </div>
  );
}