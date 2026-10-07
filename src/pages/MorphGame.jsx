import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { MORPH_ROUNDS } from '../data/advanced'
import { speak } from '../services/speech'

export default function MorphGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [added, setAdded] = useState(false)

  const item = MORPH_ROUNDS[round]
  const isLast = round === MORPH_ROUNDS.length - 1
  const isPrefix = item.type === 'prefix'

  const add = () => {
    setAdded(true)
    speak(item.root, { rate: 0.8 })
    setTimeout(() => speak(item.result, { rate: 0.8 }), 800)
  }

  const next = () => {
    if (isLast) { onComplete?.(); return }
    setRound(round + 1); setAdded(false)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Word Builder" onHome={onHome} right={`${round + 1}/${MORPH_ROUNDS.length}`} />
      <Celebrate show={added} />

      <p className="text-center text-ink-soft text-sm px-6 mb-2">
        {added
          ? `"${item.result}" means ${item.means}!`
          : `Add the ${item.type} "${item.affix}" to make a new word`}
      </p>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-8">{item.emoji}</div>

        <div className="flex items-center font-display text-5xl mb-6">
          <AnimatePresence>
            {added && isPrefix && (
              <motion.span initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: 0 }}
                className="text-teal-600" style={{ color: '#0D9488' }}>{item.affix}</motion.span>
            )}
          </AnimatePresence>
          <span className="text-ink">{item.root}</span>
          <AnimatePresence>
            {added && !isPrefix && (
              <motion.span initial={{ scale: 0, x: 20 }} animate={{ scale: 1, x: 0 }}
                className="text-teal-600" style={{ color: '#0D9488' }}>{item.affix}</motion.span>
            )}
          </AnimatePresence>
        </div>

        {added && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 rounded-2xl px-5 py-3 text-center shadow-sm">
            <p className="font-display text-2xl text-leaf">{item.result}</p>
            <p className="text-ink-soft text-xs mt-0.5">{item.means}</p>
          </motion.div>
        )}
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full">
        {!added ? (
          <motion.button whileTap={{ scale: 0.96 }} onClick={add}
            className="w-full text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
            style={{ background: 'linear-gradient(to bottom, #14B8A6, #0D9488)' }}>
            🔧 Add "{item.affix}"
          </motion.button>
        ) : (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.96 }} onClick={next}
            className="w-full bg-gradient-to-b from-leaf to-green-600 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            {isLast ? 'Finish 🎉' : 'Next Word →'}
          </motion.button>
        )}
      </div>
    </div>
  )
}
