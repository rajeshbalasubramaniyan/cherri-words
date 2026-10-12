import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameHeader, SpeakerButton } from '../components/Celebrate'
import { speak, stopSpeech } from '../services/speech'
import { Progress, NextButton } from './shared'
import CLIPS from '../data/storyClips.json'
import Choose from './Choose'
import TapAll from './TapAll'

const PLAY = { Choose, TapAll }

// Recorded narration lives in public/story/<levelId>-<page>.mp3 and is listed in storyClips.json.
// Pages without a clip fall back to the device voice.
let clip = null
const stopClip = () => { if (clip) { clip.pause(); clip = null } }

// A short illustrated story, then a game about it.
// content: { story: [{ emoji, title, text, words?: [] }], then: 'Choose' | 'TapAll', ...content for that game }
export default function Story(props) {
  const { title, color, content, onHome, levelId } = props
  const pages = content.story
  const [p, setP] = useState(0)
  const [playing, setPlaying] = useState(false)

  if (playing) {
    const Game = PLAY[content.then || 'Choose']
    return <Game {...props} />
  }

  const page = pages[p]
  const isLast = p === pages.length - 1
  const quiet = () => { stopSpeech(); stopClip() }
  const read = () => {
    quiet()
    const key = `${levelId}-${p}`
    const fallback = () => speak(`${page.title}. ${page.say || page.text}`, { rate: 0.9 })
    if (!CLIPS.includes(key)) return fallback()
    clip = new Audio(`${import.meta.env.BASE_URL}story/${key}.mp3`)
    clip.play().catch(fallback)
  }
  const next = () => { quiet(); if (isLast) setPlaying(true); else setP(p + 1) }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={() => { quiet(); onHome() }} right={`${p + 1}/${pages.length}`} />
      <Progress total={pages.length} current={p} color={color} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div key={p} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full">
          <div className="text-7xl mb-3">{page.emoji}</div>
          <h2 className="font-display text-3xl leading-tight mb-3" style={{ color }}>{page.title}</h2>
          <div className="bg-white/85 rounded-3xl px-5 py-4 shadow-sm text-left">
            <p className="text-ink text-base leading-relaxed">{page.text}</p>
          </div>
          {page.words && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {page.words.map(w => (
                <motion.button key={w} whileTap={{ scale: 0.92 }} onClick={() => { stopClip(); speak(w, { rate: 0.8 }) }}
                  className="font-display text-xl px-3 py-1.5 rounded-xl bg-white shadow-sm cursor-pointer" style={{ color }}>
                  {w}
                </motion.button>
              ))}
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <SpeakerButton size="sm" label="Read it to me" onClick={read} />
          </div>
        </motion.div>
      </div>

      <NextButton onClick={next} label={isLast ? 'Now you try 🕵️' : 'Next →'} />
    </div>
  )
}
