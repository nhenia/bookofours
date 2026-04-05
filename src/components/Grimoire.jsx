import React, { useState, useRef, useEffect } from 'react'

export function Grimoire({ status, onSave, onBack }) {
  const [content, setContent] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleSave = () => {
    if (content.trim()) {
      onSave(content)
      setContent('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 md:p-12 z-50 overflow-auto">
      <div className="w-full max-w-3xl min-h-[90vh] bg-vellum text-iron-gall p-8 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col">

        {/* Vellum Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]"></div>

        {/* Header - Metadata */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-4 relative z-10">
          <div>
            <h2 className="text-3xl font-bastarda italic text-iron-gall mb-1">
              Logged during the Hour of {status.office}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-widest opacity-60">
              <span>Moon in {status.sign}</span>
              <span>•</span>
              <span>{status.marginalia}</span>
            </div>
          </div>
          <button
            onClick={onBack}
            className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
          >
            Close
          </button>
        </div>

        {/* Input Area */}
        <div className="flex-grow flex flex-col relative z-10">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none text-2xl font-serif leading-relaxed resize-none placeholder:text-iron-gall/10"
            placeholder="Log your working thoughts, tarot pulls, or rants..."
          />
        </div>

        {/* Footer - Save Action */}
        <div className="mt-8 flex justify-between items-end relative z-10">
          <div className="text-[10px] uppercase tracking-widest opacity-30 italic">
            Zero Surveillance / Local Artifact
          </div>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className={`px-8 py-2 border border-iron-gall rounded-sm transition-all text-xs uppercase tracking-widest ${
              content.trim() ? 'hover:bg-iron-gall hover:text-vellum' : 'opacity-20 cursor-not-allowed'
            }`}
          >
            Seal Entry
          </button>
        </div>

        {/* Iron-gall cursor effect simulation (bottom border) */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-iron-gall/10 overflow-hidden">
          {content.length > 0 && (
            <div className="h-full bg-iron-gall/40 transition-all duration-300" style={{ width: `${Math.min(100, content.length / 5)}%` }}></div>
          )}
        </div>
      </div>
    </div>
  )
}
