import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar.jsx'
import SearchFilter from '../component/SearchFilter.jsx'
import { certifications, getCertsByRole } from '../Data/Dummycertification.js'
import { Cpu, Sparkles, Trophy, ChevronRight, AlertCircle, ExternalLink, MapPin, Clock, ArrowUpRight } from 'lucide-react'

export default function Recommendation() {
  const location = useLocation()
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [field, setField] = useState('')
  const [level, setLevel] = useState('')
  const [cost, setCost] = useState('')
  const [selectedCert, setSelectedCert] = useState(null)

  // Use router state if available, otherwise fall back to last saved assessment
  const predictionState = location.state ?? (() => {
    try { return JSON.parse(localStorage.getItem('lastAssessment')) } catch { return null }
  })()
  const recommendedRole = predictionState?.result?.recommended_role ?? null

  // Role-matched certs shown at top (top 3 for the recommended role)
  const roleCerts = useMemo(() => {
    if (!recommendedRole) return []
    return certifications
      .filter((c) => c.roles.includes(recommendedRole))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3)
  }, [recommendedRole])

  // All certs sorted: matched role first, then others
  const filtered = useMemo(() => {
    const base = recommendedRole
      ? [
          ...certifications.filter((c) => c.roles.includes(recommendedRole)).sort((a, b) => b.matchScore - a.matchScore),
          ...certifications.filter((c) => !c.roles.includes(recommendedRole)).sort((a, b) => b.matchScore - a.matchScore),
        ]
      : certifications

    return base.filter((c) => {
      const matchesQuery = (c.title + c.summary + c.field).toLowerCase().includes(query.toLowerCase())
      const matchesField = !field || c.field === field
      const matchesLevel = !level || c.level === level
      const matchesCost = !cost || c.cost === cost
      return matchesQuery && matchesField && matchesLevel && matchesCost
    })
  }, [query, field, level, cost, recommendedRole])

  // If a cert is selected, show the detail view inline
  if (selectedCert) {
    return (
      <CertDetailView
        cert={selectedCert}
        recommendedRole={recommendedRole}
        onBack={() => setSelectedCert(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-wider text-gold">Your matches</p>
          <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Recommendations</h1>
          <p className="text-sm text-ink-soft">Certifications ranked and filtered to fit your skills, goals, and budget.</p>
        </div>

        {predictionState ? (
          <ModelResult state={predictionState} roleCerts={roleCerts} onViewCert={setSelectedCert} />
        ) : (
          <NoAssessmentPrompt onStart={() => navigate('/assessment')} />
        )}

        <section className="mt-7">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} />
            <h2 className="font-display text-xl font-semibold text-navy">
              {recommendedRole ? 'All certifications — best matches first' : 'Browse all certifications'}
            </h2>
          </div>
          <SearchFilter
            query={query} setQuery={setQuery}
            field={field} setField={setField}
            level={level} setLevel={setLevel}
            cost={cost} setCost={setCost}
          />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cert) => {
              const isMatch = recommendedRole && cert.roles.includes(recommendedRole)
              const displayScore = isMatch ? cert.matchScore : Math.max(30, cert.matchScore - 40)
              return (
                <InlineCertCard
                  key={cert.id}
                  cert={cert}
                  displayScore={displayScore}
                  isMatch={isMatch}
                  onView={() => setSelectedCert(cert)}
                />
              )
            })}
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

// ── Inline cert card with View Details button ─────────────────────────────────
function InlineCertCard({ cert, displayScore, isMatch, onView }) {
  const isFree = cert.cost === 'Free'
  return (
    <div className={'flex flex-col rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ' + (isMatch ? 'border-gold/40' : 'border-ink-soft/10')}>
      {isMatch && (
        <span className="mb-2 self-start rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
          Recommended for you
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper text-xs font-mono font-semibold text-navy">
          {cert.field.split(' ').map((w) => w[0]).slice(0, 2).join('')}
        </span>
        <span className={'rounded-full px-2.5 py-1 text-xs font-medium ' + (isFree ? 'bg-sage-light text-sage' : 'bg-coral-light text-coral')}>
          {isFree ? 'Free' : cert.price}
        </span>
      </div>

      <h3 className="mt-4 font-display text-base font-semibold leading-snug text-navy">{cert.title}</h3>
      <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">{cert.summary}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />{cert.provider}</span>
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" strokeWidth={1.75} />{cert.duration}</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-ink-soft/10 pt-3.5">
        <div className="flex items-center gap-1.5">
          <span className={'font-mono text-sm font-semibold ' + (isMatch ? 'text-gold' : 'text-ink-soft')}>{displayScore}%</span>
          <span className="text-xs text-ink-soft">match</span>
        </div>
        <button
          onClick={onView}
          className="flex items-center gap-1 text-xs font-medium text-navy hover:text-gold transition-colors"
        >
          View details <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Model result section ──────────────────────────────────────────────────────
function ModelResult({ state, roleCerts, onViewCert }) {
  const { result, formSummary } = state
  const { recommended_role, top_3 } = result

  return (
    <div className="mt-7 space-y-4">
      <div className="rounded-2xl border border-ink-soft/10 bg-navy p-6 text-cream sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="h-4 w-4 text-gold" strokeWidth={1.75} />
              <p className="font-mono text-xs uppercase tracking-wider text-gold">AI Model Output · Random Forest</p>
            </div>
            <p className="text-sm text-cream/60 mb-3">Based on your skills and personality profile</p>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold" strokeWidth={1.75} />
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">{recommended_role}</h2>
            </div>
            <p className="mt-2 text-sm text-cream/70">
              This is the tech career role your skills are most aligned with. Certifications matched to this role are shown below.
            </p>
          </div>
          {top_3?.[0] && (
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full bg-navy-light">
              <span className="font-display text-xl font-semibold text-gold">{Math.round(top_3[0].confidence * 100)}%</span>
              <span className="text-[10px] text-cream/50">match</span>
            </div>
          )}
        </div>
      </div>

      {/* Top 3 role breakdown */}
      {top_3?.length > 0 && (
        <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
          <p className="font-display text-sm font-semibold text-navy mb-3">Top role matches from your assessment</p>
          <div className="space-y-3">
            {top_3.map((item, idx) => {
              const pct = Math.round(item.confidence * 100)
              return (
                <div key={item.role}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={'flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ' + (idx === 0 ? 'bg-gold text-navy' : 'bg-paper text-ink-soft')}>
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-navy">{item.role}</span>
                    </div>
                    <span className="text-sm font-semibold text-navy">{pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-paper overflow-hidden">
                    <div className={'h-full rounded-full ' + (idx === 0 ? 'bg-gold' : 'bg-ink-soft/30')} style={{ width: pct + '%' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Top certs for recommended role */}
      {roleCerts.length > 0 && (
        <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} />
            <p className="font-display text-sm font-semibold text-navy">Top certifications for {recommended_role}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roleCerts.map((cert) => (
              <TopRoleCertCard key={cert.id} cert={cert} onView={() => onViewCert(cert)} />
            ))}
          </div>
        </div>
      )}

      {/* Assessment summary */}
      {formSummary && (
        <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
          <p className="font-display text-sm font-semibold text-navy mb-3">Your assessment summary</p>
          <div className="space-y-3">
            {formSummary.skills?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-ink-soft mb-1.5">Skills assessed</p>
                <div className="flex flex-wrap gap-1.5">
                  {formSummary.skills.map((s) => (
                    <span key={s} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-navy">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {formSummary.careerInterests?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-ink-soft mb-1.5">Career interests you selected</p>
                <div className="flex flex-wrap gap-1.5">
                  {formSummary.careerInterests.map((r) => (
                    <span key={r} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-navy">{r}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Small card inside the top recommendations section ────────────────────────
function TopRoleCertCard({ cert, onView }) {
  const isFree = cert.cost === 'Free'
  return (
    <div className="rounded-2xl border border-gold/20 bg-paper p-4 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="rounded-full bg-navy/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy">{cert.field}</span>
        <span className={'rounded-full px-2 py-0.5 text-[10px] font-semibold ' + (isFree ? 'bg-sage/20 text-sage' : 'bg-coral/10 text-coral')}>
          {isFree ? 'Free' : cert.price}
        </span>
      </div>
      <p className="font-display text-sm font-semibold text-navy leading-snug">{cert.title}</p>
      <p className="mt-1 text-xs text-ink-soft line-clamp-2 flex-1">{cert.summary}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-gold">{cert.matchScore}% match</span>
        <button
          onClick={onView}
          className="flex items-center gap-1 text-xs font-medium text-navy hover:text-gold transition-colors"
        >
          View details <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Full cert detail view (inline, no routing needed) ────────────────────────
function CertDetailView({ cert, recommendedRole, onBack }) {
  const isFree = cert.cost === 'Free'
  const isMatch = recommendedRole && cert.roles.includes(recommendedRole)
  const displayScore = isMatch ? cert.matchScore : Math.max(30, cert.matchScore - 40)

  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <button
          onClick={onBack}
          className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-navy"
        >
          ← Back to recommendations
        </button>

        {/* Header */}
        <div className="mt-5 rounded-2xl border border-ink-soft/10 bg-navy p-6 text-cream sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {isMatch && (
                <span className="mb-2 inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
                  Recommended for {recommendedRole}
                </span>
              )}
              <span className="block rounded-full bg-cream/10 px-2.5 py-1 text-xs font-medium text-gold-light">
                {cert.field} · {cert.level}
              </span>
              <h1 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl">{cert.title}</h1>
              <p className="mt-2 max-w-xl text-sm text-cream/70">{cert.summary}</p>
            </div>
            <div className="seal flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy-light">
              <span className="font-display text-xl font-semibold text-gold-light">{displayScore}%</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-navy hover:bg-gold-light"
            >
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
              Go to certification
            </a>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-3">
          <div className="space-y-7 lg:col-span-2">
            {/* Exam info */}
            <section className="rounded-2xl border border-ink-soft/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold text-navy mb-4">Exam info</h2>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <InfoStat label="Format"        value={cert.examInfo.format} />
                <InfoStat label="Questions"     value={String(cert.examInfo.questions)} />
                <InfoStat label="Time limit"    value={cert.examInfo.timeLimit} />
                <InfoStat label="Passing score" value={cert.examInfo.passingScore} />
                <InfoStat label="Retake policy" value={cert.examInfo.retakePolicy} />
              </dl>
              <div className="mt-5 border-t border-ink-soft/10 pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-soft">Requirements</p>
                <ul className="space-y-1.5">
                  {cert.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-ink">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sage shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-ink-soft/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold text-navy">Skills you'll gain</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {cert.skills.map((s) => (
                  <span key={s} className="rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-navy">{s}</span>
                ))}
              </div>
            </section>

            {/* CTA banner */}
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-sm font-semibold text-navy">Ready to get certified?</p>
                <p className="text-xs text-ink-soft mt-0.5">Visit the official provider page to register and begin.</p>
              </div>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-cream hover:bg-navy/90"
              >
                <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
                Visit official site
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
              <h2 className="font-display text-base font-semibold text-navy mb-3">Exam provider</h2>
              <p className="text-sm font-medium text-navy">{cert.provider}</p>
              <div className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span>{cert.location}</span>
              </div>
              <div className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span>{cert.deliveryMode} · {cert.duration}</span>
              </div>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-1.5 text-xs font-medium text-navy underline underline-offset-2 hover:text-gold"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                Official certification page
              </a>
            </div>

            <div className={'rounded-2xl border p-5 ' + (isFree ? 'border-sage/30 bg-sage-light' : 'border-coral/20 bg-coral-light')}>
              <h2 className="font-display text-base font-semibold text-navy mb-2">Cost</h2>
              <p className={'font-display text-2xl font-semibold ' + (isFree ? 'text-sage' : 'text-coral')}>{cert.price}</p>
              <p className="mt-1 text-xs text-ink-soft">
                {isFree ? 'No exam fee required.' : 'Exam fee payable directly to the provider.'}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function InfoStat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-soft">{label}</p>
      <p className="mt-1 text-sm font-medium text-navy">{value}</p>
    </div>
  )
}

function NoAssessmentPrompt({ onStart }) {
  return (
    <div className="mt-7 flex items-start gap-3 rounded-2xl border border-dashed border-ink-soft/25 bg-paper/60 p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-navy">
        <AlertCircle className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-navy">No assessment completed yet</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          Complete the skills and personality assessment to get your personalised AI-powered role recommendation and matched certifications.
        </p>
        <button onClick={onStart} className="mt-3 flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-xs font-medium text-cream hover:bg-navy/90">
          Take the assessment <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
