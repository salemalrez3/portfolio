import "./desk.css";

export default function Desk() {
  return (
    <div className="desk-scene" aria-hidden="true">
      {/* Desk — back panel faces the camera (no drawers) */}
      <div className="desk">
        <div className="desk-surface" />
        <div className="desk-back">
          <div className="desk-back-panel" />
        </div>
      </div>

      {/* Chair — viewed from behind */}
      <div className="desk-chair">
        <div className="chair-frame">
          <div className="chair-top-rail" />
          <div className="chair-slats">
            <span className="chair-slat-edge" />
            <span className="chair-slat" />
            <span className="chair-slat" />
            <span className="chair-slat" />
            <span className="chair-slat-edge" />
          </div>
        </div>

        <div className="chair-arm chair-arm-left" />
        <div className="chair-arm chair-arm-right" />
        <div className="chair-cushion" />

        <div className="chair-column" />
        <div className="chair-base">
          <span className="chair-caster chair-caster-1" />
          <span className="chair-caster chair-caster-2" />
          <span className="chair-caster chair-caster-3" />
          <span className="chair-caster chair-caster-4" />
          <span className="chair-caster chair-caster-5" />
        </div>
      </div>
    </div>
  );
}