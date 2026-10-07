import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { HOMOPHONE_ROUNDS } from '../data/advanced'
import { speak } from '../services/speech'

export default function HomophoneGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState(null)

  const r = HOMOPHONE_ROUNDS[round]
  const isLast = round === HOMOPHONE_ROUNDS.length - 1
  const correct = picked === r.answer
  const fullSentence = r.sentence[0] + r.answer + (r.sentence[1] || '')

  const choose = (opt) => {
    if (correct) return
    setPicked(opt)
    if (opt === r.answer) {
      speak(fullSentence, { rate: 0.85 })
      setTimeout(() => { if (isLast) onComplete?.(); else { setRound(round + 1); setPicked(null) } }, 1500)
    } else {
      setTimeout(() => setPicked(null), 600)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Sound-Alikes" onHome={onHome} right={`${round + 1}/${HOMOPHONE_ROUNDS.length}`} />
      <Celebrate show={correct} />

      <p className="text-center text-ink-soft text-sm px-6 mb-1">
        These words sound the <b>same</b> but are spelled <b>differently!</b>
      </p>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-6">{r.emoji}</div>

        <div className="font-display text-3xl text-ink mb-8 leading-relaxed max-w-sm flex items-center justify-center flex-wrap gap-x-2">
          <span>{r.sentence[0]}</span>
          <span className="inline-flex items-center justify-center min-w-20 px-3 py-1 rounded-xl border-2 border-dashed"
            style={{ borderColor: correct ? '#22C55E' : '#C4B5FD',
              backgroundColor: correct ? '#22C55E' : 'transparent', color: correct ? '#fff' : '#9333EA' }}>
            {correct ? r.answer : '?'}
          </span>
          <span>{r.sentence[1]}</span>
        </div>

        <SpeakerButton onClick={() => speak(r.sentence.join(' blank '), { rate: 0.8 })} size="sm" label="Hear the sentence" />
      </div>

      <div className="px-4 pb-8 max-w-md mx-auto w-full">
        <div className={`grid gap-3 ${r.options.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {r.options.map(opt => {
            const wrong = picked === opt && opt !== r.answer
            const right = correct && opt === r.answer
            return (
              <motion.button key={opt} whileTap={{ scale: 0.93 }}
                animate={wrong ? { x: [0, -6, 6, 0] } : {}} onClick={() => choose(opt)}
                className="rounded-2xl py-4 font-display text-xl cursor-pointer shadow-sm transition-colors"
                style={{ backgroundColor: right ? '#22C55E' : wrong ? '#fecaca' : '#fff',
                  color: right ? '#fff' : '#2A2320' }}>
                {opt}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
