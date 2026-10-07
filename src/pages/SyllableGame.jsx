import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { SYLLABLE_WORDS } from '../data/advanced'
import { speak } from '../services/speech'

export default function SyllableGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [claps, setClaps] = useState(0)
  const [checked, setChecked] = useState(false)

  const item = SYLLABLE_WORDS[round]
  const isLast = round === SYLLABLE_WORDS.length - 1
  const correct = claps === item.parts.length

  const clap = () => {
    if (checked) return
    setClaps(c => c + 1)
    speak('clap', { rate: 1.2, pitch: 1.3 })
  }

  const check = () => {
    setChecked(true)
    if (claps === item.parts.length) {
      speak(item.parts.join(' ... '), { rate: 0.7 })
    }
  }

  const next = () => {
    if (isLast) { onComplete?.(); return }
    setRound(round + 1); setClaps(0); setChecked(false)
  }

  const reset = () => { setClaps(0); setChecked(false) }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Clap the Beats" onHome={onHome} right={`${round + 1}/${SYLLABLE_WORDS.length}`} />
      <Celebrate show={checked && correct} />

      <p className="text-center text-ink-soft text-sm px-6 mb-2">
        {checked
          ? correct ? `Yes! ${item.parts.join('-')} has ${item.parts.length} beats.` : `Not quite — listen again and try!`
          : 'Clap once for each beat you hear'}
      </p>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-3">{item.emoji}</div>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-display text-5xl text-cherry-deep">
            {checked && correct ? item.parts.join('-') : item.word}
          </span>
          <SpeakerButton onClick={() => speak(item.word, { rate: 0.7 })} />
        </div>

        {/* clap counter dots */}
        <div className="flex gap-2 mb-8 min-h-8">
          {Array.from({ length: claps }).map((_, i) => (
            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-3xl">👏</motion.span>
          ))}
        </div>

        {!checked ? (
          <motion.button whileTap={{ scale: 0.9 }} onClick={clap}
            className="w-32 h-32 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 text-white font-display text-xl shadow-lg cursor-pointer flex items-center justify-center"
            style={{ background: 'linear-gradient(to bottom, #FB923C, #EA580C)' }}>
            Clap! 👏
          </motion.button>
        ) : (
          <div className="font-display text-4xl" style={{ color: correct ? '#22C55E' : '#EF4444' }}>
            {claps} {claps === 1 ? 'beat' : 'beats'}
          </div>
        )}
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full space-y-3">
        {!checked ? (
          <motion.button whileTap={{ scale: 0.96 }} onClick={check} disabled={claps === 0}
            className="w-full bg-gradient-to-b from-cherry to-cherry-deep text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md disabled:opacity-30">
            Check my claps
          </motion.button>
        ) : correct ? (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.96 }} onClick={next}
            className="w-full bg-gradient-to-b from-leaf to-green-600 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            {isLast ? 'Finish 🎉' : 'Next Word →'}
          </motion.button>
        ) : (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.96 }} onClick={reset}
            className="w-full bg-gradient-to-b from-sun to-amber-500 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
            style={{ background: 'linear-gradient(to bottom, #FBBF24, #D97706)' }}>
            Try Again
          </motion.button>
        )}
      </div>
    </div>
  )
}
