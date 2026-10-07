import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { TRICKY_WORDS } from '../data/words'
import { speak } from '../services/speech'

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5) }

export default function TrickyGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [built, setBuilt] = useState([])

  const word = TRICKY_WORDS[round]
  const isLast = round === TRICKY_WORDS.length - 1
  const tiles = useMemo(() => shuffle(word.split('').map((ch, i) => ({ ch, id: i }))), [round])
  const done = built.map(t => t.ch).join('') === word

  const tapTile = (tile) => {
    if (built.find(b => b.id === tile.id)) return
    const next = [...built, tile]
    setBuilt(next)
    if (next.length === word.length) {
      const ok = next.map(t => t.ch).join('') === word
      if (ok) {
        speak(word, { rate: 0.8 })
        setTimeout(() => { if (isLast) onComplete?.(); else { setRound(round + 1); setBuilt([]) } }, 1200)
      } else {
        setTimeout(() => setBuilt([]), 600)
      }
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Rule Breakers" onHome={onHome} right={`${round + 1}/${TRICKY_WORDS.length}`} />
      <Celebrate show={done} />

      <p className="text-center text-ink-soft text-sm px-6 mb-1">These words break the rules — just remember them!</p>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-display text-5xl text-cherry-deep">{word}</span>
          <SpeakerButton onClick={() => speak(word, { rate: 0.75 })} />
        </div>

        {/* build slots */}
        <div className="flex gap-2 mb-8 min-h-14">
          {word.split('').map((_, i) => {
            const t = built[i]
            return (
              <div key={i} className="w-12 h-14 rounded-xl border-2 border-dashed flex items-center justify-center font-display text-2xl"
                style={{ borderColor: '#FFB3B3', backgroundColor: t ? '#FF4D4D' : 'transparent', color: t ? '#fff' : '#E02424' }}>
                {t?.ch || ''}
              </div>
            )
          })}
        </div>

        {/* letter bank */}
        <div className="flex flex-wrap gap-2 justify-center max-w-xs">
          {tiles.map(tile => {
            const used = built.find(b => b.id === tile.id)
            return (
              <motion.button key={tile.id} whileTap={{ scale: 0.9 }} onClick={() => tapTile(tile)} disabled={!!used}
                className="w-12 h-12 rounded-xl bg-white font-display text-2xl text-cherry-deep shadow-sm cursor-pointer disabled:opacity-25">
                {tile.ch}
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
