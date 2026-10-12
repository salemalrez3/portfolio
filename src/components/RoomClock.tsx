import "./room-clock.css";

function ClockHands() {
  return (
    <>
      <span
        className="clock-hand clock-hour"
        style={{ transform: "rotate(242.5deg)" }}
      />
      <span
        className="clock-hand clock-minute"
        style={{ transform: "rotate(30deg)" }}
      />
      <span
        className="clock-hand clock-second"
        style={{ transform: "rotate(30deg)" }}
      />
    </>
  );
}

export default function RoomClock() {
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

        <ClockHands />
        <span className="clock-center" />
      </div>
    </div>
  );
}