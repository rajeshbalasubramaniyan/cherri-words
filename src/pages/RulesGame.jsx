import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { SPELLING_RULES } from '../data/advanced'
import { speak } from '../services/speech'

export default function RulesGame({ onHome, onComplete }) {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(false)

  const r = SPELLING_RULES[i]
  const isLast = i === SPELLING_RULES.length - 1

  const reveal = () => {
    setShown(true)
    speak(r.base, { rate: 0.8 })
    setTimeout(() => speak(r.result, { rate: 0.8 }), 800)
  }

  const next = () => {
    if (isLast) { onComplete?.(); return }
    setI(i + 1); setShown(false)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Spelling Rules" onHome={onHome} right={`${i + 1}/${SPELLING_RULES.length}`} />
      <Celebrate show={shown} />

      <div className="flex justify-center gap-1.5 mb-4 mt-1">
        {SPELLING_RULES.map((_, k) => (
          <div key={k} className={`h-1.5 rounded-full transition-all ${k <= i ? 'w-5' : 'w-1.5 bg-ink/10'}`}
            style={k <= i ? { backgroundColor: r.color } : {}} />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-display text-3xl mb-6" style={{ color: r.color }}>{r.name}</h2>

        <div className="flex items-center gap-3 font-display text-4xl mb-6">
          <span className="text-ink">{r.base}</span>
          <span className="text-ink-soft text-2xl">+ {r.ending}</span>
          <span className="text-ink-soft">=</span>
          <AnimatePresence mode="wait">
            {shown ? (
              <motion.span key="result" initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: r.color }}>
                {r.result}
              </motion.span>
            ) : (
              <motion.span key="q" className="text-ink-soft/40">?</motion.span>
            )}
          </AnimatePresence>
        </div>

        {shown && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 rounded-2xl px-5 py-4 max-w-sm shadow-sm">
            <p className="text-ink text-sm leading-relaxed">{r.rule}</p>
          </motion.div>
        )}
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full">
        {!shown ? (
          <motion.button whileTap={{ scale: 0.96 }} onClick={reveal}
            className="w-full text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
            style={{ background: `linear-gradient(to bottom, ${r.color}, ${r.color}cc)` }}>
            Show me the rule
          </motion.button>
        ) : (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.96 }} onClick={next}
            className="w-full bg-gradient-to-b from-leaf to-green-600 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            {isLast ? 'Finish 🎉' : 'Next Rule →'}
          </motion.button>
        )}
      </div>
    </div>
  )
}
