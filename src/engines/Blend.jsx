import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { playPhoneme, playBlend } from '../services/speech'
import { Progress, NextButton, Prompt } from './shared'

// Tap each sound, then blend. word shape: { word, sounds: [...], emoji }
export default function Blend({ title, color, content, onHome, onComplete }) {
  const words = content.words
  const [i, setI] = useState(0)
  const [revealed, setRevealed] = useState([])
  const [blended, setBlended] = useState(false)

  const w = words[i]
  const isLast = i === words.length - 1
  const ready = revealed.length === w.sounds.length

  const tapSound = (k) => {
    playPhoneme(w.sounds[k], w.sounds[k], null)
    setRevealed(prev => (prev.includes(k) ? prev : [...prev, k]))
  }
  const blend = () => { playBlend(w.sounds, w.word); setBlended(true) }
  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setRevealed([]); setBlended(false)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${words.length}`} />
      <Progress total={words.length} current={i} color={color} />
      <Celebrate show={blended} />
      <Prompt>{blended ? 'You blended it! 🎉' : ready ? 'Now press Blend to push the sounds together!' : 'Tap each sound to hear it'}</Prompt>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-6">{blended ? w.emoji : '❔'}</div>
        <div className="flex gap-2.5 mb-6 flex-wrap justify-center">
          {w.sounds.map((s, k) => {
            const on = revealed.includes(k)
            return (
              <motion.button key={k} whileTap={{ scale: 0.9 }} onClick={() => tapSound(k)}
                animate={blended ? { y: [0, -10, 0] } : {}} transition={{ delay: k * 0.12 }}
                className="min-w-15 h-16 px-3 rounded-2xl flex items-center justify-center font-display text-3xl cursor-pointer shadow-md transition-colors"
                style={{ minWidth: 60, backgroundColor: on ? color : color + '22', color: on ? '#fff' : color }}>
                {s}
              </motion.button>
            )
          })}
        </div>
        {blended && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="font-display text-5xl text-leaf">{w.word}</motion.div>}
      </div>

      {blended ? (
        <NextButton onClick={next} last={isLast} />
      ) : (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button whileTap={{ scale: 0.96 }} onClick={blend} disabled={!ready}
            className="w-full text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md disabled:opacity-30"
            style={{ background: `linear-gradient(to bottom, ${color}, ${color}cc)` }}>
            🧪 Blend!
          </motion.button>
        </div>
      )}
    </div>
  )
}
