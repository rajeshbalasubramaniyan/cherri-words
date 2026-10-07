import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { speak } from '../services/speech'
import { shuffle, Progress, NextButton, Prompt, Explain } from './shared'

// Put the words in order. sentence shape: { words: [...], end: '.'|'?'|'!', emoji, explain? }
export default function OrderWords({ title, color, content, onHome, onComplete }) {
  const sentences = content.sentences
  const [i, setI] = useState(0)
  const [placed, setPlaced] = useState([])
  const [shake, setShake] = useState(false)

  const s = sentences[i]
  const isLast = i === sentences.length - 1
  const bank = useMemo(() => shuffle(s.words.map((w, id) => ({ w, id }))), [i])
  const text = s.words.join(' ') + (s.end || '.')
  const solved = placed.length === s.words.length && placed.map(p => p.w).join(' ') === s.words.join(' ')

  const place = (tile) => {
    if (solved || placed.find(p => p.id === tile.id)) return
    const next = [...placed, tile]
    setPlaced(next)
    if (next.length === s.words.length) {
      if (next.map(p => p.w).join(' ') === s.words.join(' ')) speak(text, { rate: 0.85 })
      else { setShake(true); setTimeout(() => { setShake(false); setPlaced([]) }, 700) }
    }
  }
  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setPlaced([])
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${sentences.length}`} />
      <Progress total={sentences.length} current={i} color={color} />
      <Celebrate show={solved} />

      <div className="flex flex-col items-center px-6 mb-3">
        <span className="text-5xl mb-1">{s.emoji}</span>
        <div className="flex items-center gap-2">
          <Prompt>{content.prompt || 'Put the words in order'}</Prompt>
          <SpeakerButton size="sm" onClick={() => speak(text, { rate: 0.8 })} label="Hear the sentence" />
        </div>
      </div>

      <div className="px-6 mb-6">
        <motion.div animate={shake ? { x: [0, -8, 8, -8, 0] } : {}}
          onClick={() => !solved && setPlaced(placed.slice(0, -1))}
          className="min-h-16 bg-white/75 rounded-2xl p-3 flex flex-wrap gap-2 items-center justify-center shadow-sm cursor-pointer">
          {placed.length === 0 && <span className="text-ink-soft/30 text-sm">tap words below…</span>}
          {placed.map(p => (
            <motion.span key={p.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="px-3 py-1.5 rounded-xl text-white font-display text-lg" style={{ backgroundColor: solved ? '#22C55E' : color }}>
              {p.w}
            </motion.span>
          ))}
          {solved && <span className="font-display text-2xl text-ink">{s.end || '.'}</span>}
        </motion.div>
        {placed.length > 0 && !solved && <p className="text-center text-ink-soft/40 text-[11px] mt-1">tap the line to undo</p>}
      </div>

      <div className="flex-1 flex flex-col items-center px-6">
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {bank.map(tile => {
            const used = placed.find(p => p.id === tile.id)
            return (
              <motion.button key={tile.id} whileTap={{ scale: 0.92 }} onClick={() => place(tile)} disabled={!!used || solved}
                className="px-4 py-2.5 rounded-xl bg-white font-display text-lg shadow-sm cursor-pointer disabled:opacity-20"
                style={{ color }}>
                {tile.w}
              </motion.button>
            )
          })}
        </div>
        {solved && <Explain text={s.explain} color={color} />}
      </div>

      {solved && <NextButton onClick={next} last={isLast} />}
    </div>
  )
}
