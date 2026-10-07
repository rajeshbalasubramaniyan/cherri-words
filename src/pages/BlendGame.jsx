import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { BLEND_WORDS } from '../data/words'
import { playPhoneme, playBlend } from '../services/speech'

export default function BlendGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [revealed, setRevealed] = useState([])
  const [blended, setBlended] = useState(false)

  const item = BLEND_WORDS[round]
  const isLast = round === BLEND_WORDS.length - 1
  const allRevealed = revealed.length === item.sounds.length

  const tapSound = (i) => {
    playPhoneme(item.sounds[i], item.sounds[i], null)
    setRevealed(prev => prev.includes(i) ? prev : [...prev, i])
  }

  const blend = () => {
    playBlend(item.sounds, item.word)
    setBlended(true)
  }

  const next = () => {
    if (isLast) { onComplete?.(); return }
    setRound(round + 1); setRevealed([]); setBlended(false)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Blend It!" onHome={onHome} right={`${round + 1}/${BLEND_WORDS.length}`} />
      <Celebrate show={blended} />

      <p className="text-center text-ink-soft text-sm px-6 mb-2">
        {blended ? 'You blended the word! 🎉' : allRevealed ? 'Now press Blend to join them!' : 'Tap each sound to hear it'}
      </p>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-6">{item.emoji}</div>

        <div className="flex gap-3 mb-8">
          {item.sounds.map((s, i) => {
            const shown = revealed.includes(i)
            return (
              <motion.button key={i} whileTap={{ scale: 0.9 }} onClick={() => tapSound(i)}
                animate={blended ? { y: [0, -10, 0] } : {}} transition={{ delay: i * 0.12 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-display text-3xl cursor-pointer shadow-md transition-colors"
                style={{ backgroundColor: shown ? '#FF4D4D' : '#FFE3E3', color: shown ? '#fff' : '#E02424' }}>
                {s}
              </motion.button>
            )
          })}
        </div>

        {blended && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="font-display text-4xl text-leaf mb-2">{item.word}</motion.div>
        )}
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full space-y-3">
        {!blended ? (
          <motion.button whileTap={{ scale: 0.96 }} onClick={blend} disabled={!allRevealed}
            className="w-full bg-gradient-to-b from-cherry to-cherry-deep text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md disabled:opacity-30">
            🧪 Blend!
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
