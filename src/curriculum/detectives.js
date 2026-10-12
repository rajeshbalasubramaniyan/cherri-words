// Ages 8–11 · Why is it spelt like that?
// Each level tells the true story behind a strange spelling, then checks it.
// Born from Anthra's questions: if cut is cut, why is cute cute? Why gh? Why letters nobody says?

const WHY_E = ['makes the vowel long', 'stops the word ending in v', 'makes c or g soft', 'shows it is not a plural']
const IE_EI = ['ee sound, so ie', 'ee after c, so ei', 'ay sound, so ei', 'rule-breaker']
const HOME = ['Greek', 'French', 'Italian']

export default {
  id: 'detectives', name: 'Word Detectives', ages: '8–11', grade: 'The stories behind strange spellings', emoji: '🕵️', color: '#0D9488',
  about: 'Why is cute not cut? Why is there a gh in night? Why write a letter nobody says? Every strange spelling has a reason. Come and find it.',
  levels: [
    { id: 'freeze', title: 'The Great Spelling Freeze', blurb: 'Why spelling and sound drifted apart', emoji: '🧊', engine: 'Story',
      content: {
        story: [
          { emoji: '📜', title: 'English is very old', text: 'English is more than 1,000 years old. Long ago, people spelt words just the way they said them. In the word knight, every letter was spoken, even the k.' },
          { emoji: '🖨️', title: 'Then came the printing press', text: 'In 1476 William Caxton set up the first printing press in England. Once a word had been printed in thousands of books, everyone copied that spelling. Spelling began to freeze.' },
          { emoji: '🗣️', title: 'But talking kept changing', text: 'People went on changing the way they spoke. Some sounds faded away and others shifted. The spelling stayed where it was.' },
          { emoji: '🦴', title: 'Spellings are fossils', text: 'So a strange spelling is often a fossil. It shows how the word sounded hundreds of years ago. Word detectives read those clues.' },
        ],
        then: 'Choose', prompt: 'What did you find out?', rounds: [
          { q: 'Why do many English words have letters we do not say?', options: ['The letters used to be spoken', 'To make spelling harder', 'Nobody knows'], answer: 'The letters used to be spoken', explain: 'Most silent letters were once real sounds. The sound left, the letter stayed.' },
          { q: 'What made spellings stop changing?', options: ['The printing press', 'The telephone', 'The alphabet song'], answer: 'The printing press', explain: 'Printed books spread one spelling to everyone, so it stuck.' },
          { q: 'About 700 years ago, how did people say “knight”?', options: ['With a k sound at the start', 'Exactly like today', 'Like “kite”'], answer: 'With a k sound at the start', explain: 'They said the k, and the gh too. It sounded a bit like “k-nicht”.' },
          { q: 'A spelling that shows an old sound is like a…', options: ['fossil', 'mistake', 'joke'], answer: 'fossil', explain: 'A fossil shows what lived long ago. An old spelling shows what was said long ago.' },
        ],
      } },

    { id: 'cute', title: 'Why Cute Isn’t Cut', blurb: 'The real story of magic e', emoji: '✨', engine: 'Story',
      content: {
        story: [
          { emoji: '✂️', title: 'Cut and cute', text: 'Add an e to cut and you get cute. The u now says its own name. But why put an e there if we never say it?', words: ['cut', 'cute'] },
          { emoji: '👄', title: 'The e used to be spoken', text: 'Hundreds of years ago, lots of words ended in a little “uh” sound. Name was said “nah-muh”. Time was said “tee-muh”. That is why they were written with an e.', words: ['name', 'time', 'hope'] },
          { emoji: '🤫', title: 'The sound left, the job stayed', text: 'Slowly people stopped saying the “uh”. But the e was still useful. It told readers that the vowel before it was long.' },
          { emoji: '🪄', title: 'So writers kept using it', text: 'The silent e became a signal. Writers used it for newer words too, like cute. It is not magic. It is a leftover sound that found a new job.' },
        ],
        then: 'Choose', prompt: 'Think like a detective.', rounds: [
          { q: 'What does the e do to the u in cute?', text: 'cut → cute', say: 'cut. cute.', options: ['Makes it say its name', 'Makes it silent', 'Nothing at all'], answer: 'Makes it say its name', explain: 'The e signals a long vowel: u says “you”.' },
          { q: 'Long ago, how was “name” said?', options: ['nah-muh', 'nam', 'nay-mee'], answer: 'nah-muh', explain: 'Two beats, with the e spoken as a soft “uh” at the end.' },
          { q: 'Take the e off kite. What word is left?', text: 'kite', options: ['kit', 'cat', 'kite'], answer: 'kit', explain: 'Without the signal, the i goes short again: kit.' },
          { q: 'Which pair shows the silent e doing its job?', options: ['tap → tape', 'cat → cats', 'run → ran'], answer: 'tap → tape', explain: 'Short a in tap, long a in tape. The e made the difference.' },
          { q: 'Is the e in cute a mistake?', options: ['No, it is a signal', 'Yes, it is a mistake'], answer: 'No, it is a signal', explain: 'It tells you how to say the vowel. Tiny letter, big job.' },
        ],
      } },

    { id: 'busy-e', title: 'The Busy Silent E', blurb: 'Four jobs for one quiet letter', emoji: '🐝', engine: 'Story',
      content: {
        story: [
          { emoji: '1️⃣', title: 'Job one: make the vowel long', text: 'This is the one you know. Hop becomes hope, cub becomes cube, cut becomes cute.', words: ['hope', 'cube', 'cute'] },
          { emoji: '2️⃣', title: 'Job two: guard the letter v', text: 'English words do not like to end in v. So an e stands guard after it. That is why have, give and love end in e, even though the vowel is short.', words: ['have', 'give', 'love'] },
          { emoji: '3️⃣', title: 'Job three: soften c and g', text: 'Before an e, the letter c says s and the letter g says j. Take the e off dance or large and they would end in hard sounds.', words: ['dance', 'prince', 'large'] },
          { emoji: '4️⃣', title: 'Job four: “I am not a plural”', text: 'An s on the end usually means more than one. The e shows that the s belongs to the word. Tens means lots of ten. Tense is a different word.', words: ['tense', 'please', 'house'] },
        ],
        then: 'Choose', prompt: 'What job is the silent e doing?', keepOrder: true, rounds: [
          { text: 'give', options: WHY_E, answer: 'stops the word ending in v', explain: 'The i is short, so the e is not making it long. It is guarding the v.' },
          { text: 'cube', options: WHY_E, answer: 'makes the vowel long', explain: 'cub → cube. The u says its name.' },
          { text: 'dance', options: WHY_E, answer: 'makes c or g soft', explain: 'The e makes the c say s.' },
          { text: 'please', options: WHY_E, answer: 'shows it is not a plural', explain: 'Without the e it would look like “pleas”, more than one plea.' },
          { text: 'love', options: WHY_E, answer: 'stops the word ending in v', explain: 'Same job as in have and give.' },
          { text: 'large', options: WHY_E, answer: 'makes c or g soft', explain: 'The e makes the g say j.' },
          { text: 'tense', options: WHY_E, answer: 'shows it is not a plural', explain: 'tens = more than one ten. tense = tight or worried.' },
        ],
      } },

    { id: 'gh', title: 'The Ghost of GH', blurb: 'night, laugh and ghost', emoji: '👻', engine: 'Story',
      content: {
        story: [
          { emoji: '🗣️', title: 'A sound English lost', text: 'The letters gh used to stand for a rough sound made at the back of the mouth, like the end of the Scottish word loch. Night sounded like “nicht”. German still says Nacht for night and Licht for light.' },
          { emoji: '🌙', title: 'The sound faded away', text: 'Over time people stopped making that sound. In night, light, high, eight and daughter it went completely silent. The letters stayed as a fossil.', words: ['night', 'light', 'daughter'] },
          { emoji: '😂', title: 'Sometimes it turned into f', text: 'In a few words the rough sound did not vanish. It changed into f. That is why laugh, cough, enough, rough and tough all end with an f sound.', words: ['laugh', 'cough', 'enough'] },
          { emoji: '👻', title: 'And what about ghost?', text: 'Ghost used to be spelt “gost”. It is thought that Caxton’s printers, who came from Flanders, added the h because their own word was “gheest”. At the start of a word, gh always says a hard g.', words: ['ghost', 'ghastly'] },
        ],
        then: 'TapAll', rounds: [
          { prompt: 'Tap the words where gh is silent', items: [{ w: 'night', ok: true }, { w: 'high', ok: true }, { w: 'daughter', ok: true }, { w: 'eight', ok: true }, { w: 'laugh', ok: false }, { w: 'tough', ok: false }],
            explain: 'In these words the old throaty sound simply disappeared.' },
          { prompt: 'Tap the words where gh says f', items: [{ w: 'enough', ok: true }, { w: 'cough', ok: true }, { w: 'rough', ok: true }, { w: 'laugh', ok: true }, { w: 'though', ok: false }, { w: 'light', ok: false }],
            explain: 'Here the throaty sound turned into f instead of vanishing.' },
          { prompt: 'Tap the words where gh says a hard g', items: [{ w: 'ghost', ok: true }, { w: 'ghastly', ok: true }, { w: 'spaghetti', ok: true }, { w: 'ghoul', ok: true }, { w: 'sight', ok: false }, { w: 'tough', ok: false }],
            explain: 'At the start of a word gh says g. In spaghetti it is the Italian way of keeping the g hard.' },
        ],
      } },

    { id: 'quiet', title: 'Letters That Went Quiet', blurb: 'knee, write, lamb', emoji: '🤫', engine: 'Story',
      content: {
        story: [
          { emoji: '🦵', title: 'K-nee and k-night', text: 'The k in knee, knot, knife and know used to be spoken. Try saying k-n quickly. It is hard work! Over time people dropped the k. German still says the k in Knie, its word for knee.', words: ['knee', 'knot', 'know'] },
          { emoji: '✍️', title: 'W-rite and g-naw', text: 'The same thing happened to the w in write, wrong and wrist, and to the g in gnaw and gnat. Each one was once a real sound.', words: ['write', 'wrong', 'gnaw'] },
          { emoji: '🐑', title: 'Lam-b and com-b', text: 'The b at the end of lamb, comb and climb was spoken too. After m it slowly melted away.', words: ['lamb', 'comb', 'climb'] },
          { emoji: '👀', title: 'Why keep them?', text: 'Because they help your eyes. A silent letter tells apart words that sound the same. A knight is not a night, and to write is not to be right.' },
        ],
        then: 'Choose', prompt: 'The silent letter tells these twins apart. Pick the right one.', rounds: [
          { q: 'Which one is a soldier in armour?', options: ['knight', 'night'], answer: 'knight', explain: 'The old k is still there on the page, so you can tell it from night.' },
          { q: 'Which one do you tie in a rope?', options: ['knot', 'not'], answer: 'knot' },
          { q: 'Which one do you do with a pen?', options: ['write', 'right'], answer: 'write', explain: 'The w was once spoken. Now it helps you spot the meaning.' },
          { q: 'Which one is sixty minutes?', options: ['hour', 'our'], answer: 'hour' },
          { q: 'Which one means all of it?', options: ['whole', 'hole'], answer: 'whole' },
          { q: 'Which one means “I understand it”?', options: ['know', 'no'], answer: 'know', explain: 'know keeps its k and its w. Both used to be heard.' },
        ],
      } },

    { id: 'scholars', title: 'Letters Added on Purpose', blurb: 'debt, doubt, island', emoji: '🎓', engine: 'Story',
      content: {
        story: [
          { emoji: '🏛️', title: 'The scholars who loved Latin', text: 'About 500 years ago, many scholars thought Latin was the finest language. They wanted English words to show off their Latin roots.' },
          { emoji: '✏️', title: 'So they added letters', text: 'Dette became debt, to match the Latin word debitum. Doute became doubt, to match dubitare. Receit became receipt. Samon became salmon.', words: ['debt', 'doubt', 'receipt', 'salmon'] },
          { emoji: '🙊', title: 'Nobody ever said them', text: 'These letters are different from the k in knee. They were never spoken in English at all. They were added only on paper.' },
          { emoji: '🏝️', title: 'The island mistake', text: 'Island was once spelt “iland”. Scholars thought it came from the Latin word insula, like isle, so they added an s. They were wrong! Iland was an old English word all along. The s stayed anyway.', words: ['island', 'isle'] },
        ],
        then: 'Choose', prompt: 'Which letter did the scholars add?', keepOrder: true, rounds: [
          { text: 'debt', options: ['d', 'b', 't'], answer: 'b', explain: 'From Latin debitum. In English it was “dette” and the b was never said.' },
          { text: 'doubt', options: ['d', 'b', 't'], answer: 'b', explain: 'From Latin dubitare. English had been writing “doute”.' },
          { text: 'island', options: ['i', 's', 'd'], answer: 's', explain: 'Added by mistake. The word never had an s sound.' },
          { text: 'receipt', options: ['c', 'p', 't'], answer: 'p', explain: 'From Latin recepta. Before that it was “receit”.' },
          { text: 'salmon', options: ['s', 'l', 'n'], answer: 'l', explain: 'From Latin salmo. People said “samon” then, and we still do.' },
          { q: 'Were these letters ever spoken in English?', options: ['No, never', 'Yes, long ago'], answer: 'No, never', explain: 'That is what makes them special. They were added for the eyes, not the ears.' },
        ],
      } },

    { id: 'family', title: 'Silent Letters, Loud Relatives', blurb: 'sign and signal, two and twin', emoji: '👨‍👩‍👧', engine: 'Story',
      content: {
        story: [
          { emoji: '🧬', title: 'Spelling shows family', text: 'English spelling does two jobs. It shows how a word sounds, and it shows which words belong together. Words from the same family keep the same letters, even when the sound changes.' },
          { emoji: '🚦', title: 'Sign and signal', text: 'Sign has a silent g. But listen to signal and signature. There is the g, loud and clear! The silent g in sign shows they are relatives.', words: ['sign', 'signal', 'signature'] },
          { emoji: '2️⃣', title: 'Two and twin', text: 'Why is there a w in two? Because two belongs with twin, twice, twelve and twenty. You can hear the w in all of those.', words: ['two', 'twin', 'twice', 'twenty'] },
          { emoji: '🔎', title: 'A detective trick', text: 'When you cannot remember a silent letter, look for a relative where you can hear it. Muscle is hard to spell until you think of muscular.' },
        ],
        then: 'Choose', prompt: 'Which relative lets you HEAR the silent letter?', rounds: [
          { text: 'sign', options: ['signal', 'sing', 'sigh'], answer: 'signal', explain: 'sig-nal. The g speaks up.' },
          { text: 'bomb', options: ['bombard', 'boom', 'bonnet'], answer: 'bombard', explain: 'bom-bard. Now you can hear the second b.' },
          { text: 'muscle', options: ['muscular', 'mussel', 'music'], answer: 'muscular', explain: 'mus-cu-lar. The c is back, saying k.' },
          { text: 'two', options: ['twin', 'too', 'to'], answer: 'twin', explain: 'Twin, twice, twelve and twenty all say the w.' },
          { text: 'autumn', options: ['autumnal', 'August', 'automatic'], answer: 'autumnal', explain: 'au-tum-nal. The n wakes up.' },
          { text: 'crumb', options: ['crumble', 'crumpet', 'cream'], answer: 'crumble', explain: 'crum-ble. You can hear the b.' },
          { text: 'soften', options: ['soft', 'sofa', 'often'], answer: 'soft', explain: 'Soften is soft + en. The t is silent, but it shows the family.' },
        ],
      } },

    { id: 'love', title: 'Why Love Isn’t Luv', blurb: 'The handwriting problem', emoji: '🪶', engine: 'Story',
      content: {
        story: [
          { emoji: '🪶', title: 'Books written by hand', text: 'Before printing, every book was copied by hand with a quill. The letters u, n, m, v and w were all made from the same short straight strokes.' },
          { emoji: '😵', title: 'A row of sticks', text: 'Put those letters side by side and a word turned into a row of sticks. A word like “luv” or “munk” was very hard to read. Which strokes were the u?' },
          { emoji: '⭕', title: 'The clever fix', text: 'Many experts think the writers solved it by changing u to o next to those letters. A round o is easy to spot among the sticks.' },
          { emoji: '💛', title: 'So o says “uh”', text: 'That is why love, come, some, son, monk and wonder are written with an o but said with the sound in cup.', words: ['love', 'come', 'some', 'son', 'wonder'] },
        ],
        then: 'TapAll', rounds: [
          { prompt: 'Tap the words where o says “uh”, like the u in cup', items: [{ w: 'love', ok: true }, { w: 'come', ok: true }, { w: 'monkey', ok: true }, { w: 'front', ok: true }, { w: 'home', ok: false }, { w: 'hot', ok: false }],
            explain: 'Look at the letter next to each o: v, m or n. Stick letters!' },
          { prompt: 'Tap the words where o says “uh”', items: [{ w: 'son', ok: true }, { w: 'month', ok: true }, { w: 'wonder', ok: true }, { w: 'nothing', ok: true }, { w: 'stone', ok: false }, { w: 'gone', ok: false }],
            explain: 'A son is a boy. The sun is in the sky. The spelling tells them apart.' },
          { prompt: 'Tap the words where o says “uh”', items: [{ w: 'some', ok: true }, { w: 'above', ok: true }, { w: 'honey', ok: true }, { w: 'tongue', ok: true }, { w: 'bone', ok: false }, { w: 'top', ok: false }],
            explain: 'Every one has an o beside m, n or v.' },
        ],
      } },

    { id: 'borrowed', title: 'Words From Far Away', blurb: 'chef, school, pizza', emoji: '🌍', engine: 'Story',
      content: {
        story: [
          { emoji: '🧳', title: 'English is a collector', text: 'English has borrowed words from languages all over the world. Often it kept the spelling from the word’s first home. That is why one letter pair can have different sounds.' },
          { emoji: '🏺', title: 'Clues from Greek', text: 'In words from Greek, ch says k and ph says f.', words: ['school', 'echo', 'chemist', 'photo', 'dolphin'] },
          { emoji: '🥐', title: 'Clues from French', text: 'In words from French, ch says sh, que says k, and a t on the end can be silent.', words: ['chef', 'machine', 'unique', 'ballet'] },
          { emoji: '🍕', title: 'Clues from Italian', text: 'Italian gave us food and music words. Its double z says ts, and gh keeps a g hard.', words: ['pizza', 'spaghetti', 'piano'] },
        ],
        then: 'Choose', prompt: 'Read the spelling clue. Where did the word come from?', keepOrder: true, rounds: [
          { text: 'chef', options: HOME, answer: 'French', explain: 'ch saying sh is the French clue.' },
          { text: 'school', options: HOME, answer: 'Greek', explain: 'ch saying k is the Greek clue.' },
          { text: 'photo', options: HOME, answer: 'Greek', explain: 'ph saying f comes from Greek. Photo means light.' },
          { text: 'pizza', options: HOME, answer: 'Italian', explain: 'zz saying ts is Italian.' },
          { text: 'machine', options: HOME, answer: 'French', explain: 'It came to English through French, so ch says sh.' },
          { text: 'echo', options: HOME, answer: 'Greek', explain: 'ch saying k again. Echo is a Greek word.' },
          { text: 'ballet', options: HOME, answer: 'French', explain: 'The silent t on the end is a French clue.' },
          { text: 'spaghetti', options: HOME, answer: 'Italian', explain: 'gh keeps the g hard, the Italian way.' },
          { text: 'antique', options: HOME, answer: 'French', explain: 'que saying k is French, like unique.' },
        ],
      } },

    { id: 'ie-ei', title: 'Cracking ie and ei', blurb: 'The rule that really works', emoji: '🔐', engine: 'Story',
      content: {
        story: [
          { emoji: '🤔', title: 'The rule with a secret', text: '“i before e, except after c” seems to fail all the time. The secret is that it only works when the letters make an ee sound.' },
          { emoji: '1️⃣', title: 'Step one: ee sound', text: 'If you hear ee, write ie.', words: ['field', 'thief', 'piece', 'believe'] },
          { emoji: '2️⃣', title: 'Step two: ee after c', text: 'If you hear ee straight after a c, write ei. Receive, deceive and perceive are one family. They all come from a Latin word that means to take.', words: ['receive', 'ceiling', 'deceive'] },
          { emoji: '3️⃣', title: 'Step three: ay sound', text: 'If you hear ay, write ei.', words: ['eight', 'weigh', 'vein', 'neighbour'] },
          { emoji: '😈', title: 'The rule-breakers', text: 'A few words break the rule and just have to be learnt. The best one to remember is weird, because it is weird.', words: ['weird', 'seize', 'protein'] },
        ],
        then: 'Choose', prompt: 'Why is it spelt this way?', keepOrder: true, rounds: [
          { text: 'field', options: IE_EI, answer: 'ee sound, so ie' },
          { text: 'receive', options: IE_EI, answer: 'ee after c, so ei', explain: 'The ee sound comes straight after c.' },
          { text: 'eight', options: IE_EI, answer: 'ay sound, so ei' },
          { text: 'weird', options: IE_EI, answer: 'rule-breaker', explain: 'It says ee with no c before it, yet it is ei. Weird!' },
          { text: 'piece', options: IE_EI, answer: 'ee sound, so ie', explain: 'A piece of pie. Both have ie.' },
          { text: 'ceiling', options: IE_EI, answer: 'ee after c, so ei' },
          { text: 'neighbour', options: IE_EI, answer: 'ay sound, so ei' },
          { text: 'seize', options: IE_EI, answer: 'rule-breaker', explain: 'ee sound, no c, but still ei. One to learn by heart.' },
        ],
      } },

    { id: 'case-closed', title: 'Case Closed', blurb: 'Solve every spelling mystery', emoji: '🏆', engine: 'Choose',
      content: { prompt: 'You are the detective now. Why is it spelt like that?', rounds: [
        { text: 'night', q: 'Why is there a gh?', options: ['It was once a throaty sound', 'Scholars added it from Latin', 'It makes the i short'], answer: 'It was once a throaty sound', explain: 'The sound vanished and the letters stayed.' },
        { text: 'debt', q: 'Why is there a b?', options: ['Scholars added it from Latin', 'It used to be spoken', 'It came from Greek'], answer: 'Scholars added it from Latin', explain: 'To match debitum. It was never said.' },
        { text: 'knee', q: 'Why is there a k?', options: ['It used to be spoken', 'Scholars added it', 'It makes the e long'], answer: 'It used to be spoken', explain: 'People once said k-nee.' },
        { text: 'love', q: 'Why an o and not a u?', options: ['u was hard to read in handwriting', 'It came from Greek', 'The e makes it long'], answer: 'u was hard to read in handwriting', explain: 'An o stood out among the stick letters.' },
        { text: 'have', q: 'Why is there an e?', options: ['English words do not end in v', 'To make the a long', 'It used to be Latin'], answer: 'English words do not end in v', explain: 'The a is short, so it is not the long-vowel job.' },
        { text: 'chef', q: 'Why does ch say sh?', options: ['It came from French', 'It came from Greek', 'It is a mistake'], answer: 'It came from French' },
        { text: 'sign', q: 'Why keep the silent g?', options: ['It shows the link to signal', 'It makes the i short', 'Scholars added it by mistake'], answer: 'It shows the link to signal', explain: 'Relatives keep the same letters.' },
        { text: 'cute', q: 'Why the e on the end?', options: ['It signals a long vowel', 'It stops it ending in t', 'It came from Italian'], answer: 'It signals a long vowel', explain: 'And that is why cute is not cut. Case closed!' },
      ] } },
  ],
}
