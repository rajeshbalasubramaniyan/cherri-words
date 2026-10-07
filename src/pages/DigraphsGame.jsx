import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameHeader } from '../components/Celebrate'
import { DIGRAPHS } from '../data/sounds'
import { speakSound } from '../services/speech'

export default function DigraphsGame({ onHome, onComplete }) {
  const [tapped, setTapped] = useState(new Set())
  const done = tapped.size >= DIGRAPHS.length

  const tap = (d) => {
    speakSound(d.cue, d.word)
    setTapped(prev => new Set(prev).add(d.g))
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Two Make One" onHome={onHome} right={`${tapped.size}/${DIGRAPHS.length}`} />
      <p className="text-center text-ink-soft text-sm px-6 mb-1">Two letters that make just <b>one</b> sound!</p>
      <p className="text-center text-ink-soft/60 text-xs px-6 mb-5">Tap each one to hear it 🔊</p>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {DIGRAPHS.map(d => {
            const seen = tapped.has(d.g)
            return (
              <motion.button key={d.g} whileTap={{ scale: 0.92 }} onClick={() => tap(d)}
                className="bg-white/80 rounded-2xl py-5 flex flex-col items-center gap-1 shadow-sm cursor-pointer relative"
                style={{ outline: seen ? '2px solid #8B5CF6' : 'none' }}>
                <span className="text-4xl">{d.emoji}</span>
                <span className="font-display text-4xl text-grape lowercase">{d.g}</span>
                <span className="text-ink-soft/60 text-xs">{d.word}</span>
                {seen && <span className="absolute top-2 right-2.5 text-leaf">✓</span>}
              </motion.button>
            )
          })}
        </div>
      </div>

      {done && (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.96 }} onClick={onComplete}
            className="w-full bg-gradient-to-b from-leaf to-green-600 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            Got it! →
          </motion.button>
        </div>
      )}
    </div>
  )
}
