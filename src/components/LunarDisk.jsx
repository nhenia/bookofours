import React from 'react'

export function LunarDisk({ phase, className = "" }) {
  // phase: 0 (New), 0.25 (First Quarter), 0.5 (Full), 0.75 (Last Quarter), 1 (New)

  // A better SVG-based representation of the moon phase
  // We use two paths: one for the base circle (shadow) and one for the illuminated part

  const r = 45;
  const c = 50;

  // Calculate the horizontal radius of the terminator ellipse
  // x = cos(2 * pi * phase)
  const terminatorX = Math.cos(2 * Math.PI * phase) * r;
  const isWaning = phase > 0.5;

  // Draw the illuminated part as two arcs
  // Arc 1: The outer circle (left or right half)
  // Arc 2: The terminator (an ellipse that changes shape)

  const d = `
    M ${c} ${c - r}
    A ${r} ${r} 0 0 ${isWaning ? 0 : 1} ${c} ${c + r}
    A ${Math.abs(terminatorX)} ${r} 0 0 ${phase > 0.25 && phase < 0.75 ? 1 : 0} ${c} ${c - r}
  `;

  return (
    <div className={`relative w-48 h-48 rounded-full overflow-hidden bg-black ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Shadow part */}
        <circle cx="50" cy="50" r={r} fill="#2b2622" opacity="0.3" />

        {/* Illuminated part */}
        <path d={d} fill="#f4f1ea" className="transition-all duration-1000" />

        {/* Subtle Crater Texture */}
        <defs>
          <radialGradient id="craterGradient" cx="30%" cy="30%" r="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="url(#craterGradient)" />
      </svg>
    </div>
  )
}
