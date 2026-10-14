import "./box-stack.css";

const BOXES = [
  // Base row
  { id: "b1", cls: "box-a", label: "ARCHIVE 01", sub: "2019 – 2021",    },
  { id: "b2", cls: "box-b", label: "EVIDENCE",   sub: "SEALED",       },
  { id: "b3", cls: "box-c", label: "NOTES",      sub: "VOL. II",     },

  // Second layer
  { id: "b4", cls: "box-d", label: "FRAGILE",    sub: "HANDLE W/ CARE", },
  { id: "b5", cls: "box-e", label: "MISC",       sub: "UNSORTED",       },
  { id: "b6", cls: "box-f", label: "SEALED",     sub: "DO NOT OPEN",     },

  // Third layer
  { id: "b7", cls: "box-g", label: "B.SC ICT",   sub: "2022 – 2027",    },
  { id: "b8", cls: "box-h", label: "Salem",   sub: "OFF RECORD",     },

  // Top
  { id: "b9", cls: "box-i", label: "REDACTED",   sub: "CLASSIFIED",  },
];

export default function BoxStack() {
  return (
    <div className="box-stack" aria-label="Stack of archive boxes">
      {BOXES.map((b) => (
        <div
          className={`room-box ${b.cls}`}
          key={b.id}
        >
          <div className="box-body">
            <div className="box-tape" />
            <div className="box-flap box-flap-left" />
            <div className="box-flap box-flap-right" />

            <div className="box-print">
              <div className="box-tag">{b.label}</div>
              <div className="box-sub">{b.sub}</div>
            </div>

            <div className="box-wear box-wear-1" />
            <div className="box-wear box-wear-2" />
          </div>

          <div className="box-edge" />
        </div>
      ))}
    </div>
  );
}