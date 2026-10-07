import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { MAGIC_E } from '../data/words'
import { speak, playPhoneme } from '../services/speech'

export default function MagicEGame({ onHome, onComplete }) {
  const [i, setI] = useState(0)
  const [magic, setMagic] = useState(false)

  const item = MAGIC_E[i]
  const isLast = i === MAGIC_E.length - 1

  const castSpell = () => {
    setMagic(true)
    speak(item.short, { rate: 0.8 })
    setTimeout(() => playPhoneme(item.sound, item.long, item.long), 900)
  }

  const next = () => {
    if (isLast) { onComplete?.(); return }
    setI(i + 1); setMagic(false)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Magic E" onHome={onHome} right={`${i + 1}/${MAGIC_E.length}`} />
      <Celebrate show={magic} />

      <p className="text-center text-ink-soft text-sm px-6 mb-2">
        {magic ? `The 'e' is silent, but it makes the vowel say its name!` : `Add a magic 'e' to change the word!`}
      </p>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-8">{item.emoji}</div>

        <div className="flex items-end font-display text-6xl mb-8">
          <span className="text-ink">{item.short}</span>
          <AnimatePresence>
            {magic && (
              <motion.span initial={{ scale: 0, rotate: -40, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }}
                className="text-sun" style={{ color: '#D97706' }}>e</motion.span>
            )}
          </AnimatePresence>
        </div>

        {magic && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-ink-soft text-sm">
            <span className="line-through opacity-50">{item.short}</span> &nbsp;→&nbsp;
            <b className="text-leaf text-lg">{item.long}</b>
          </motion.p>
        )}
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full">
        {!magic ? (
          <motion.button whileTap={{ scale: 0.96 }} onClick={castSpell}
            className="w-full bg-gradient-to-b from-sun to-amber-500 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
            style={{ background: 'linear-gradient(to bottom, #FBBF24, #D97706)' }}>
            ✨ Add Magic E
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
