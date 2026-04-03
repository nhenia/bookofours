import React from 'react'

export function LockScreen({ status, onOpen }) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-8 text-center">
      <h2 className="text-sm uppercase tracking-[0.4em] opacity-40 mb-12">Sublunary Office</h2>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-8xl md:text-9xl font-bastarda transition-all duration-700 animate-pulse-slow">
          {status.office}
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-2xl italic opacity-60">Moon in {status.sign}</p>
          <p className="text-xs uppercase tracking-widest opacity-30">Altitude: {status.altitude.toFixed(1)}°</p>
        </div>
      </div>

      <button
        onClick={onOpen}
        className="mt-24 px-10 py-3 border border-vellum/20 rounded-full hover:border-vellum/60 hover:bg-vellum/5 transition-all group"
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
