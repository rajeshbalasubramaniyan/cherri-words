import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { speak } from '../services/speech'
import { Progress, NextButton, Prompt } from './shared'

// Clap once per syllable. word shape: { word, parts: [...], emoji }
export default function Clap({ title, color, content, onHome, onComplete }) {
  const words = content.words
  const [i, setI] = useState(0)
  const [claps, setClaps] = useState(0)
  const [checked, setChecked] = useState(false)

  const w = words[i]
  const isLast = i === words.length - 1
  const correct = checked && claps === w.parts.length

  const check = () => {
    setChecked(true)
    if (claps === w.parts.length) speak(w.parts.join(', '), { rate: 0.7 })
  }
  const retry = () => { setClaps(0); setChecked(false); speak(w.word, { rate: 0.7 }) }
  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setClaps(0); setChecked(false)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${words.length}`} />
      <Progress total={words.length} current={i} color={color} />
      <Celebrate show={correct} />
      <Prompt>
        {!checked ? 'Say the word slowly. Clap once for each beat!' : correct ? `Yes! ${w.parts.length} beats.` : 'Not quite — listen and try again.'}
      </Prompt>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-3">{w.emoji}</div>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-display text-5xl" style={{ color }}>{correct ? w.parts.join('·') : w.word}</span>
          <SpeakerButton onClick={() => speak(w.word, { rate: 0.7 })} />
        </div>
        <div className="flex gap-2 mb-6 min-h-9">
          {Array.from({ length: claps }).map((_, k) => (
            <motion.span key={k} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-3xl">👏</motion.span>
          ))}
        </div>
        {!checked && (
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => setClaps(c => c + 1)}
            className="w-28 h-28 rounded-full text-white font-display text-xl shadow-lg cursor-pointer"
            style={{ background: `linear-gradient(to bottom, ${color}, ${color}bb)` }}>
            Clap! 👏
          </motion.button>
        )}
      </div>

      {correct ? (
        <NextButton onClick={next} last={isLast} />
      ) : (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button whileTap={{ scale: 0.96 }} onClick={checked ? retry : check} disabled={!checked && claps === 0}
            className="w-full bg-gradient-to-b from-cherry to-cherry-deep text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md disabled:opacity-30">
            {checked ? 'Try again' : 'Check my claps'}
          </motion.button>
        </div>
      )}
    </div>
  )
}
