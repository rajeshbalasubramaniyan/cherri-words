// Ages 4–5 · Reception / Pre-K–K · Phonics Phase 2
import { SOUND_GROUPS } from '../data/sounds'

const soundCards = (g) => g.sounds.map(s => ({ big: s.g, emoji: s.emoji, word: s.word, cue: s.cue, clip: s.g === 'c' ? 'c' : s.g }))

export default {
  id: 'little', name: 'Little Learners', ages: '4–5', grade: 'Reception · Pre-K–K', emoji: '🐣', color: '#FF4D4D',
  about: 'Letter sounds, hearing first sounds, rhyme, and blending simple words.',
  levels: [
    { id: 'sounds1', title: 'Letter Sounds 1', blurb: 's a t i p n', emoji: '🔊', engine: 'ExploreCards',
      content: { cards: soundCards(SOUND_GROUPS[0]) } },
    { id: 'sounds2', title: 'Letter Sounds 2', blurb: 'c k e h r m d', emoji: '🔊', engine: 'ExploreCards',
      content: { cards: [...soundCards(SOUND_GROUPS[1]), { big: 'k', emoji: '🪁', word: 'kite', cue: 'kuh', clip: 'k' }] } },
    { id: 'sounds3', title: 'Letter Sounds 3', blurb: 'g o u l f b', emoji: '🔊', engine: 'ExploreCards',
      content: { cards: soundCards(SOUND_GROUPS[2]) } },
    { id: 'firstsound', title: 'First Sounds', blurb: 'What does it start with?', emoji: '👂', engine: 'Choose',
      content: { prompt: 'Which sound does this word start with?', rounds: [
        { emoji: '🐍', word: 'snake', options: ['s', 'p', 'm'], answer: 's', sound: true },
        { emoji: '🍎', word: 'apple', options: ['e', 'a', 'o'], answer: 'a', sound: true },
        { emoji: '🐷', word: 'pig', options: ['b', 'd', 'p'], answer: 'p', sound: true },
        { emoji: '🌙', word: 'moon', options: ['m', 'n', 'l'], answer: 'm', sound: true },
        { emoji: '🐶', word: 'dog', options: ['b', 'd', 'g'], answer: 'd', sound: true },
        { emoji: '🐟', word: 'fish', options: ['f', 's', 'h'], answer: 'f', sound: true },
        { emoji: '☂️', word: 'umbrella', options: ['a', 'u', 'i'], answer: 'u', sound: true },
        { emoji: '🚌', word: 'bus', options: ['p', 'b', 'd'], answer: 'b', sound: true },
      ] } },
    { id: 'rhyme', title: 'Rhyme Time', blurb: 'Words that sound alike at the end', emoji: '🎵', engine: 'TapAll',
      content: { rounds: [
        { prompt: 'Tap every word that rhymes with', target: 'cat', say: 'cat', items: [
          { w: 'hat', ok: true }, { w: 'mat', ok: true }, { w: 'bat', ok: true }, { w: 'dog', ok: false }, { w: 'sun', ok: false }, { w: 'pig', ok: false } ],
          explain: 'Rhyming words end with the same sound: c-AT, h-AT, m-AT, b-AT.' },
        { prompt: 'Tap every word that rhymes with', target: 'pig', say: 'pig', items: [
          { w: 'wig', ok: true }, { w: 'dig', ok: true }, { w: 'big', ok: true }, { w: 'pen', ok: false }, { w: 'hop', ok: false }, { w: 'cup', ok: false } ] },
        { prompt: 'Tap every word that rhymes with', target: 'sun', say: 'sun', items: [
          { w: 'run', ok: true }, { w: 'fun', ok: true }, { w: 'bun', ok: true }, { w: 'sit', ok: false }, { w: 'map', ok: false }, { w: 'leg', ok: false } ] },
        { prompt: 'Tap every word that rhymes with', target: 'bed', say: 'bed', items: [
          { w: 'red', ok: true }, { w: 'fed', ok: true }, { w: 'Ted', ok: true }, { w: 'bad', ok: false }, { w: 'fox', ok: false }, { w: 'tin', ok: false } ] },
      ] } },
    { id: 'blend', title: 'Blend It!', blurb: 'Push sounds together', emoji: '🧪', engine: 'Blend',
      content: { words: [
        { word: 'sat', sounds: ['s', 'a', 't'], emoji: '🪑' },
        { word: 'pin', sounds: ['p', 'i', 'n'], emoji: '📌' },
        { word: 'cat', sounds: ['c', 'a', 't'], emoji: '🐱' },
        { word: 'dog', sounds: ['d', 'o', 'g'], emoji: '🐶' },
        { word: 'sun', sounds: ['s', 'u', 'n'], emoji: '☀️' },
        { word: 'bed', sounds: ['b', 'e', 'd'], emoji: '🛏️' },
        { word: 'map', sounds: ['m', 'a', 'p'], emoji: '🗺️' },
        { word: 'hut', sounds: ['h', 'u', 't'], emoji: '🛖' },
      ] } },
    { id: 'families', title: 'Word Families', blurb: 'cat → hat → mat', emoji: '⚙️', engine: 'WordFamily',
      content: { families: [
        { rime: 'at', emoji: '🐱', onsets: ['c', 'h', 'b', 'm', 'r', 's'] },
        { rime: 'en', emoji: '🖊️', onsets: ['p', 't', 'h', 'm', 'd'] },
        { rime: 'ig', emoji: '🐷', onsets: ['p', 'd', 'b', 'w', 'f'] },
        { rime: 'og', emoji: '🐶', onsets: ['d', 'l', 'f', 'h'] },
        { rime: 'un', emoji: '☀️', onsets: ['s', 'f', 'r', 'b'] },
      ] } },
    { id: 'spellcvc', title: 'Spell It', blurb: 'Hear it, then build it', emoji: '✏️', engine: 'SpellIt',
      content: { mode: 'hidden', words: [
        { word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }, { word: 'sun', emoji: '☀️' },
        { word: 'pig', emoji: '🐷' }, { word: 'bus', emoji: '🚌' }, { word: 'hat', emoji: '🎩' },
      ] } },
    { id: 'tricky1', title: 'First Tricky Words', blurb: 'the, to, no, go…', emoji: '🎭', engine: 'SpellIt',
      content: { mode: 'show', words: [
        { word: 'the', hint: 'You can’t sound this one out — just remember it!' },
        { word: 'to', hint: 'I went to the park.' }, { word: 'no' }, { word: 'go' },
        { word: 'into', hint: 'Jump into the pool!' }, { word: 'he' },
      ] } },
  ],
}
