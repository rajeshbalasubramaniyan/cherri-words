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

// Vowel-team sounds: ONE sound, several spellings. clip = recorded sound id.
export const VOWEL_SOUNDS = [
  { clip: 'ee', name: 'long e', spellings: ['ee', 'ea', 'y'], word: 'tree', emoji: '🌳', color: '#22C55E' },
  { clip: 'ai', name: 'long a', spellings: ['ai', 'ay', 'a_e'], word: 'rain', emoji: '🌧️', color: '#3B82F6' },
  { clip: 'igh', name: 'long i', spellings: ['igh', 'ie', 'i_e'], word: 'night', emoji: '🌙', color: '#8B5CF6' },
  { clip: 'oa', name: 'long o', spellings: ['oa', 'ow', 'o_e'], word: 'boat', emoji: '⛵', color: '#FBBF24' },
  { clip: 'oo', name: 'long oo', spellings: ['oo', 'ue', 'ew'], word: 'moon', emoji: '🌕', color: '#0EA5E9' },
  { clip: 'oo_short', name: 'short oo', spellings: ['oo', 'u'], word: 'book', emoji: '📖', color: '#14B8A6' },
  { clip: 'ow', name: 'ow', spellings: ['ow', 'ou'], word: 'cow', emoji: '🐄', color: '#F97316' },
  { clip: 'oi', name: 'oi', spellings: ['oi', 'oy'], word: 'coin', emoji: '🪙', color: '#EAB308' },
  { clip: 'ar', name: 'ar', spellings: ['ar'], word: 'car', emoji: '🚗', color: '#EF4444' },
  { clip: 'or', name: 'or', spellings: ['or', 'aw', 'au'], word: 'fork', emoji: '🍴', color: '#C026D3' },
  { clip: 'er', name: 'er', spellings: ['er', 'ir', 'ur'], word: 'bird', emoji: '🐦', color: '#DB2777' },
]

// Consonant digraphs — two letters, one sound.
export const DIGRAPHS = [
  { g: 'sh', cue: 'shh', word: 'ship', emoji: '🚢' },
  { g: 'ch', cue: 'ch', word: 'chip', emoji: '🍟' },
  { g: 'th', cue: 'th', word: 'thumb', emoji: '👍' },
  { g: 'ng', cue: 'ng', word: 'ring', emoji: '💍' },
  { g: 'ck', cue: 'kuh', word: 'duck', emoji: '🦆' },
  { g: 'qu', cue: 'kwuh', word: 'queen', emoji: '👑' },
]
