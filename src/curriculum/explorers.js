// Ages 5–6 · Year 1 · Grade 1 · Phonics Phases 3–5
import { DIGRAPHS, VOWEL_SOUNDS } from '../data/sounds'

export default {
  id: 'explorers', name: 'Explorers', ages: '5–6', grade: 'Year 1 · Grade 1', emoji: '🧭', color: '#22C55E',
  about: 'Two-letter sounds, vowel teams, consonant blends, magic e and first sentences.',
  levels: [
    { id: 'digraphs', title: 'Two Make One', blurb: 'sh ch th ng qu ck', emoji: '🤝', engine: 'ExploreCards',
      content: { prompt: 'Two letters, ONE sound. Tap to hear them!', cols: 3,
        cards: DIGRAPHS.map(d => ({ big: d.g, emoji: d.emoji, word: d.word, cue: d.cue, clip: d.g })) } },
    { id: 'digblend', title: 'Digraph Blending', blurb: 'sh-i-p → ship', emoji: '🧪', engine: 'Blend',
      content: { words: [
        { word: 'ship', sounds: ['sh', 'i', 'p'], emoji: '🚢' },
        { word: 'chip', sounds: ['ch', 'i', 'p'], emoji: '🍟' },
        { word: 'thin', sounds: ['th', 'i', 'n'], emoji: '📏' },
        { word: 'ring', sounds: ['r', 'i', 'ng'], emoji: '💍' },
        { word: 'duck', sounds: ['d', 'u', 'ck'], emoji: '🦆' },
        { word: 'quick', sounds: ['qu', 'i', 'ck'], emoji: '⚡' },
        { word: 'shop', sounds: ['sh', 'o', 'p'], emoji: '🏪' },
        { word: 'chat', sounds: ['ch', 'a', 't'], emoji: '💬' },
      ] } },
    { id: 'vowelsafari', title: 'Vowel Team Safari', blurb: 'ee ai igh oa oo…', emoji: '🦜', engine: 'ExploreCards',
      content: { prompt: 'One sound — lots of ways to spell it! Tap each card.', cols: 2,
        cards: VOWEL_SOUNDS.map(v => ({ chips: v.spellings, emoji: v.emoji, sub: `${v.name} · ${v.word}`, word: v.word, clip: v.clip, cue: v.name, color: v.color })) } },
    { id: 'blends', title: 'Consonant Blends', blurb: 'st fr cr fl dr', emoji: '🐸', engine: 'Blend',
      content: { words: [
        { word: 'stop', sounds: ['s', 't', 'o', 'p'], emoji: '🛑' },
        { word: 'frog', sounds: ['f', 'r', 'o', 'g'], emoji: '🐸' },
        { word: 'crab', sounds: ['c', 'r', 'a', 'b'], emoji: '🦀' },
        { word: 'flag', sounds: ['f', 'l', 'a', 'g'], emoji: '🚩' },
        { word: 'drum', sounds: ['d', 'r', 'u', 'm'], emoji: '🥁' },
        { word: 'nest', sounds: ['n', 'e', 's', 't'], emoji: '🪺' },
        { word: 'milk', sounds: ['m', 'i', 'l', 'k'], emoji: '🥛' },
        { word: 'hand', sounds: ['h', 'a', 'n', 'd'], emoji: '✋' },
      ] } },
    { id: 'magice', title: 'Magic E', blurb: 'cap becomes cape!', emoji: '✨', engine: 'Transform',
      content: { prompt: 'Add a magic e — it makes the vowel say its NAME!', items: [
        { parts: ['cap', 'e'], result: 'cape', emoji: '🦸', sound: 'ai', explain: 'The e is silent, but it makes the a say its name: a-e.' },
        { parts: ['kit', 'e'], result: 'kite', emoji: '🪁', sound: 'igh', explain: 'Magic e turns i into its name: kite.' },
        { parts: ['hop', 'e'], result: 'hope', emoji: '🤞', sound: 'oa', explain: 'Magic e turns o into its name: hope.' },
        { parts: ['tub', 'e'], result: 'tube', emoji: '🧪', sound: 'oo', explain: 'Magic e turns u into its name: tube.' },
        { parts: ['pin', 'e'], result: 'pine', emoji: '🌲', sound: 'igh' },
        { parts: ['can', 'e'], result: 'cane', emoji: '🦯', sound: 'ai' },
        { parts: ['rob', 'e'], result: 'robe', emoji: '🥋', sound: 'oa' },
        { parts: ['cub', 'e'], result: 'cube', emoji: '🧊', sound: 'oo' },
      ] } },
    { id: 'sorters', title: 'Sound Sorters', blurb: 'Same sound, many spellings', emoji: '🗂️', engine: 'TapAll',
      content: { rounds: [
        { prompt: 'Tap every word with the sound', target: 'long e', clip: 'ee', say: 'ee', hint: 'ee, ea or y', items: [
          { w: 'tree', ok: true }, { w: 'leaf', ok: true }, { w: 'sea', ok: true }, { w: 'happy', ok: true }, { w: 'boat', ok: false }, { w: 'rain', ok: false } ],
          explain: 'tree, leaf, sea and happy all make the same “ee” sound — spelled ee, ea and y!' },
        { prompt: 'Tap every word with the sound', target: 'long a', clip: 'ai', say: 'ay', hint: 'ai, ay or a_e', items: [
          { w: 'rain', ok: true }, { w: 'play', ok: true }, { w: 'cake', ok: true }, { w: 'snail', ok: true }, { w: 'moon', ok: false }, { w: 'coin', ok: false } ] },
        { prompt: 'Tap every word with the sound', target: 'long i', clip: 'igh', say: 'eye', hint: 'igh, ie or i_e', items: [
          { w: 'night', ok: true }, { w: 'pie', ok: true }, { w: 'kite', ok: true }, { w: 'light', ok: true }, { w: 'tree', ok: false }, { w: 'book', ok: false } ] },
        { prompt: 'Tap every word with the sound', target: 'long o', clip: 'oa', say: 'oh', hint: 'oa, ow or o_e', items: [
          { w: 'boat', ok: true }, { w: 'snow', ok: true }, { w: 'bone', ok: true }, { w: 'toad', ok: true }, { w: 'cow', ok: false }, { w: 'car', ok: false } ],
          explain: 'Careful: “snow” has ow saying oh, but in “cow” ow says ow!' },
        { prompt: 'Tap every word with the sound', target: 'oo', clip: 'oo', say: 'oo', hint: 'oo, ue or ew', items: [
          { w: 'moon', ok: true }, { w: 'blue', ok: true }, { w: 'new', ok: true }, { w: 'spoon', ok: true }, { w: 'fork', ok: false }, { w: 'bird', ok: false } ] },
      ] } },
    { id: 'tricky2', title: 'Tricky Words', blurb: 'said, was, you, they…', emoji: '🎭', engine: 'SpellIt',
      content: { mode: 'show', words: [
        { word: 'said', hint: '“Hello,” said the cat.' }, { word: 'was', hint: 'It was sunny.' },
        { word: 'you', hint: 'I like you!' }, { word: 'they', hint: 'They ran home.' },
        { word: 'are', hint: 'We are friends.' }, { word: 'my', hint: 'This is my hat.' },
        { word: 'some', hint: 'Can I have some?' }, { word: 'come', hint: 'Come and play!' },
      ] } },
    { id: 'sentence1', title: 'Build a Sentence', blurb: 'Words in the right order', emoji: '🧱', engine: 'OrderWords',
      content: { prompt: 'Put the words in order', sentences: [
        { words: ['The', 'cat', 'sat', 'on', 'the', 'mat'], end: '.', emoji: '🐱', explain: 'A sentence starts with a capital letter and ends with a full stop.' },
        { words: ['I', 'can', 'see', 'a', 'red', 'bus'], end: '.', emoji: '🚌' },
        { words: ['We', 'like', 'to', 'play'], end: '.', emoji: '⚽' },
        { words: ['Is', 'it', 'a', 'big', 'dog'], end: '?', emoji: '🐕', explain: 'A question ends with a question mark ?' },
        { words: ['The', 'sun', 'is', 'hot'], end: '.', emoji: '☀️' },
      ] } },
    { id: 'capitals', title: 'Capital Catch', blurb: 'Capitals & full stops', emoji: '🔠', engine: 'Choose',
      content: { prompt: 'Which one is written correctly?', rounds: [
        { options: ['the dog ran.', 'The dog ran.', 'The dog ran'], answer: 'The dog ran.', explain: 'Start with a capital letter, end with a full stop.' },
        { options: ['I met Sam.', 'I met sam.', 'i met Sam.'], answer: 'I met Sam.', explain: 'Names like Sam always get a capital — and so does “I”.' },
        { options: ['We went to London.', 'We went to london.', 'we went to London.'], answer: 'We went to London.', explain: 'Places have capital letters too.' },
        { options: ['My cat is fat.', 'my cat is fat.', 'My cat is fat'], answer: 'My cat is fat.' },
        { options: ['Can I go out?', 'can I go out?', 'Can I go out.'], answer: 'Can I go out?', explain: 'It’s a question, so it ends with ?' },
        { options: ['On Monday I swim.', 'On monday I swim.', 'on Monday I swim.'], answer: 'On Monday I swim.', explain: 'Days of the week start with a capital letter.' },
      ] } },
  ],
}
