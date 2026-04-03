import React from 'react'

export function ManOfSigns({ className = "" }) {
  // Anatomical/Astrological Man SVG representation
  return (
    <div className={`relative w-64 h-96 ${className}`}>
      <svg viewBox="0 0 100 150" className="w-full h-full text-vellum fill-none stroke-current" strokeWidth="0.5">
        {/* Head */}
        <ellipse cx="50" cy="20" rx="10" ry="12" />
        {/* Torso */}
        <path d="M50,32 L50,80 M40,45 Q50,40 60,45 M35,80 Q50,75 65,80" />
        {/* Arms */}
        <path d="M40,45 Q20,50 15,70 M60,45 Q80,50 85,70" />
        {/* Legs */}
        <path d="M40,80 Q35,110 40,140 M60,80 Q65,110 60,140" />
        {/* Astrological Symbols (simplified as circles) */}
        <circle cx="50" cy="10" r="2" /> {/* Aries / Head */}
        <circle cx="50" cy="50" r="2" /> {/* Leo / Heart */}
        <circle cx="40" cy="130" r="2" /> {/* Pisces / Feet */}
        <circle cx="60" cy="130" r="2" />
        <circle cx="30" cy="60" r="2" />
        <circle cx="70" cy="60" r="2" />
      </svg>
    </div>
  )
}
