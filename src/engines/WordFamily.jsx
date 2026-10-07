import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { speak } from '../services/speech'
import { Progress, NextButton, Prompt } from './shared'

// Swap the first sound. family shape: { rime, emoji, onsets: [...] }
export default function WordFamily({ title, color, content, onHome, onComplete }) {
  const fams = content.families
  const [fi, setFi] = useState(0)
  const [onset, setOnset] = useState(fams[0].onsets[0])
  const [used, setUsed] = useState(new Set())

  const fam = fams[fi]
  const isLast = fi === fams.length - 1
  const allUsed = used.size >= fam.onsets.length

  const pick = (o) => { setOnset(o); speak(o + fam.rime, { rate: 0.8 }); setUsed(prev => new Set(prev).add(o)) }
  const next = () => {
    if (isLast) { onComplete(); return }
    setFi(fi + 1); setOnset(fams[fi + 1].onsets[0]); setUsed(new Set())
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${fi + 1}/${fams.length}`} />
      <Progress total={fams.length} current={fi} color={color} />
      <Celebrate show={allUsed} />
      <Prompt>Swap the first sound to make new words — try them all!</Prompt>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-5xl mb-6">{fam.emoji}</div>
        <div className="flex items-center gap-1 mb-2">
          <AnimatePresence mode="wait">
            <motion.span key={onset} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="font-display text-6xl" style={{ color }}>{onset}</motion.span>
          </AnimatePresence>
          <span className="font-display text-6xl text-ink">{fam.rime}</span>
        </div>
        <p className="text-ink-soft/60 text-xs mb-8">the -{fam.rime} family</p>
        <div className="flex flex-wrap gap-2 justify-center max-w-xs">
          {fam.onsets.map(o => (
            <motion.button key={o} whileTap={{ scale: 0.9 }} onClick={() => pick(o)}
              className="min-w-12 h-12 px-2 rounded-xl font-display text-2xl cursor-pointer shadow-sm"
              style={{ minWidth: 48, backgroundColor: onset === o ? color : '#fff', color: onset === o ? '#fff' : color,
                outline: used.has(o) ? '2px solid #22C55E' : 'none' }}>
              {o}
            </motion.button>
          ))}
        </div>
      </div>

      {allUsed && <NextButton onClick={next} last={isLast} />}
    </div>
  )
}
