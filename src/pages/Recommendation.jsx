import { useMemo, useState } from 'react'
import Navbar from '../component/Navbar.jsx'
import CertCard from '../component/CertCard.jsx'
import SearchFilter from '../component/SearchFilter.jsx'
import { certifications } from '../Data/Dummycertification.js'
import { Cpu, Sparkles } from 'lucide-react'

export default function Recommendation() {
  const [query, setQuery] = useState('')
  const [field, setField] = useState('')
  const [level, setLevel] = useState('')
  const [cost, setCost] = useState('')

  const filtered = useMemo(() => {
    return certifications.filter((c) => {
      const matchesQuery = (c.title + c.summary + c.field).toLowerCase().includes(query.toLowerCase())
      const matchesField = !field || c.field === field
      const matchesLevel = !level || c.level === level
      const matchesCost = !cost || c.cost === cost
      return matchesQuery && matchesField && matchesLevel && matchesCost
    })
  }, [query, field, level, cost])

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-wider text-gold">Your matches</p>
          <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Recommendations
          </h1>
          <p className="text-sm text-ink-soft">
            Certifications ranked and filtered to fit your skills, goals, and budget.
          </p>
        </div>

        <ModelOutputPlaceholder />

        <section className="mt-7">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} />
            <h2 className="font-display text-xl font-semibold text-navy">Browse all certifications</h2>
          </div>
          <SearchFilter
            query={query} setQuery={setQuery}
            field={field} setField={setField}
            level={level} setLevel={setLevel}
            cost={cost} setCost={setCost}
          />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full rounded-xl border border-dashed border-ink-soft/20 py-10 text-center text-sm text-ink-soft">
                No certifications match your filters yet. Try adjusting your search.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

function ModelOutputPlaceholder() {
  return (
    <div className="mt-7 flex items-start gap-3 rounded-2xl border border-dashed border-ink-soft/25 bg-paper/60 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-navy">
        <Cpu className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-display text-sm font-semibold text-navy">AI Model Output (Random Forest)</p>
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
            Placeholder
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          This section is reserved for live output from the trained Random Forest model. The recommendations
          shown below are sample data and will be replaced once the model endpoint is connected.
        </p>
      </div>
    </div>
  )
}