import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameHeader } from '../components/Celebrate'
import { speak, playPhoneme } from '../services/speech'
import { NextButton, Prompt } from './shared'

// Tap cards to hear sounds. Card shape:
// { big?, chips?: [], sub?, emoji?, clip?, cue?, word?, color? }
export default function ExploreCards({ title, color, content, onHome, onComplete }) {
  const cards = content.cards
  const [tapped, setTapped] = useState(new Set())
  const done = tapped.size >= cards.length
  const cols = content.cols || 3

  const tap = (c, k) => {
    if (c.clip) playPhoneme(c.clip, c.cue || c.big, c.word)
    else speak(c.word || c.big, { rate: 0.8 })
    setTapped(prev => new Set(prev).add(k))
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${tapped.size}/${cards.length}`} />
      <Prompt>{content.prompt || 'Tap each card to hear its sound 🔊'}</Prompt>

      <div className="flex-1 overflow-y-auto px-5 pb-6 max-w-md mx-auto w-full">
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {cards.map((c, k) => {
            const seen = tapped.has(k)
            const cc = c.color || color
            return (
              <motion.button key={k} whileTap={{ scale: 0.92 }} onClick={() => tap(c, k)}
                className="bg-white/85 rounded-2xl py-3 px-2 flex flex-col items-center gap-1 shadow-sm cursor-pointer relative"
                style={{ outline: seen ? `2px solid ${cc}` : 'none' }}>
                {c.emoji && <span className="text-3xl">{c.emoji}</span>}
                {c.big && <span className="font-display text-3xl" style={{ color: cc }}>{c.big}</span>}
                {c.chips && (
                  <div className="flex flex-wrap justify-center gap-1">
                    {c.chips.map(s => (
                      <span key={s} className="font-display text-xl px-1.5 rounded-md" style={{ color: cc, backgroundColor: cc + '18' }}>{s}</span>
                    ))}
                  </div>
                )}
                {(c.sub || c.word) && <span className="text-ink-soft/70 text-[11px]">{c.sub || c.word}</span>}
                {seen && <span className="absolute top-1.5 right-2 text-xs" style={{ color: cc }}>✓</span>}
              </motion.button>
            )
          })}
        </div>
      </div>

      {done && <NextButton onClick={onComplete} label="Finish level 🎉" />}
    </div>
  )
}
