import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { speak } from '../services/speech'
import { shuffle, Progress, NextButton, Prompt } from './shared'

// Build the word from letter tiles.
// content.mode: 'show' (word visible — tricky words) | 'hidden' (dictation: hear it, then spell it)
// word shape: { word, emoji?, hint? }
export default function SpellIt({ title, color, content, onHome, onComplete }) {
  const words = content.words
  const hidden = content.mode === 'hidden'
  const [i, setI] = useState(0)
  const [placed, setPlaced] = useState([])
  const [shake, setShake] = useState(false)

  const w = words[i]
  const isLast = i === words.length - 1
  const tiles = useMemo(() => {
    let t = shuffle(w.word.split('').map((ch, id) => ({ ch, id })))
    if (t.map(x => x.ch).join('') === w.word && w.word.length > 1) t = [...t.slice(1), t[0]]
    return t
  }, [i])
  const attempt = placed.map(t => t.ch).join('')
  const solved = attempt === w.word

  useEffect(() => {
    if (hidden) { const id = setTimeout(() => speak(w.word, { rate: 0.75 }), 400); return () => clearTimeout(id) }
  }, [i])

  const tapTile = (tile) => {
    if (solved || placed.find(p => p.id === tile.id)) return
    const next = [...placed, tile]
    setPlaced(next)
    if (next.length === w.word.length) {
      if (next.map(t => t.ch).join('') === w.word) speak(w.word, { rate: 0.8 })
      else { setShake(true); setTimeout(() => { setShake(false); setPlaced([]) }, 700) }
    }
  }

  const undo = () => { if (!solved) setPlaced(placed.slice(0, -1)) }

  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setPlaced([])
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${words.length}`} />
      <Progress total={words.length} current={i} color={color} />
      <Celebrate show={solved} />
      <Prompt>{hidden ? 'Listen, then spell the word' : 'Look, say, then spell it'}</Prompt>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {w.emoji && <div className="text-6xl mb-3">{w.emoji}</div>}
        <div className="flex items-center gap-3 mb-2 min-h-14">
          {(!hidden || solved) && <span className="font-display text-5xl" style={{ color }}>{w.word}</span>}
          <SpeakerButton onClick={() => speak(w.word, { rate: 0.75 })} label="Hear the word" />
        </div>
        {w.hint && <p className="text-ink-soft text-sm mb-4 max-w-xs">{w.hint}</p>}

        <motion.div animate={shake ? { x: [0, -8, 8, -8, 0] } : {}} onClick={undo}
          className="flex gap-1.5 mb-8 flex-wrap justify-center cursor-pointer" title="Tap to undo">
          {w.word.split('').map((_, k) => {
            const t = placed[k]
            return (
              <div key={k} className="w-10 h-12 sm:w-11 sm:h-13 rounded-xl border-2 border-dashed flex items-center justify-center font-display text-2xl"
                style={{ borderColor: color + '66', backgroundColor: t ? (solved ? '#22C55E' : color) : 'transparent', color: '#fff' }}>
                {t?.ch || ''}
              </div>
            )
          })}
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center max-w-xs">
          {tiles.map(tile => {
            const used = placed.find(p => p.id === tile.id)
            return (
              <motion.button key={tile.id} whileTap={{ scale: 0.9 }} onClick={() => tapTile(tile)} disabled={!!used || solved}
                className="w-11 h-11 rounded-xl bg-white font-display text-2xl shadow-sm cursor-pointer disabled:opacity-20"
                style={{ color }}>
                {tile.ch}
              </motion.button>
            )
          })}
        </div>
        {placed.length > 0 && !solved && <p className="text-ink-soft/40 text-[11px] mt-3">tap the boxes to undo</p>}
      </div>

      {solved && <NextButton onClick={next} last={isLast} />}
    </div>
  )
}
