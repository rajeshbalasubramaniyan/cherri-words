import credits from '../data/soundCredits.json'
import { GameHeader } from '../components/Celebrate'
import { playPhoneme } from '../services/speech'

export default function CreditsPage({ onHome }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <GameHeader title="Sound Credits" onHome={onHome} />
      <div className="flex-1 overflow-y-auto px-5 pb-10 max-w-md mx-auto w-full">
        <p className="text-ink-soft text-xs leading-relaxed mb-4">
          Our letter sounds are trimmed, stretched and volume-matched excerpts of phonetic recordings
          from <a className="underline" href="https://commons.wikimedia.org" target="_blank" rel="noreferrer">Wikimedia Commons</a>,
          used under the <a className="underline" href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a> licence.
          Our edited clips are shared under the same licence. Thank you to the recordists!
        </p>
        <div className="space-y-2">
          {credits.map(c => (
            <div key={c.file} className="bg-white/80 rounded-xl px-3 py-2 flex items-center gap-3 shadow-sm">
              <button onClick={() => playPhoneme(c.file.replace('.mp3', ''), '', null)}
                className="w-8 h-8 rounded-full bg-cherry text-white text-xs cursor-pointer flex-shrink-0" aria-label={`Play ${c.sound}`}>
                🔊
              </button>
              <div className="min-w-0">
                <p className="font-display text-cherry-deep">{c.sound}</p>
                {c.source.split(' + ').map((name, k) => (
                  <span key={k}>
                    {k > 0 && <span className="text-[11px] text-ink-soft"> + </span>}
                    <a href={(c.urls || [c.url])[k]} target="_blank" rel="noreferrer" className="text-[11px] text-ink-soft underline break-all">
                      {name}
                    </a>
                  </span>
                ))}
                <span className="text-[10px] text-ink-soft/60"> · {c.license}{c.note ? ` · ${c.note}` : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
