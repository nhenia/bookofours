import React, { useState, useEffect } from 'react'
import { getLunarStatus } from './utils/lunar'
import { saveLog, getLogs } from './utils/storage'
import { getCoordinates } from './utils/geo'
import { generateAlmanac } from './utils/pdfGenerator'
import { LockScreen } from './components/LockScreen'
import { Grimoire } from './components/Grimoire'
import { BindingMode } from './components/BindingMode'
import { Settings } from './components/Settings'

function App() {
  const [view, setView] = useState('lock-screen')
  const [coords, setCoords] = useState({ lat: 40.7128, lng: -74.0060 })
  const [status, setStatus] = useState(getLunarStatus(new Date(), coords))
  const [logs, setLogs] = useState(getLogs())
  const [config, setConfig] = useState({
    alerts: {
      matins: true,
      lauds: true,
      prime: true,
      terce: true,
      sext: true,
      none: true,
      vespers: true,
      compline: true,
      altitude: true
    }
  })

  // Initialize coordinates
  useEffect(() => {
    getCoordinates().then(setCoords)
  }, [])

  // Update lunar status every 1 minute for better precision
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getLunarStatus(new Date(), coords))
    }, 60000)
    return () => clearInterval(timer)
  }, [coords])

  const handleSaveLog = (content) => {
    const newLog = saveLog(content, status)
    setLogs(prev => [...prev, newLog])
    setView('lock-screen')
  }

  const handleBind = () => {
    generateAlmanac(logs, status)
    setView('lock-screen')
  }

  return (
    <div className={`min-h-screen bg-black text-vellum font-serif overflow-x-hidden ${status.isVoidOfCourse ? 'asemic-mode' : ''}`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vellum/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {view === 'lock-screen' && (
          <>
            <LockScreen
              status={status}
              onOpen={() => setView('grimoire')}
            />
            <div className="fixed top-8 left-8 flex gap-4 z-50">
              <button
                onClick={() => setView('settings')}
                className="text-[10px] uppercase tracking-widest opacity-20 hover:opacity-100 border border-vellum/20 px-4 py-2 pointer-events-auto"
              >
                Settings
              </button>
            </div>

            {status.isDarkMoon && (
              <button
                onClick={() => setView('binding-mode')}
                className="fixed top-8 right-8 text-[10px] uppercase tracking-[0.2em] border border-vellum/20 px-4 py-2 hover:bg-vellum/10 transition-all animate-glow-pulse pointer-events-auto z-50"
              >
                Binding Mode Available
              </button>
            )}

            <button
              onClick={() => setView('binding-mode')}
              className="fixed bottom-4 right-4 text-[8px] uppercase tracking-widest opacity-10 hover:opacity-100"
            >
              Force Binding Mode
            </button>
          </>
        )}

        {view === 'grimoire' && (
          <Grimoire
            status={status}
            onSave={handleSaveLog}
            onBack={() => setView('lock-screen')}
          />
        )}

        {view === 'binding-mode' && (
          <BindingMode
            logsCount={logs.length}
            onBind={handleBind}
            onBack={() => setView('lock-screen')}
          />
        )}

        {view === 'settings' && (
          <Settings
            config={config}
            onUpdate={setConfig}
            onBack={() => setView('lock-screen')}
          />
        )}
      </div>
    </div>
  )
}

export default App
