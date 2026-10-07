import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { PUNCT_ROUNDS } from '../data/advanced'
import { speak } from '../services/speech'

const MARKS = [
  { m: '.', name: 'Full stop', color: '#3B82F6' },
  { m: '?', name: 'Question', color: '#F97316' },
  { m: '!', name: 'Exclaim', color: '#EF4444' },
]

export default function PunctuationGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState(null)

  const r = PUNCT_ROUNDS[round]
  const isLast = round === PUNCT_ROUNDS.length - 1
  const correct = picked === r.answer

  const choose = (m) => {
    if (correct) return
    setPicked(m)
    if (m === r.answer) {
      speak(r.text, { rate: 0.85, pitch: m === '?' ? 1.2 : m === '!' ? 1.3 : 1.05 })
      setTimeout(() => { if (isLast) onComplete?.(); else { setRound(round + 1); setPicked(null) } }, 1400)
    } else {
      setTimeout(() => setPicked(null), 600)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Punctuation Power" onHome={onHome} right={`${round + 1}/${PUNCT_ROUNDS.length}`} />
      <Celebrate show={correct} />

      <p className="text-center text-ink-soft text-sm px-6 mb-1">Which mark ends this sentence?</p>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-6">{r.emoji}</div>

        <div className="font-display text-3xl text-ink mb-3 max-w-sm">
          {r.text}
          <span style={{ color: correct ? '#22C55E' : '#CBD5E1' }}>{correct ? r.answer : '_'}</span>
        </div>

        {correct && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-leaf text-sm mb-2">{r.type}</motion.p>
        )}
        <SpeakerButton onClick={() => speak(r.text, { rate: 0.85 })} size="sm" />
      </div>

      <div className="px-4 pb-8 max-w-md mx-auto w-full">
        <div className="grid grid-cols-3 gap-3">
          {MARKS.map(({ m, name, color }) => {
            const wrong = picked === m && m !== r.answer
            const right = correct && m === r.answer
            return (
              <motion.button key={m} whileTap={{ scale: 0.92 }}
                animate={wrong ? { x: [0, -6, 6, 0] } : {}} onClick={() => choose(m)}
                className="rounded-2xl py-4 flex flex-col items-center gap-1 cursor-pointer shadow-sm transition-colors"
                style={{ backgroundColor: right ? color : wrong ? '#fecaca' : '#fff',
                  color: right ? '#fff' : color }}>
                <span className="font-display text-4xl leading-none">{m}</span>
                <span className="text-[10px]" style={{ color: right ? '#fff' : '#6B625C' }}>{name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
