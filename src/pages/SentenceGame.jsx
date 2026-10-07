import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { SENTENCES } from '../data/grammar'
import { speak } from '../services/speech'

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5) }

export default function SentenceGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [placed, setPlaced] = useState([])

  const s = SENTENCES[round]
  const isLast = round === SENTENCES.length - 1
  const bank = useMemo(() => shuffle(s.words.map((w, i) => ({ w, id: i }))), [round])
  const correct = placed.map(p => p.w).join(' ') === s.words.join(' ')
  const full = placed.length === s.words.length
  const done = full && correct

  const sentenceText = s.words.join(' ') + '.'

  const place = (tile) => {
    if (placed.find(p => p.id === tile.id)) return
    const next = [...placed, tile]
    setPlaced(next)
    if (next.length === s.words.length) {
      if (next.map(p => p.w).join(' ') === s.words.join(' ')) {
        speak(sentenceText, { rate: 0.85 })
        setTimeout(() => { if (isLast) onComplete?.(); else { setRound(round + 1); setPlaced([]) } }, 1500)
      } else {
        setTimeout(() => setPlaced([]), 700)
      }
    }
  }

  const removeLast = () => setPlaced(placed.slice(0, -1))

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Sentence Builder" onHome={onHome} right={`${round + 1}/${SENTENCES.length}`} />
      <Celebrate show={done} />

      <div className="flex flex-col items-center px-6 mb-4">
        <span className="text-5xl mb-1">{s.emoji}</span>
        <div className="flex items-center gap-2">
          <p className="text-ink-soft text-sm">Put the words in order</p>
          <SpeakerButton onClick={() => speak(sentenceText, { rate: 0.8 })} size="sm" label="Hear the sentence" />
        </div>
        <p className="text-ink-soft/50 text-[11px] mt-1">Start with a capital, end with a full stop .</p>
      </div>

      {/* sentence line */}
      <div className="px-6 mb-6">
        <div className="min-h-16 bg-white/70 rounded-2xl p-3 flex flex-wrap gap-2 items-center justify-center shadow-sm"
          onClick={() => placed.length && removeLast()} style={{ cursor: placed.length ? 'pointer' : 'default' }}>
          {placed.length === 0 && <span className="text-ink-soft/30 text-sm">tap words below…</span>}
          {placed.map((p, i) => (
            <motion.span key={p.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="px-3 py-1.5 rounded-xl bg-leaf text-white font-display text-lg">{p.w}</motion.span>
          ))}
          {full && correct && <span className="font-display text-lg text-ink">.</span>}
        </div>
        {placed.length > 0 && !done && <p className="text-center text-ink-soft/40 text-[10px] mt-1">tap a word above to undo</p>}
      </div>

      <div className="flex-1 flex items-start justify-center px-6">
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {bank.map(tile => {
            const used = placed.find(p => p.id === tile.id)
            return (
              <motion.button key={tile.id} whileTap={{ scale: 0.92 }} onClick={() => place(tile)} disabled={!!used}
                className="px-4 py-2.5 rounded-xl bg-white font-display text-lg text-cherry-deep shadow-sm cursor-pointer disabled:opacity-25">
                {tile.w}
              </motion.button>
            )
          })}
        </div>
      </div>

      {done && isLast && (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onComplete}
            className="w-full bg-gradient-to-b from-leaf to-green-600 text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            Back to Journey →
          </motion.button>
        </div>
      )}
    </div>
  )
}
