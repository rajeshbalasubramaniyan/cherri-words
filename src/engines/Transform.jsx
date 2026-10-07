import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { speak, playPhoneme } from '../services/speech'
import { shuffle, Progress, NextButton, Explain, Prompt } from './shared'

// Join parts to make a new word. Item shape:
// { parts: [a, b], result, emoji?, explain?, sound? (vowel clip to play), options? (makes it a choice) }
export default function Transform({ title, color, content, onHome, onComplete }) {
  const items = content.items
  const [i, setI] = useState(0)
  const [done, setDone] = useState(false)
  const [wrong, setWrong] = useState(null)

  const it = items[i]
  const isLast = i === items.length - 1
  const options = useMemo(() => (it.options ? shuffle(it.options) : null), [i])

  const reveal = () => {
    setDone(true)
    if (it.sound) {
      speak(it.parts[0], { rate: 0.8 })
      setTimeout(() => playPhoneme(it.sound, it.result, it.result), 900)
    } else {
      speak(it.result, { rate: 0.8 })
    }
  }

  const choose = (opt) => {
    if (done) return
    if (opt === it.result) reveal()
    else { setWrong(opt); setTimeout(() => setWrong(null), 600) }
  }

  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setDone(false); setWrong(null)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${items.length}`} />
      <Progress total={items.length} current={i} color={color} />
      <Celebrate show={done} />
      <Prompt>{content.prompt}</Prompt>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {it.emoji && <div className="text-6xl mb-5">{it.emoji}</div>}

        <div className="flex items-center justify-center flex-wrap gap-2 font-display text-3xl sm:text-4xl">
          <span className="text-ink">{it.parts[0]}</span>
          <span className="text-ink-soft/50 text-2xl">+</span>
          <span style={{ color }}>{it.parts[1]}</span>
          <span className="text-ink-soft/50 text-2xl">=</span>
          {done ? (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-leaf">{it.result}</motion.span>
          ) : (
            <span className="text-ink-soft/30">?</span>
          )}
        </div>

        {done && <Explain text={it.explain} color={color} />}
      </div>

      {done ? (
        <NextButton onClick={next} last={isLast} />
      ) : options ? (
        <div className="px-4 pb-8 max-w-md mx-auto w-full">
          <div className="grid grid-cols-1 gap-3">
            {options.map(opt => (
              <motion.button key={opt} whileTap={{ scale: 0.95 }} onClick={() => choose(opt)}
                animate={wrong === opt ? { x: [0, -6, 6, -6, 0] } : {}}
                className="rounded-2xl py-3 font-display text-2xl cursor-pointer shadow-sm"
                style={{ backgroundColor: wrong === opt ? '#FECACA' : '#fff' }}>
                {opt}
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button whileTap={{ scale: 0.96 }} onClick={reveal}
            className="w-full text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
            style={{ background: `linear-gradient(to bottom, ${color}, ${color}cc)` }}>
            ✨ Join them!
          </motion.button>
        </div>
      )}
    </div>
  )
}
