import React from 'react'

export function BindingMode({ onBind, onBack, logsCount }) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 md:p-12 z-[100] text-vellum">
      <div className="max-w-xl text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.6em] opacity-40">Dark of the Moon</h2>
          <h1 className="text-6xl md:text-8xl font-bastarda transition-all duration-700 animate-pulse-slow">
            Binding Mode
          </h1>
        </div>

        <p className="text-xl md:text-2xl font-serif leading-relaxed opacity-80 max-w-md mx-auto">
          The cycle of {logsCount} logs is complete. It is time to typeset your month into a physical artifact.
        </p>

        <div className="flex flex-col gap-6 items-center">
          <button
            onClick={onBind}
            className="group relative px-12 py-5 border-2 border-vellum/40 hover:border-vellum/80 rounded-full transition-all"
          >
            <span className="text-lg uppercase tracking-[0.4em] font-bastarda group-hover:scale-105 inline-block transition-transform">
              Generate Almanac (PDF)
            </span>
          </button>

          <button
            onClick={onBack}
            className="text-xs uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity"
          >
            Wait for the New Moon
          </button>
        </div>

        <div className="text-[10px] uppercase tracking-widest opacity-20 italic">
          Local Logic • Medieval Fonts • Zero Cloud
        </div>
      </div>
    </div>
  )
}
