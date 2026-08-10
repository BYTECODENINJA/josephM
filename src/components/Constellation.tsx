import React from "react";

const constellationDots = [
  [7, 20, 0.3], [15, 62, 1.2], [22, 33, 2.1], [30, 14, 0.8], [39, 48, 2.7], [48, 22, 1.5],
  [56, 74, 0.1], [64, 37, 2.3], [72, 15, 1.8], [81, 54, 0.5], [90, 29, 2.8], [95, 70, 1.1],
  [12, 88, 2.4], [44, 91, 0.9], [68, 87, 1.6], [84, 80, 2.2],
] as const;

export function Constellation() {
  return (
    <div className="constellation" aria-hidden="true">
      <div className="constellation__line constellation__line--one" />
      <div className="constellation__line constellation__line--two" />
      {constellationDots.map(([left, top, delay]) => (
        <span
          className="constellation__dot"
          key={`${left}-${top}`}
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
