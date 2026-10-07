import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { WORD_JOBS, JOB_ROUNDS } from '../data/grammar'
import { speak } from '../services/speech'

export default function GrammarGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState({})

  const r = JOB_ROUNDS[round]
  const job = WORD_JOBS[r.job]
  const isLast = round === JOB_ROUNDS.length - 1
  const targetCount = r.words.filter(w => w.job === r.job).length
  const gotCount = r.words.filter(w => w.job === r.job && picked[w.w] === true).length
  const done = gotCount === targetCount

  const tap = (item) => {
    speak(item.w, { rate: 0.85 })
    if (picked[item.w] === true) return
    if (item.job === r.job) {
      const next = { ...picked, [item.w]: true }
      setPicked(next)
      const got = r.words.filter(w => w.job === r.job && next[w.w]).length
      if (got === targetCount) {
        setTimeout(() => { if (isLast) onComplete?.(); else { setRound(round + 1); setPicked({}) } }, 1100)
      }
    } else {
      setPicked({ ...picked, [item.w]: 'wrong' })
      setTimeout(() => setPicked(p => { const n = { ...p }; delete n[item.w]; return n }), 500)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Word Jobs" onHome={onHome} right={`${round + 1}/${JOB_ROUNDS.length}`} />
      <Celebrate show={done} />

      <div className="flex flex-col items-center px-6 mb-6">
        <span className="text-3xl mb-1">{job.emoji}</span>
        <p className="text-ink-soft text-sm">Tap every <b style={{ color: job.color }}>{job.label.toLowerCase()}</b></p>
        <p className="text-ink-soft/50 text-xs">{job.hint}</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {r.words.map(item => {
            const state = picked[item.w]
            return (
              <motion.button key={item.w} whileTap={{ scale: 0.93 }} onClick={() => tap(item)}
                animate={state === 'wrong' ? { x: [0, -6, 6, 0] } : {}}
                className="rounded-2xl py-4 font-display text-2xl cursor-pointer shadow-sm transition-colors"
                style={{ backgroundColor: state === true ? job.color : state === 'wrong' ? '#fecaca' : '#fff',
                  color: state === true ? '#fff' : '#2A2320' }}>
                {item.w}
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
