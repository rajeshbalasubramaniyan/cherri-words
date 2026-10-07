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

// Speak a single letter-sound. Pure phonemes are hard for TTS, so we lean on
// a short, stretched cue plus an example word (Jolly-Phonics style).
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
