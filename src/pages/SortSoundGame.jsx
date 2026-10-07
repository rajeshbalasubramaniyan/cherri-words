import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { VOWEL_TEAMS } from '../data/words'
import { speak } from '../services/speech'

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5) }

export default function SortSoundGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState({})

  const target = VOWEL_TEAMS[round]
  const isLast = round === VOWEL_TEAMS.length - 1

  // target words (correct) + 3 distractors from other sounds
  const board = useMemo(() => {
    const correct = target.words.slice(0, 4).map(w => ({ ...w, correct: true }))
    const others = VOWEL_TEAMS.filter(v => v.id !== target.id).flatMap(v => v.words)
    const distract = shuffle(others).slice(0, 3).map(w => ({ ...w, correct: false }))
    return shuffle([...correct, ...distract])
  }, [round])

  const targetCount = board.filter(w => w.correct).length
  const correctPicked = Object.entries(picked).filter(([w, ok]) => ok && board.find(b => b.word === w)?.correct).length
  const done = correctPicked === targetCount

  const tap = (item) => {
    speak(item.word, { rate: 0.8 })
    if (picked[item.word]) return
    if (item.correct) {
      const next = { ...picked, [item.word]: true }
      setPicked(next)
      const got = board.filter(b => b.correct && (next[b.word])).length
      if (got === targetCount) {
        setTimeout(() => { if (isLast) onComplete?.(); else { setRound(round + 1); setPicked({}) } }, 1200)
      }
    } else {
      setPicked({ ...picked, [item.word]: 'wrong' })
      setTimeout(() => setPicked(p => { const n = { ...p }; delete n[item.word]; return n }), 500)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Sound Sorters" onHome={onHome} right={`${round + 1}/${VOWEL_TEAMS.length}`} />
      <Celebrate show={done} />

      <div className="flex flex-col items-center px-6 mb-4">
        <p className="text-ink-soft text-sm mb-1">Find every word with the</p>
        <div className="flex items-center gap-3">
          <span className="font-display text-3xl" style={{ color: target.color }}>{target.sound}</span>
          <SpeakerButton onClick={() => speak(target.say, { rate: 0.6 })} size="sm" />
        </div>
        <p className="text-ink-soft/50 text-xs mt-1">(it can be spelled different ways!)</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {board.map(item => {
            const state = picked[item.word]
            return (
              <motion.button key={item.word} whileTap={{ scale: 0.93 }} onClick={() => tap(item)}
                animate={state === 'wrong' ? { x: [0, -6, 6, 0] } : {}}
                className="rounded-2xl py-4 font-display text-2xl cursor-pointer shadow-sm transition-colors"
                style={{
                  backgroundColor: state === true ? target.color : state === 'wrong' ? '#fecaca' : '#fff',
                  color: state === true ? '#fff' : '#2A2320',
                }}>
                {item.word}
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
