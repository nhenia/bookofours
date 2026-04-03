import React from 'react'
import { LunarDisk } from './LunarDisk'
import { ManOfSigns } from './ManOfSigns'

export function LockScreen({ status, onOpen }) {
  const { isVoidOfCourse, isEgyptianDay, isZenith, phase } = status;

  return (
    <div className={`min-h-screen w-full flex flex-col justify-center items-center p-8 text-center transition-all duration-1000 overflow-hidden`}>
      <h2 className="text-sm uppercase tracking-[0.4em] opacity-40 mb-12">Sublunary Office</h2>

      <div className={`relative flex flex-col items-center gap-6 transition-all duration-1000 ${isVoidOfCourse ? 'blur-[8px]' : ''}`}>
        {/* Man of Signs Background */}
        <ManOfSigns className="absolute -z-10 -top-24 opacity-10" />

        {/* Lunar Disk */}
        <div className="relative mb-8">
          <LunarDisk phase={phase} className="w-32 h-32 md:w-48 md:h-48" />
        </div>

        {/* Office & Sign */}
        <div className="relative z-30">
          <h1 className="text-8xl md:text-9xl font-bastarda transition-all duration-700 animate-pulse-slow">
            {status.office}
          </h1>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-2xl italic opacity-60">Moon in {status.sign}</p>
            <p className="text-xs uppercase tracking-widest opacity-30">Altitude: {status.altitude.toFixed(1)}°</p>
          </div>
        </div>
      </div>

      {/* Marginalia Layer (Z-index 20, below Typography z-30 but above Background z-10) */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {/* The Great Snail (Void of Course) */}
        {isVoidOfCourse && (
          <img
            src="/drollery_snail.svg"
            alt="The Great Snail"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 md:w-32 animate-creep"
          />
        )}

        {/* The Locust-Dragon (Egyptian Day) */}
        {isEgyptianDay && (
          <img
            src="/drollery_locust.svg"
            alt="The Locust-Dragon"
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-20 md:w-24 drop-shadow-[0_0_10px_rgba(178,34,34,0.5)]"
          />
        )}

        {/* The Monastic Cat (Lunar Zenith) */}
        {isZenith && (
          <div className="absolute bottom-[20%] right-[10%] md:right-[20%]">
            <img
              src="/drollery_cat.svg"
              alt="The Monastic Cat"
              className="w-16 md:w-20 opacity-80"
            />
            <p className="text-[8px] uppercase tracking-widest opacity-40 mt-1 text-center">Zenith Clarity</p>
          </div>
        )}
      </div>

      <button
        onClick={onOpen}
        className="relative z-40 mt-24 px-10 py-3 border border-vellum/20 rounded-full hover:border-vellum/60 hover:bg-vellum/5 transition-all group"
      >
        <span className="text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100">
          Open the Grimoire
        </span>
      </button>

      <div className="absolute bottom-8 text-[10px] uppercase tracking-widest opacity-20">
        Anti-Hustle // Pocket Monastery
      </div>
    </div>
  )
}
