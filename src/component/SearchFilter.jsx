import { Search, SlidersHorizontal } from 'lucide-react'
import { fields, levels } from '../Data/Dummycertification.js'

export default function SearchFilter({ query, setQuery, field, setField, level, setLevel, cost, setCost }) {
  return (
    <div className="rounded-2xl border border-ink-soft/10 bg-white p-4 sm:p-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" strokeWidth={1.75} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search certifications, e.g. “data analytics”, “bookkeeping”…"
          className="focus-ring w-full rounded-xl border border-ink-soft/15 bg-cream py-2.5 pl-10 pr-3.5 text-sm placeholder:text-ink-soft/60"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.75} />
          Filter:
        </span>

        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="focus-ring rounded-lg border border-ink-soft/15 bg-cream px-2.5 py-1.5 text-xs font-medium text-ink"
        >
          <option value="">All fields</option>
          {fields.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="focus-ring rounded-lg border border-ink-soft/15 bg-cream px-2.5 py-1.5 text-xs font-medium text-ink"
        >
          <option value="">All levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <div className="flex items-center gap-1 rounded-lg border border-ink-soft/15 bg-cream p-1">
          {['', 'Free', 'Paid'].map((c) => (
            <button
              key={c || 'all'}
              onClick={() => setCost(c)}
              className={`focus-ring rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                cost === c ? 'bg-navy text-cream' : 'text-ink-soft hover:text-navy'
              }`}
            >
              {c || 'All'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}