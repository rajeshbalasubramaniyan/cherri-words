// Deeper modules: syllables, morphology, spelling rules, homophones, punctuation.

// SYLLABLES — clap/count the beats in a word.
export const SYLLABLE_WORDS = [
  { word: 'cat', parts: ['cat'], emoji: '🐱' },
  { word: 'rabbit', parts: ['rab', 'bit'], emoji: '🐰' },
  { word: 'butterfly', parts: ['but', 'ter', 'fly'], emoji: '🦋' },
  { word: 'banana', parts: ['ba', 'na', 'na'], emoji: '🍌' },
  { word: 'elephant', parts: ['el', 'e', 'phant'], emoji: '🐘' },
  { word: 'dinosaur', parts: ['di', 'no', 'saur'], emoji: '🦕' },
]

// MORPHOLOGY — build words with prefixes & suffixes; meaning shifts.
export const MORPH_ROUNDS = [
  { root: 'happy', affix: 'un', type: 'prefix', result: 'unhappy', means: 'NOT happy', emoji: '🙂' },
  { root: 'do', affix: 're', type: 'prefix', result: 'redo', means: 'do AGAIN', emoji: '🔁' },
  { root: 'jump', affix: 'ing', type: 'suffix', result: 'jumping', means: 'doing it now', emoji: '🤸' },
  { root: 'play', affix: 'ed', type: 'suffix', result: 'played', means: 'did it before', emoji: '⚽' },
  { root: 'care', affix: 'ful', type: 'suffix', result: 'careful', means: 'full of care', emoji: '🤲' },
  { root: 'slow', affix: 'ly', type: 'suffix', result: 'slowly', means: 'in a slow way', emoji: '🐌' },
]

// SPELLING RULES — the tricky changes when adding endings.
export const SPELLING_RULES = [
  {
    id: 'double', name: 'The Doubling Rule', color: '#EF4444',
    base: 'hop', ending: 'ing', result: 'hopping',
    rule: 'Short word + short vowel? DOUBLE the last letter before adding -ing or -ed.',
    highlight: 'pp',
  },
  {
    id: 'drope', name: 'The Drop-e Rule', color: '#3B82F6',
    base: 'make', ending: 'ing', result: 'making',
    rule: 'Word ends in a silent e? DROP the e before adding -ing or -ed.',
    highlight: 'k',
  },
  {
    id: 'ytoi', name: 'The y → i Rule', color: '#22C55E',
    base: 'happy', ending: 'er', result: 'happier',
    rule: 'Word ends in a consonant + y? Change the y to i before adding the ending.',
    highlight: 'i',
  },
]

// HOMOPHONES — sound the SAME, spelled DIFFERENT. The "funny language" core.
export const HOMOPHONE_ROUNDS = [
  { sentence: ['I went ', ' the shop'], answer: 'to', options: ['to', 'too', 'two'], emoji: '🏪' },
  { sentence: ['I have ', ' cats'], answer: 'two', options: ['to', 'too', 'two'], emoji: '🐱🐱' },
  { sentence: ['Can I come ', '?'], answer: 'too', options: ['to', 'too', 'two'], emoji: '🙋' },
  { sentence: ['The dog wagged ', ' tail'], answer: 'its', options: ['its', "it's"], emoji: '🐶' },
  { sentence: ['Look over ', '!'], answer: 'there', options: ['there', 'their', "they're"], emoji: '👉' },
  { sentence: ['It is ', ' turn'], answer: 'their', options: ['there', 'their', "they're"], emoji: '👧👦' },
]

// PUNCTUATION — pick the right end mark for each sentence type.
export const PUNCT_ROUNDS = [
  { text: 'The sky is blue', answer: '.', type: 'A telling sentence', emoji: '🌤️' },
  { text: 'What is your name', answer: '?', type: 'A question', emoji: '❓' },
  { text: 'Watch out', answer: '!', type: 'Excitement!', emoji: '😲' },
  { text: 'I like ice cream', answer: '.', type: 'A telling sentence', emoji: '🍦' },
  { text: 'Where are you going', answer: '?', type: 'A question', emoji: '🧭' },
  { text: 'We won the game', answer: '!', type: 'Excitement!', emoji: '🏆' },
]
