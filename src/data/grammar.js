// Parts of speech as friendly jobs, plus sentence-building sets.

export const WORD_JOBS = {
  noun: { label: 'Naming word', hint: 'a person, animal, place or thing', color: '#3B82F6', emoji: '🏷️' },
  verb: { label: 'Doing word', hint: 'an action you can do', color: '#EF4444', emoji: '🏃' },
  adjective: { label: 'Describing word', hint: 'tells us more about something', color: '#FBBF24', emoji: '🎨' },
}

// Round = a target job + a mix of words to tap.
export const JOB_ROUNDS = [
  { job: 'noun', words: [ {w:'dog',job:'noun'}, {w:'run',job:'verb'}, {w:'happy',job:'adjective'}, {w:'ball',job:'noun'} ] },
  { job: 'verb', words: [ {w:'jump',job:'verb'}, {w:'cat',job:'noun'}, {w:'big',job:'adjective'}, {w:'sing',job:'verb'} ] },
  { job: 'adjective', words: [ {w:'tiny',job:'adjective'}, {w:'bird',job:'noun'}, {w:'swim',job:'verb'}, {w:'red',job:'adjective'} ] },
]

// Sentence builder: scrambled words -> correct order. Capital + full stop taught.
export const SENTENCES = [
  { words: ['The', 'cat', 'is', 'happy'], emoji: '🐱' },
  { words: ['I', 'can', 'see', 'a', 'dog'], emoji: '🐶' },
  { words: ['We', 'play', 'in', 'the', 'park'], emoji: '🏞️' },
  { words: ['The', 'sun', 'is', 'very', 'hot'], emoji: '☀️' },
]
