// Audio for phonics. Web Speech API = instant, offline, reliable.
// (Can upgrade to the cherri-group neural TTS Cloud Function later for richer quality.)

const VOICE_PREFS = [
  'Samantha (Enhanced)', 'Samantha', 'Karen', 'Moira', 'Tessa',
  'Google UK English Female', 'Google US English', 'Microsoft Aria Online',
]

let cachedVoice = null

function pickVoice() {
  if (cachedVoice) return cachedVoice
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null
  const all = speechSynthesis.getVoices()
  const en = all.filter(v => v.lang && v.lang.startsWith('en'))
  for (const pref of VOICE_PREFS) {
    const m = en.find(v => v.name.includes(pref))
    if (m) { cachedVoice = m; return m }
  }
  cachedVoice = en[0] || all[0] || null
  return cachedVoice
}

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

// Speak a whole word or sentence at a kid-friendly pace.
export function speak(text, { rate = 0.9, pitch = 1.05 } = {}) {
  if (!isSpeechSupported()) return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const v = pickVoice()
  if (v) u.voice = v
  u.rate = rate
  u.pitch = pitch
  speechSynthesis.speak(u)
}

// Recorded phoneme clips (public/sounds, CC BY-SA 3.0 — see CREDITS.md).
// Graphemes that share a sound map to the same clip.
const PHONEME_CLIPS = {
  s: 's', a: 'a', t: 't', i: 'i', p: 'p', n: 'n', c: 'c', k: 'c', ck: 'c',
  e: 'e', h: 'h', r: 'r', m: 'm', d: 'd', g: 'g', o: 'o', u: 'u', l: 'l',
  f: 'f', b: 'b', sh: 'sh', ch: 'ch', th: 'th', ng: 'ng',
}
const clipCache = {}
let currentClip = null

export function hasPhonemeClip(grapheme) {
  return grapheme in PHONEME_CLIPS
}

// Play the true recorded phoneme, then say the example word.
// Falls back to the TTS cue when no clip exists or playback fails.
export function playPhoneme(grapheme, cue, exampleWord) {
  const id = PHONEME_CLIPS[grapheme]
  if (!id || typeof Audio === 'undefined') { speakSound(cue, exampleWord); return }
  stopSpeech()
  if (currentClip) { currentClip.pause(); currentClip.currentTime = 0 }
  const clip = clipCache[id] || (clipCache[id] = new Audio(`/sounds/${id}.mp3`))
  currentClip = clip
  clip.currentTime = 0
  clip.onended = () => { if (exampleWord) setTimeout(() => speak(exampleWord), 250) }
  clip.play().catch(() => speakSound(cue, exampleWord))
}

// Blend with real phonemes: play each clip in turn, then say the whole word.
export function playBlend(sounds, word) {
  if (typeof Audio === 'undefined' || !sounds.every(s => PHONEME_CLIPS[s])) { speakBlend(sounds, word); return }
  stopSpeech()
  let i = 0
  const next = () => {
    if (i >= sounds.length) { setTimeout(() => speak(word, { rate: 0.85, pitch: 1.08 }), 300); return }
    const id = PHONEME_CLIPS[sounds[i++]]
    const clip = clipCache[id] || (clipCache[id] = new Audio(`/sounds/${id}.mp3`))
    currentClip = clip
    clip.currentTime = 0
    clip.onended = () => setTimeout(next, 280)
    clip.play().catch(() => speakBlend(sounds, word))
  }
  next()
}

// TTS-only fallback: a short, stretched cue plus an example word (Jolly-Phonics style).
export function speakSound(phonemeText, exampleWord) {
  if (!isSpeechSupported()) return
  speechSynthesis.cancel()
  const u1 = new SpeechSynthesisUtterance(phonemeText)
  const v = pickVoice()
  if (v) u1.voice = v
  u1.rate = 0.7
  u1.pitch = 1.0
  speechSynthesis.speak(u1)
  if (exampleWord) {
    const u2 = new SpeechSynthesisUtterance(exampleWord)
    if (v) u2.voice = v
    u2.rate = 0.9
    u2.pitch = 1.05
    speechSynthesis.speak(u2)
  }
}

// Blend: say each sound, then the whole word.
export function speakBlend(sounds, word) {
  if (!isSpeechSupported()) return
  speechSynthesis.cancel()
  const v = pickVoice()
  sounds.forEach(s => {
    const u = new SpeechSynthesisUtterance(s)
    if (v) u.voice = v
    u.rate = 0.6
    speechSynthesis.speak(u)
  })
  const w = new SpeechSynthesisUtterance(word)
  if (v) w.voice = v
  w.rate = 0.85
  w.pitch = 1.08
  speechSynthesis.speak(w)
}

export function stopSpeech() {
  if (isSpeechSupported()) speechSynthesis.cancel()
}

// Warm up voices (Chrome loads them async)
export function initVoices(cb) {
  if (!isSpeechSupported()) return
  pickVoice()
  speechSynthesis.onvoiceschanged = () => { cachedVoice = null; pickVoice(); cb?.() }
}
