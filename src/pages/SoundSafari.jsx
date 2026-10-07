import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameHeader } from '../components/Celebrate'
import { SOUND_GROUPS } from '../data/sounds'
import { playPhoneme } from '../services/speech'

export default function SoundSafari({ onHome, onComplete }) {
  const [tapped, setTapped] = useState(new Set())
  const allSounds = SOUND_GROUPS.flatMap(g => g.sounds)
  const done = tapped.size >= Math.min(6, allSounds.length)

  const tap = (s) => {
    playPhoneme(s.g, s.cue, s.word)
    setTapped(prev => new Set(prev).add(s.g))
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Sound Safari" onHome={onHome} right={`${tapped.size}/${allSounds.length}`} />
      <p className="text-center text-ink-soft text-sm px-6 mb-4">
        Tap a letter to hear its sound 🔊
      </p>

      <div className="flex-1 overflow-y-auto px-5 pb-6 max-w-md mx-auto w-full">
        {SOUND_GROUPS.map(group => (
          <div key={group.id} className="mb-5">
            <p className="text-ink-soft/50 text-[11px] uppercase tracking-wider mb-2 ml-1">{group.label}</p>
            <div className="grid grid-cols-3 gap-3">
              {group.sounds.map(s => {
                const seen = tapped.has(s.g)
                return (
                  <motion.button key={s.g} whileTap={{ scale: 0.9 }} onClick={() => tap(s)}
                    className="bg-white/80 rounded-2xl py-3 flex flex-col items-center gap-0.5 shadow-sm cursor-pointer relative"
                    style={{ outline: seen ? '2px solid #22C55E' : 'none' }}>
                    <span className="text-3xl">{s.emoji}</span>
                    <span className="font-display text-2xl text-cherry-deep lowercase">{s.g}</span>
                    <span className="text-ink-soft/60 text-[10px]">{s.word}</span>
                    {seen && <span className="absolute top-1 right-1.5 text-leaf text-xs">✓</span>}
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {done && (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.96 }}
            onClick={onComplete}
            className="w-full bg-gradient-to-b from-leaf to-green-600 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            I know my sounds! →
          </motion.button>
        </div>
      )}
    </div>
  )
}
