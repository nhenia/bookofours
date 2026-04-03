import React from 'react';

const SIGILS = {
  Sun: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-iron-gall fill-none stroke-[3]">
      <circle cx="50" cy="50" r="30" />
      <circle cx="50" cy="50" r="2" fill="currentColor" />
    </svg>
  ),
  Moon: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-iron-gall fill-none stroke-[3]">
      <path d="M70,20 A45,45 0 1,0 70,80 A35,35 0 1,1 70,20" />
    </svg>
  ),
  Mars: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-iron-gall fill-none stroke-[3]">
      <circle cx="40" cy="60" r="25" />
      <line x1="60" y1="40" x2="85" y2="15" />
      <polyline points="70,15 85,15 85,30" />
    </svg>
  ),
  Mercury: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-iron-gall fill-none stroke-[3]">
      <circle cx="50" cy="55" r="20" />
      <line x1="50" y1="75" x2="50" y2="95" />
      <line x1="35" y1="85" x2="65" y2="85" />
      <path d="M30,25 Q50,45 70,25" />
    </svg>
  ),
  Jupiter: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-iron-gall fill-none stroke-[3]">
      <path d="M30,30 Q30,10 50,10 L50,90 M30,50 L70,50" />
    </svg>
  ),
  Venus: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-iron-gall fill-none stroke-[3]">
      <circle cx="50" cy="40" r="25" />
      <line x1="50" y1="65" x2="50" y2="95" />
      <line x1="30" y1="80" x2="70" y2="80" />
    </svg>
  ),
  Saturn: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-iron-gall fill-none stroke-[3]">
      <path d="M40,10 L40,60 Q40,90 70,90 M25,30 L55,30" />
    </svg>
  )
};

export function PlanetarySigil({ planet, className = "w-12 h-12" }) {
  return (
    <div className={className}>
      {SIGILS[planet] || null}
    </div>
  );
}
