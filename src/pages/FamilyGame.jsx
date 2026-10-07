import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { WORD_FAMILIES } from '../data/words'
import { speak } from '../services/speech'

export default function FamilyGame({ onHome, onComplete }) {
  const [fi, setFi] = useState(0)
  const [used, setUsed] = useState(new Set())

  const fam = WORD_FAMILIES[fi]
  const [onset, setOnset] = useState(fam.onsets[0])
  const word = onset + fam.rime
  const isLast = fi === WORD_FAMILIES.length - 1
  const allUsed = used.size >= fam.onsets.length

  const pick = (o) => {
    setOnset(o)
    speak(o + fam.rime, { rate: 0.8 })
    setUsed(prev => new Set(prev).add(o))
  }

  const next = () => {
    if (isLast) { onComplete?.(); return }
    const nf = WORD_FAMILIES[fi + 1]
    setFi(fi + 1); setOnset(nf.onsets[0]); setUsed(new Set())
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Word Family Machine" onHome={onHome} right={`${fi + 1}/${WORD_FAMILIES.length}`} />
      <Celebrate show={allUsed} />

      <p className="text-center text-ink-soft text-sm px-6 mb-4">
        Swap the first sound to make a new word — tap to hear it!
      </p>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-5xl mb-6">{fam.emoji}</div>

        <div className="flex items-center gap-1 mb-8">
          <AnimatePresence mode="wait">
            <motion.span key={onset} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="font-display text-6xl text-cherry">{onset}</motion.span>
          </AnimatePresence>
          <span className="font-display text-6xl text-ink">{fam.rime}</span>
        </div>

        <div className="flex flex-wrap gap-2 justify-center max-w-xs">
          {fam.onsets.map(o => (
            <motion.button key={o} whileTap={{ scale: 0.9 }} onClick={() => pick(o)}
              className="w-12 h-12 rounded-xl font-display text-2xl cursor-pointer shadow-sm transition-colors"
              style={{ backgroundColor: onset === o ? '#FF4D4D' : '#fff', color: onset === o ? '#fff' : '#E02424',
                outline: used.has(o) ? '2px solid #22C55E' : 'none' }}>
              {o}
            </motion.button>
          ))}
        </div>
      </div>

      {allUsed && (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.96 }} onClick={next}
            className="w-full bg-gradient-to-b from-leaf to-green-600 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            {isLast ? 'Finish 🎉' : 'Next Family →'}
          </motion.button>
        </div>
      )}
    </div>
  )
}
