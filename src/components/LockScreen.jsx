import React from 'react';
import { PlanetarySigil } from './PlanetarySigil';

export function LockScreen({ status, onOpen }) {
  const isSnail = status.marginalia === "Verdigris Snail";

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Z-0: Vellum Background & Man of Signs */}
      <div className="absolute inset-0 bg-vellum z-0" />
      <div className="absolute inset-0 opacity-[0.03] z-0 flex items-center justify-center pointer-events-none">
        {/* Man of Signs placeholder SVG */}
        <svg viewBox="0 0 200 200" className="w-[80%] h-[80%] stroke-iron-gall fill-none stroke-1">
           <path d="M100,20 L100,180 M60,60 L140,60 M50,100 L150,100 M60,140 L140,140" />
           <circle cx="100" cy="50" r="15" />
        </svg>
      </div>

      {/* Z-10: Lunar Disk */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div
          className="w-64 h-64 rounded-full border border-iron-gall/10 bg-white/20 backdrop-blur-sm"
          style={{
            clipPath: status.phase > 0.5
              ? `inset(0 0 0 ${((status.phase - 0.5) * 200)}%)`
              : `inset(0 ${((0.5 - status.phase) * 200)}% 0 0)`
          }}
        />
      </div>

      {/* Z-20: Marginalia */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className={`absolute bottom-20 left-0 text-4xl opacity-40 ${isSnail ? 'animate-creep' : ''}`}>
          {status.marginalia === "Verdigris Snail" && "🐌"}
          {status.marginalia === "White Monastic Cat" && "🐈"}
          {status.marginalia === "Locust-Dragon" && "🐲"}
          {!["Verdigris Snail", "White Monastic Cat", "Locust-Dragon"].includes(status.marginalia) && (
            <span className="text-xs uppercase tracking-tighter">[{status.marginalia}]</span>
          )}
        </div>
      </div>

      {/* Z-30: Typography & Interactive Elements */}
      <div className="relative z-30 flex flex-col items-center text-center p-8">
        <div className="mb-8 flex flex-col items-center gap-2">
          <PlanetarySigil planet={status.subtleRuler} className="w-8 h-8 opacity-60" />
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">
            Ruler: {status.subtleRuler}
          </span>
        </div>

        <h2 className="text-sm uppercase tracking-[0.4em] text-iron-gall opacity-40 mb-12">
          Sublunary Office
        </h2>

        <div className="flex flex-col items-center gap-6">
          <h1 className="text-8xl md:text-9xl font-bastarda text-iron-gall transition-all duration-700">
            {status.office}
          </h1>
          <div className="flex flex-col gap-2">
            <p className="text-2xl italic text-iron-gall opacity-60">Moon in {status.sign}</p>
            <p className="text-xs uppercase tracking-widest text-iron-gall opacity-30">
              Altitude: {status.altitude.toFixed(1)}° // {status.isVoidOfCourse ? "VOID OF COURSE" : "STATIONARY"}
            </p>
          </div>
        </div>

        <button
          onClick={onOpen}
          className="mt-24 px-10 py-3 border border-iron-gall/20 rounded-full hover:border-iron-gall/60 hover:bg-iron-gall/5 transition-all group"
        >
          <span className="text-xs uppercase tracking-widest text-iron-gall opacity-40 group-hover:opacity-100">
            Open the Grimoire
          </span>
        </button>

        <div className="mt-12 text-[10px] uppercase tracking-widest text-iron-gall opacity-20">
          Anti-Hustle // Pocket Monastery
        </div>
      </div>
    </div>
  );
}
