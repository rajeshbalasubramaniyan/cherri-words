import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader, SpeakerButton } from '../components/Celebrate'
import { speak, playPhoneme } from '../services/speech'
import { shuffle, Progress, NextButton, Explain, Prompt } from './shared'

// Multiple choice. Round shape:
// { q?, emoji?, text?, sentence?: [before, after], options, answer,
//   sound?: true (answer is a phoneme clip), word?, say?, explain? }
export default function Choose({ title, color, content, onHome, onComplete }) {
  const rounds = content.rounds
  const [i, setI] = useState(0)
  const [wrong, setWrong] = useState(null)
  const [solved, setSolved] = useState(false)

  const r = rounds[i]
  const isLast = i === rounds.length - 1
  const options = useMemo(() => (content.keepOrder ? r.options : shuffle(r.options)), [i])
  const filled = r.sentence ? r.sentence[0] + r.answer + r.sentence[1] : null
  const listenText = r.word || r.text || (r.sentence ? r.sentence.join(' … ') : null)
  const longOptions = options.some(o => o.length > 12)

  const sayAnswer = () => {
    if (r.sound) playPhoneme(r.answer, r.answer, r.word)
    else speak(r.say || filled || r.text || r.answer, { rate: 0.85 })
  }

  const choose = (opt) => {
    if (solved) return
    if (opt === r.answer) { setSolved(true); sayAnswer() }
    else { setWrong(opt); setTimeout(() => setWrong(null), 600) }
  }

  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setSolved(false); setWrong(null)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${rounds.length}`} />
      <Progress total={rounds.length} current={i} color={color} />
      <Celebrate show={solved} />
      <Prompt>{r.q || content.prompt}</Prompt>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {r.emoji && <div className="text-6xl mb-4">{r.emoji}</div>}

        {r.sentence && (
          <div className="font-display text-2xl sm:text-3xl text-ink leading-relaxed max-w-sm flex items-center justify-center flex-wrap gap-x-1">
            <span>{r.sentence[0]}</span>
            <span className="inline-flex items-center justify-center min-w-16 px-2 py-0.5 rounded-xl border-2 border-dashed"
              style={{ borderColor: solved ? '#22C55E' : color, backgroundColor: solved ? '#22C55E' : 'transparent', color: solved ? '#fff' : color }}>
              {solved ? r.answer : '?'}
            </span>
            <span>{r.sentence[1]}</span>
          </div>
        )}

        {r.text && !r.sentence && (
          <div className={`font-display text-ink max-w-sm ${r.text.length > 24 ? 'text-2xl' : 'text-4xl'}`}>{r.text}</div>
        )}

        {listenText && (
          <div className="mt-3">
            <SpeakerButton size="sm" label="Listen"
              onClick={() => speak(r.sound ? r.word : (r.say && !r.sentence ? r.say : listenText), { rate: 0.8 })} />
          </div>
        )}

        {solved && <Explain text={r.explain} color={color} />}
      </div>

      {!solved ? (
        <div className="px-4 pb-8 max-w-md mx-auto w-full">
          <div className={`grid gap-3 ${longOptions ? 'grid-cols-1' : options.length === 4 ? 'grid-cols-2' : options.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {options.map(opt => (
              <motion.button key={opt} whileTap={{ scale: 0.94 }}
                animate={wrong === opt ? { x: [0, -6, 6, -6, 0] } : {}}
                onClick={() => choose(opt)}
                className={`rounded-2xl py-3.5 px-3 font-display cursor-pointer shadow-sm transition-colors ${longOptions ? 'text-lg text-left' : 'text-2xl'}`}
                style={{ backgroundColor: wrong === opt ? '#FECACA' : '#fff', color: '#2A2320' }}>
                {opt}
              </motion.button>
            ))}
          </div>
          {wrong && <p className="text-center text-cherry-deep/70 text-xs mt-2">Not quite — try another!</p>}
        </div>
      ) : (
        <NextButton onClick={next} last={isLast} />
      )}
    </div>
  )
}
