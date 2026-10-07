import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { speak, playPhoneme } from '../services/speech'
import { shuffle, Progress, NextButton, Explain } from './shared'

// Tap every word that fits. Round shape:
// { prompt, target?, hint?, clip?, say?, items: [{ w, ok }], explain? }
export default function TapAll({ title, color, content, onHome, onComplete }) {
  const rounds = content.rounds
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState({})
  const [wrong, setWrong] = useState(null)

  const r = rounds[i]
  const isLast = i === rounds.length - 1
  const items = useMemo(() => shuffle(r.items), [i])
  const need = r.items.filter(x => x.ok).length
  const got = r.items.filter(x => x.ok && picked[x.w]).length
  const solved = got === need

  const tap = (item) => {
    speak(item.w, { rate: 0.85 })
    if (solved || picked[item.w]) return
    if (item.ok) setPicked({ ...picked, [item.w]: true })
    else { setWrong(item.w); setTimeout(() => setWrong(null), 600) }
  }

  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setPicked({}); setWrong(null)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${rounds.length}`} />
      <Progress total={rounds.length} current={i} color={color} />
      <Celebrate show={solved} />

      <div className="flex flex-col items-center px-6 mb-4 text-center">
        <p className="text-ink-soft text-sm">{r.prompt}</p>
        {r.target && (
          <div className="flex items-center gap-3 mt-1">
            <span className="font-display text-3xl" style={{ color }}>{r.target}</span>
            {(r.clip || r.say) && (
              <SpeakerButton size="sm" label={`Hear ${r.target}`}
                onClick={() => (r.clip ? playPhoneme(r.clip, r.say || r.target, null) : speak(r.say, { rate: 0.8 }))} />
            )}
          </div>
        )}
        {r.hint && <p className="text-ink-soft/50 text-xs mt-1">{r.hint}</p>}
        <p className="text-ink-soft/50 text-[11px] mt-1">{got} of {need} found</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {items.map(item => {
            const on = picked[item.w]
            return (
              <motion.button key={item.w} whileTap={{ scale: 0.93 }} onClick={() => tap(item)}
                animate={wrong === item.w ? { x: [0, -6, 6, -6, 0] } : {}}
                className="rounded-2xl py-3.5 px-2 font-display text-2xl cursor-pointer shadow-sm transition-colors"
                style={{ backgroundColor: on ? color : wrong === item.w ? '#FECACA' : '#fff', color: on ? '#fff' : '#2A2320' }}>
                {item.w}
              </motion.button>
            )
          })}
        </div>
        {solved && <Explain text={r.explain} color={color} />}
      </div>

      {solved && <NextButton onClick={next} last={isLast} />}
    </div>
  )
}
