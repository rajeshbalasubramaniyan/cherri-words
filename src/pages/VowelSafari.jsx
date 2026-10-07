import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameHeader } from '../components/Celebrate'
import { VOWEL_SOUNDS } from '../data/sounds'
import { playPhoneme } from '../services/speech'

export default function VowelSafari({ onHome, onComplete }) {
  const [tapped, setTapped] = useState(new Set())
  const done = tapped.size >= VOWEL_SOUNDS.length

  const tap = (v) => {
    playPhoneme(v.clip, v.name, v.word)
    setTapped(prev => new Set(prev).add(v.clip))
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Vowel Team Safari" onHome={onHome} right={`${tapped.size}/${VOWEL_SOUNDS.length}`} />
      <p className="text-center text-ink-soft text-sm px-6 mb-1">One sound — lots of ways to spell it!</p>
      <p className="text-center text-ink-soft/60 text-xs px-6 mb-4">Tap a card to hear the sound 🔊</p>

      <div className="flex-1 overflow-y-auto px-5 pb-6 max-w-md mx-auto w-full">
        <div className="grid grid-cols-2 gap-3">
          {VOWEL_SOUNDS.map(v => {
            const seen = tapped.has(v.clip)
            return (
              <motion.button key={v.clip} whileTap={{ scale: 0.93 }} onClick={() => tap(v)}
                className="bg-white/85 rounded-2xl p-3 flex flex-col items-center gap-1 shadow-sm cursor-pointer relative"
                style={{ outline: seen ? `2px solid ${v.color}` : 'none' }}>
                <span className="text-3xl">{v.emoji}</span>
                <div className="flex flex-wrap justify-center gap-1">
                  {v.spellings.map(s => (
                    <span key={s} className="font-display text-xl px-1.5 rounded-md"
                      style={{ color: v.color, backgroundColor: v.color + '18' }}>{s}</span>
                  ))}
                </div>
                <span className="text-ink-soft/70 text-[11px]">{v.name} · {v.word}</span>
                {seen && <span className="absolute top-1.5 right-2 text-xs" style={{ color: v.color }}>✓</span>}
              </motion.button>
            )
          })}
        </div>
      </div>

      {done && (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.96 }}
            onClick={onComplete}
            className="w-full bg-gradient-to-b from-leaf to-green-600 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            I know my vowel teams! →
          </motion.button>
        </div>
      )}
    </div>
  )
}
