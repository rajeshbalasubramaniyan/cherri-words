// Letter-sounds in SSP teaching order (Jolly Phonics / Letters & Sounds),
// NOT alphabetical — so words can be built from the very first group.
// cue = a stretched spoken hint for TTS; word = example; emoji = picture cue.

export const SOUND_GROUPS = [
  {
    id: 'g1', label: 'Group 1',
    sounds: [
      { g: 's', cue: 'sss', word: 'snake', emoji: '🐍' },
      { g: 'a', cue: 'aah', word: 'apple', emoji: '🍎' },
      { g: 't', cue: 'tuh', word: 'top', emoji: '🔝' },
      { g: 'i', cue: 'ih', word: 'igloo', emoji: '🧊' },
      { g: 'p', cue: 'puh', word: 'pig', emoji: '🐷' },
      { g: 'n', cue: 'nnn', word: 'nest', emoji: '🪺' },
    ],
  },
  {
    id: 'g2', label: 'Group 2',
    sounds: [
      { g: 'c', cue: 'kuh', word: 'cat', emoji: '🐱' },
      { g: 'e', cue: 'eh', word: 'egg', emoji: '🥚' },
      { g: 'h', cue: 'huh', word: 'hat', emoji: '🎩' },
      { g: 'r', cue: 'rrr', word: 'rabbit', emoji: '🐰' },
      { g: 'm', cue: 'mmm', word: 'moon', emoji: '🌙' },
      { g: 'd', cue: 'duh', word: 'dog', emoji: '🐶' },
    ],
  },
  {
    id: 'g3', label: 'Group 3',
    sounds: [
      { g: 'g', cue: 'guh', word: 'goat', emoji: '🐐' },
      { g: 'o', cue: 'oh', word: 'orange', emoji: '🍊' },
      { g: 'u', cue: 'uh', word: 'umbrella', emoji: '☂️' },
      { g: 'l', cue: 'lll', word: 'lion', emoji: '🦁' },
      { g: 'f', cue: 'fff', word: 'fish', emoji: '🐟' },
      { g: 'b', cue: 'buh', word: 'ball', emoji: '⚽' },
    ],
  },
]

// Flat list of the core CVC letters available after groups 1-3.
export const CORE_LETTERS = SOUND_GROUPS.flatMap(g => g.sounds.map(s => s.g))

// Consonant digraphs — two letters, one sound.
export const DIGRAPHS = [
  { g: 'sh', cue: 'shh', word: 'ship', emoji: '🚢' },
  { g: 'ch', cue: 'ch', word: 'chip', emoji: '🍟' },
  { g: 'th', cue: 'th', word: 'thumb', emoji: '👍' },
  { g: 'ng', cue: 'ng', word: 'ring', emoji: '💍' },
  { g: 'ck', cue: 'kuh', word: 'duck', emoji: '🦆' },
  { g: 'qu', cue: 'kwuh', word: 'queen', emoji: '👑' },
]
