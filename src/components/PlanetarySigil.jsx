import React from 'react'

export function PlanetarySigil({ symbol, className }) {
  const sigils = {
    sun: (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="2" fill="currentColor" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 20C70 20 50 30 50 50C50 70 70 80 70 80C60 85 45 85 35 75C25 65 25 45 35 30C45 20 60 15 70 20Z" />
      </svg>
    ),
    mars: (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="40" cy="60" r="25" />
        <line x1="58" y1="42" x2="80" y2="20" />
        <polyline points="65 20 80 20 80 35" />
      </svg>
    ),
    mercury: (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="55" r="20" />
        <line x1="50" y1="75" x2="50" y2="90" />
        <line x1="35" y1="82" x2="65" y2="82" />
        <path d="M30 25C30 25 40 35 50 35C60 35 70 25 70 25" />
      </svg>
    ),
    jupiter: (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 30C35 30 55 20 65 35C70 45 60 55 45 55H80" />
        <line x1="55" y1="40" x2="55" y2="85" />
      </svg>
    ),
    venus: (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="40" r="25" />
        <line x1="50" y1="65" x2="50" y2="90" />
        <line x1="35" y1="78" x2="65" y2="78" />
      </svg>
    ),
    saturn: (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 20V60C35 80 50 85 65 75" />
        <line x1="25" y1="35" x2="50" y2="35" />
      </svg>
    )
  }

  return sigils[symbol] || null
}
