// The full CHERRI WORDS journey, SSP order. Each stage points to a game.
export const LEVELS = [
  { id: 'sounds', game: 'sounds', title: 'Sound Safari', blurb: 'Meet the letter sounds', stage: 'Sounds', emoji: '🔊', color: '#FF4D4D' },
  { id: 'blend', game: 'blend', title: 'Blend It!', blurb: 'Join sounds to make words', stage: 'Blending', emoji: '🧪', color: '#22C55E' },
  { id: 'family', game: 'family', title: 'Word Family Machine', blurb: 'cat → hat → mat', stage: 'Blending', emoji: '⚙️', color: '#3B82F6' },
  { id: 'digraphs', game: 'digraphs', title: 'Two Make One', blurb: 'sh, ch, th & friends', stage: 'Digraphs', emoji: '🤝', color: '#8B5CF6' },
  { id: 'magice', game: 'magice', title: 'Magic E', blurb: 'cap becomes cape!', stage: 'Vowel teams', emoji: '✨', color: '#FBBF24' },
  { id: 'sortsound', game: 'sortsound', title: 'Sound Sorters', blurb: 'Same sound, many spellings', stage: 'Vowel teams', emoji: '🗂️', color: '#C026D3' },
  { id: 'tricky', game: 'tricky', title: 'Rule Breakers', blurb: 'Tricky words to remember', stage: 'Sight words', emoji: '🎭', color: '#EF4444' },
  { id: 'grammar', game: 'grammar', title: 'Word Jobs', blurb: 'Naming, doing & describing words', stage: 'Grammar', emoji: '🏷️', color: '#0EA5E9' },
  { id: 'sentence', game: 'sentence', title: 'Sentence Builder', blurb: 'Put words in the right order', stage: 'Sentences', emoji: '🧱', color: '#16A34A' },
]

export const STAGES = ['Sounds', 'Blending', 'Digraphs', 'Vowel teams', 'Sight words', 'Grammar', 'Sentences']
