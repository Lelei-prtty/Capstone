export default function ProgressChecker({ progress }) {
  const { completed, inProgress, saved, goal } = progress
  const pct = Math.min(100, Math.round((completed / goal) * 100))
  const circumference = 2 * Math.PI * 42

  return (
    <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
      <h2 className="font-display text-lg font-semibold text-navy">Progress checker</h2>
      <p className="mt-1 text-sm text-ink-soft">Your certification goal for this school year.</p>

      <div className="mt-5 flex items-center gap-6">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
          <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#F1EAD8" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#C9952C"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * pct) / 100}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display text-2xl font-semibold text-navy">{pct}%</span>
            <span className="text-[10px] uppercase tracking-wide text-ink-soft">complete</span>
          </div>
        </div>

        <dl className="grid flex-1 grid-cols-1 gap-2.5 text-sm">
          <div className="flex items-center justify-between rounded-lg bg-sage-light px-3 py-2">
            <dt className="text-ink-soft">Completed</dt>
            <dd className="font-mono font-semibold text-sage">{completed}</dd>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gold/10 px-3 py-2">
            <dt className="text-ink-soft">In progress</dt>
            <dd className="font-mono font-semibold text-gold">{inProgress}</dd>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-paper px-3 py-2">
            <dt className="text-ink-soft">Saved</dt>
            <dd className="font-mono font-semibold text-navy">{saved}</dd>
          </div>
        </dl>
      </div>
      <p className="mt-4 text-xs text-ink-soft">
        Goal: complete <span className="font-medium text-navy">{goal} certifications</span> this school year.
      </p>
    </div>
  )
}