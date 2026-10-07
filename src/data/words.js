// Word families (rimes) for blending, and vowel-team sets for sort-by-sound.

// CVC blending words: sounds[] = how to segment, word = the whole thing.
export const BLEND_WORDS = [
  { word: 'cat', sounds: ['c', 'a', 't'], emoji: '🐱' },
  { word: 'dog', sounds: ['d', 'o', 'g'], emoji: '🐶' },
  { word: 'pig', sounds: ['p', 'i', 'g'], emoji: '🐷' },
  { word: 'sun', sounds: ['s', 'u', 'n'], emoji: '☀️' },
  { word: 'hat', sounds: ['h', 'a', 't'], emoji: '🎩' },
  { word: 'bed', sounds: ['b', 'e', 'd'], emoji: '🛏️' },
]

// Word-family machine: swap the first sound to make new words.
export const WORD_FAMILIES = [
  { rime: 'at', emoji: '🐱', onsets: ['c', 'h', 'b', 'm', 'r', 's'] },
  { rime: 'ig', emoji: '🐷', onsets: ['p', 'd', 'b', 'w', 'f'] },
  { rime: 'un', emoji: '☀️', onsets: ['s', 'f', 'r', 'b'] },
  { rime: 'og', emoji: '🐶', onsets: ['d', 'l', 'f', 'j'] },
]

// Vowel teams: the SAME sound spelled different ways — the sort-by-sound challenge.
export const VOWEL_TEAMS = [
  {
    id: 'long-e', sound: 'long E', say: 'eee', clip: 'ee', color: '#22C55E',
    words: [
      { word: 'tree', spelling: 'ee' },
      { word: 'bee', spelling: 'ee' },
      { word: 'leaf', spelling: 'ea' },
      { word: 'sea', spelling: 'ea' },
      { word: 'field', spelling: 'ie' },
      { word: 'key', spelling: 'ey' },
    ],
  },
  {
    id: 'long-a', sound: 'long A', say: 'ay', clip: 'ai', color: '#3B82F6',
    words: [
      { word: 'rain', spelling: 'ai' },
      { word: 'train', spelling: 'ai' },
      { word: 'play', spelling: 'ay' },
      { word: 'day', spelling: 'ay' },
      { word: 'cake', spelling: 'a_e' },
      { word: 'snail', spelling: 'ai' },
    ],
  },
  {
    id: 'long-o', sound: 'long O', say: 'oh', clip: 'oa', color: '#FBBF24',
    words: [
      { word: 'boat', spelling: 'oa' },
      { word: 'coat', spelling: 'oa' },
      { word: 'snow', spelling: 'ow' },
      { word: 'grow', spelling: 'ow' },
      { word: 'bone', spelling: 'o_e' },
      { word: 'toad', spelling: 'oa' },
    ],
  },
]

// Tricky / sight words — rule-breakers you can't sound out.
export const TRICKY_WORDS = ['the', 'said', 'was', 'one', 'come', 'you', 'they', 'are']

// Magic-e pairs: short vowel -> long vowel when e is added.
export const MAGIC_E = [
  { short: 'cap', long: 'cape', emoji: '🦸', sound: 'ai' },
  { short: 'kit', long: 'kite', emoji: '🪁', sound: 'igh' },
  { short: 'hop', long: 'hope', emoji: '🤞', sound: 'oa' },
  { short: 'tub', long: 'tube', emoji: '🧪', sound: 'oo' },
  { short: 'pin', long: 'pine', emoji: '🌲', sound: 'igh' },
]
