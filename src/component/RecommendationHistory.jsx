import { Clock, Award, ChevronRight, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function RecommendationHistory() {
  const navigate = useNavigate()

  // Read history from localStorage
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('assessmentHistory') || '[]')
    } catch {
      return []
    }
  })

  function clearHistory() {
    localStorage.removeItem('assessmentHistory')
    setHistory([])
  }

  if (!history || history.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-soft/20 py-16 text-center">
        <Award className="mx-auto h-8 w-8 text-ink-soft/40" strokeWidth={1.5} />
        <p className="mt-3 font-display text-base font-semibold text-navy">No history yet</p>
        <p className="mt-1 text-sm text-ink-soft">
          Complete an assessment to get your first recommendation.
        </p>
        <button
          onClick={() => navigate('/assessment')}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-xs font-medium text-cream hover:bg-navy/90"
        >
          Take the assessment
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Clear history button */}
      <div className="flex justify-end">
        <button
          onClick={clearHistory}
          className="flex items-center gap-1.5 text-xs font-medium text-ink-soft hover:text-coral transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
          Clear history
        </button>
      </div>

      {history.map((item, idx) => (
        <div key={idx} className="rounded-2xl border border-ink-soft/10 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-3.5 w-3.5 text-ink-soft" strokeWidth={1.75} />
                <span className="text-xs text-ink-soft">{item.date ?? 'Recently'}</span>
              </div>
              <p className="font-display text-lg font-semibold text-navy">
                {item.recommendedRole ?? '—'}
              </p>

              {/* Top 3 roles */}
              {item.top3?.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {item.top3.map((r, i) => (
                    <div key={r.role} className="flex items-center gap-2">
                      <span className={'flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ' + (i === 0 ? 'bg-gold text-navy' : 'bg-paper text-ink-soft')}>
                        {i + 1}
                      </span>
                      <span className="text-xs text-ink">{r.role}</span>
                      <span className="text-xs font-medium text-gold ml-auto">
                        {Math.round(r.confidence * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {item.skills?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.skills.map((s) => (
                    <span key={s} className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-medium text-navy">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Confidence badge */}
            {item.confidence !== undefined && (
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full bg-navy">
                <span className="font-display text-sm font-semibold text-gold">
                  {Math.round(item.confidence * 100)}%
                </span>
                <span className="text-[9px] text-cream/50">match</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
