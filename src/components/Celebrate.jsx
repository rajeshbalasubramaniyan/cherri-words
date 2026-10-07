import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Celebrate({ show }) {
  const bits = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      id: i, x: (Math.random() - 0.5) * 340, y: (Math.random() - 0.5) * 340,
      delay: Math.random() * 0.35, emoji: ['⭐', '✨', '🌟', '🎉', '🎊', '💫'][i % 6],
    })),
    [show]
  )
  if (!show) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {bits.map(b => (
        <motion.span key={b.id} className="absolute text-2xl"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], x: b.x, y: b.y, scale: [0, 1.2, 0.7] }}
          transition={{ duration: 1.2, delay: b.delay }}>
          {b.emoji}
        </motion.span>
      ))}
    </div>
  )
}

export function GameHeader({ title, onHome, right }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <button onClick={onHome} className="text-cherry-deep/70 hover:text-cherry-deep cursor-pointer text-sm">
        ← Back
      </button>
      <h3 className="font-display text-lg text-cherry-deep">{title}</h3>
      <div className="min-w-12 text-right text-cherry-deep/40 text-xs">{right}</div>
    </div>
  )
}

export function SpeakerButton({ onClick, size = 'md', label = 'Play sound' }) {
  const dim = size === 'lg' ? 'w-16 h-16 text-2xl' : size === 'sm' ? 'w-9 h-9 text-sm' : 'w-12 h-12 text-lg'
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      aria-label={label}
      className={`${dim} rounded-full bg-cherry text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-cherry-deep transition-colors`}
    >
      🔊
    </motion.button>
  )
}
