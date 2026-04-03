import React from 'react'

export function Settings({ config, onUpdate, onBack }) {
  const toggleAlert = (id) => {
    onUpdate({
      ...config,
      alerts: {
        ...config.alerts,
        [id]: !config.alerts[id]
      }
    });
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-8 z-[200] text-vellum">
      <div className="max-w-md w-full space-y-12 bg-iron-gall/20 p-8 rounded-sm border border-vellum/10">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.6em] opacity-40">Ritual Configuration</h2>
          <h1 className="text-4xl font-bastarda">Settings</h1>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest opacity-60">Altitude Alerts</h3>
            <div className="space-y-4">
              {Object.keys(config.alerts).map(id => (
                <div key={id} className="flex items-center justify-between">
                  <label className="text-xl font-serif">{id.charAt(0).toUpperCase() + id.slice(1)}</label>
                  <button
                    onClick={() => toggleAlert(id)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${config.alerts[id] ? 'bg-vellum' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${config.alerts[id] ? 'translate-x-6 bg-iron-gall' : 'bg-vellum/40'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-4 border border-vellum/20 hover:bg-vellum/5 text-xs uppercase tracking-widest"
        >
          Return to Office
        </button>
      </div>
    </div>
  )
}
