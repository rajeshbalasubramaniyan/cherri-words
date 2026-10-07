import { motion } from 'framer-motion'
import { LEVELS } from '../data/levels'

export default function LevelMap({ onHome, onPlay, completed = {} }) {
  let lastStage = null
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onHome} className="text-cherry-deep/70 hover:text-cherry-deep cursor-pointer text-sm">← Home</button>
        <h3 className="font-display text-lg text-cherry-deep">Your Word Journey</h3>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10 max-w-md mx-auto w-full">
        <div className="space-y-3">
          {LEVELS.map((lvl, i) => {
            const showStage = lvl.stage !== lastStage
            lastStage = lvl.stage
            const done = completed[lvl.id]
            return (
              <div key={lvl.id}>
                {showStage && (
                  <p className="text-ink-soft/60 text-[11px] uppercase tracking-wider font-medium mt-4 mb-1 ml-1">
                    {lvl.stage}
                  </p>
                )}
                <motion.button
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => onPlay(lvl.game)}
                  className="w-full flex items-center gap-4 bg-white/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left cursor-pointer">
                  <div className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 relative"
                    style={{ backgroundColor: lvl.color + '22', width: 52, height: 52 }}>
                    {lvl.emoji}
                    {done && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-leaf text-white text-[11px] flex items-center justify-center shadow">✓</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg" style={{ color: lvl.color }}>{lvl.title}</p>
                    <p className="text-ink-soft text-xs">{lvl.blurb}</p>
                  </div>
                  <span className="text-cherry-deep/30 text-lg flex-shrink-0">▶</span>
                </motion.button>
              </div>
            )
          })}
        </div>
        <p className="text-center text-ink-soft/40 text-[10px] mt-8">More word adventures coming soon!</p>
      </div>
    </div>
  )
}
