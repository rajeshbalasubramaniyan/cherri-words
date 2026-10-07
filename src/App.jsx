import { useState, useEffect } from 'react'
import WelcomePage from './pages/WelcomePage'
import LevelMap from './pages/LevelMap'
import SoundSafari from './pages/SoundSafari'
import BlendGame from './pages/BlendGame'
import FamilyGame from './pages/FamilyGame'
import DigraphsGame from './pages/DigraphsGame'
import MagicEGame from './pages/MagicEGame'
import SortSoundGame from './pages/SortSoundGame'
import TrickyGame from './pages/TrickyGame'
import GrammarGame from './pages/GrammarGame'
import SentenceGame from './pages/SentenceGame'
import SyllableGame from './pages/SyllableGame'
import MorphGame from './pages/MorphGame'
import RulesGame from './pages/RulesGame'
import HomophoneGame from './pages/HomophoneGame'
import PunctuationGame from './pages/PunctuationGame'
import CreditsPage from './pages/CreditsPage'
import VowelSafari from './pages/VowelSafari'
import { initVoices } from './services/speech'

const PROGRESS_KEY = 'cherri-words-progress'
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') } catch { return {} }
}

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [completed, setCompleted] = useState(loadProgress)

  useEffect(() => { initVoices() }, [])
  useEffect(() => {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed)) } catch { /* ignore */ }
  }, [completed])

  const goMap = () => setScreen('map')
  const markDone = (id) => { setCompleted(p => ({ ...p, [id]: true })); setScreen('map') }

  const games = {
    sounds: <SoundSafari onHome={goMap} onComplete={() => markDone('sounds')} />,
    blend: <BlendGame onHome={goMap} onComplete={() => markDone('blend')} />,
    family: <FamilyGame onHome={goMap} onComplete={() => markDone('family')} />,
    digraphs: <DigraphsGame onHome={goMap} onComplete={() => markDone('digraphs')} />,
    vowels: <VowelSafari onHome={goMap} onComplete={() => markDone('vowels')} />,
    magice: <MagicEGame onHome={goMap} onComplete={() => markDone('magice')} />,
    sortsound: <SortSoundGame onHome={goMap} onComplete={() => markDone('sortsound')} />,
    tricky: <TrickyGame onHome={goMap} onComplete={() => markDone('tricky')} />,
    grammar: <GrammarGame onHome={goMap} onComplete={() => markDone('grammar')} />,
    sentence: <SentenceGame onHome={goMap} onComplete={() => markDone('sentence')} />,
    syllables: <SyllableGame onHome={goMap} onComplete={() => markDone('syllables')} />,
    morph: <MorphGame onHome={goMap} onComplete={() => markDone('morph')} />,
    rules: <RulesGame onHome={goMap} onComplete={() => markDone('rules')} />,
    homophones: <HomophoneGame onHome={goMap} onComplete={() => markDone('homophones')} />,
    punctuation: <PunctuationGame onHome={goMap} onComplete={() => markDone('punctuation')} />,
  }

  return (
    <div className="relative min-h-[100dvh]">
      {screen === 'welcome' && <WelcomePage onStart={goMap} onCredits={() => setScreen('credits')} />}
      {screen === 'credits' && <CreditsPage onHome={() => setScreen('welcome')} />}
      {screen === 'map' && <LevelMap onHome={() => setScreen('welcome')} onPlay={(g) => setScreen(g)} completed={completed} />}
      {games[screen]}
    </div>
  )
}
