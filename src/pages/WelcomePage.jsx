import { motion } from 'framer-motion'

const floatLetters = [
  { ch: 'A', x: '14%', y: '20%', c: '#FF4D4D', d: 0 },
  { ch: 'b', x: '80%', y: '16%', c: '#22C55E', d: 0.3 },
  { ch: 'C', x: '18%', y: '70%', c: '#3B82F6', d: 0.6 },
  { ch: 'z', x: '82%', y: '68%', c: '#FBBF24', d: 0.9 },
]

export default function WelcomePage({ onStart }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {floatLetters.map((l, i) => (
        <motion.div key={i} className="absolute font-display hidden sm:block"
          style={{ left: l.x, top: l.y, color: l.c, fontSize: 64 }}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.85, scale: 1 }}
          transition={{ delay: l.d, type: 'spring', stiffness: 120 }}>
          <span style={{ animation: 'floaty 4s ease-in-out infinite', display: 'inline-block' }}>{l.ch}</span>
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        className="text-7xl mb-3" style={{ animation: 'floaty 4s ease-in-out infinite' }}>
        🍒
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="text-5xl sm:text-6xl md:text-7xl text-cherry-deep mb-2">
        CHERRI WORDS
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-sun text-lg sm:text-xl font-display mb-1" style={{ color: '#D97706' }}>
        Where Daydreams Work!
      </motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-ink-soft text-sm sm:text-base mb-8 max-w-sm">
        Listen, blend and spell your way through the magical world of English words!
      </motion.p>

      <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
        onClick={onStart}
        className="bg-gradient-to-b from-cherry to-cherry-deep text-white font-display text-xl sm:text-2xl px-10 py-4 rounded-full cursor-pointer shadow-lg shadow-cherry/30">
        Start Learning!
      </motion.button>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }}
        className="absolute bottom-4 text-ink-soft/50 text-[10px]">
        A CHERRI GROUP product · Built with love in Bengaluru
      </motion.p>
    </div>
  )
}
