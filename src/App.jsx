import { useState, useEffect } from 'react'
import WelcomePage from './pages/WelcomePage'
import BandPicker from './pages/BandPicker'
import BandMap from './pages/BandMap'
import CreditsPage from './pages/CreditsPage'
import { ENGINES } from './engines'
import { getBand } from './curriculum'
import { initVoices, stopSpeech } from './services/speech'

const PROGRESS_KEY = 'cherri-words-progress-v2'
const BAND_KEY = 'cherri-words-band'

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable */ }
}

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [bandId, setBandId] = useState(() => load(BAND_KEY, null))
  const [level, setLevel] = useState(null)
  const [progress, setProgress] = useState(() => load(PROGRESS_KEY, {}))

  useEffect(() => { initVoices() }, [])
  useEffect(() => { save(PROGRESS_KEY, progress) }, [progress])
  useEffect(() => { if (bandId) save(BAND_KEY, bandId) }, [bandId])

  const band = bandId ? getBand(bandId) : null

  const start = () => setScreen(band ? 'map' : 'bands')
  const pickBand = (id) => { setBandId(id); setScreen('map') }
  const play = (l) => { setLevel(l); setScreen('play') }
  const backToMap = () => { stopSpeech(); setScreen('map') }
  const complete = () => {
    setProgress(p => ({ ...p, [`${band.id}/${level.id}`]: true }))
    backToMap()
  }

  if (screen === 'play' && band && level) {
    const Engine = ENGINES[level.engine]
    return (
      <div className="relative min-h-[100dvh]">
        <Engine key={`${band.id}/${level.id}`} title={level.title} color={band.color} content={level.content}
          onHome={backToMap} onComplete={complete} />
      </div>
    )
  }

  return (
    <div className="relative min-h-[100dvh]">
      {screen === 'welcome' && <WelcomePage onStart={start} onCredits={() => setScreen('credits')} />}
      {screen === 'credits' && <CreditsPage onHome={() => setScreen('welcome')} />}
      {screen === 'bands' && <BandPicker progress={progress} onPick={pickBand} onHome={() => setScreen('welcome')} />}
      {screen === 'map' && band && (
        <BandMap band={band} progress={progress} onPlay={play}
          onChangeBand={() => setScreen('bands')} onHome={() => setScreen('welcome')} />
      )}
    </div>
  )
}
