import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../component/Navbar.jsx'
import CertCard from '../component/CertCard.jsx'
import SearchFilter from '../component/SearchFilter.jsx'
import ProgressChecker from '../component/ProgressChecker.jsx'
import RecommendationHistory from '../component/RecommendationHistory.jsx'
import EditProfileModal from '../component/EditProfile.jsx'
import { certifications } from '../Data/Dummycertification.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Pencil, GraduationCap, Sparkles } from 'lucide-react'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'history', label: 'History' },
  { key: 'profile', label: 'Profile' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'

  const [query, setQuery] = useState('')
  const [field, setField] = useState('')
  const [level, setLevel] = useState('')
  const [cost, setCost] = useState('')
  const [editOpen, setEditOpen] = useState(false)

  const filtered = useMemo(() => {
    return certifications.filter((c) => {
      const matchesQuery = (c.title + c.summary + c.field).toLowerCase().includes(query.toLowerCase())
      const matchesField = !field || c.field === field
      const matchesLevel = !level || c.level === level
      const matchesCost = !cost || c.cost === cost
      return matchesQuery && matchesField && matchesLevel && matchesCost
    })
  }, [query, field, level, cost])

  const topRecommendations = useMemo(
    () => [...certifications].sort((a, b) => b.matchScore - a.matchScore).slice(0, 3),
    []
  )

  if (!user) return null

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-wider text-gold">Welcome back</p>
          <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Hi, {user.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-ink-soft">Here's what's lined up for your certification journey.</p>
        </div>

        <div className="mt-6 flex gap-1 border-b border-ink-soft/10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setSearchParams(t.key === 'overview' ? {} : { tab: t.key })}
              className={`focus-ring relative px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === t.key ? 'text-navy' : 'text-ink-soft hover:text-navy'
              }`}
            >
              {t.label}
              {activeTab === t.key && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold" />}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-3">
            <div className="space-y-7 lg:col-span-2">
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.75} />
                  <h2 className="font-display text-xl font-semibold text-navy">Top recommendations for you</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {topRecommendations.map((cert) => (
                    <CertCard key={cert.id} cert={cert} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-display text-xl font-semibold text-navy">Browse all certifications</h2>
                <SearchFilter
                  query={query} setQuery={setQuery}
                  field={field} setField={setField}
                  level={level} setLevel={setLevel}
                  cost={cost} setCost={setCost}
                />
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            </div>

            <aside className="space-y-7">
              <ProgressChecker progress={user.progress} />
              <ProfileSummaryCard user={user} onEdit={() => setEditOpen(true)} />
            </aside>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="mt-7 max-w-2xl">
            <RecommendationHistory history={user.history} />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="mt-7 max-w-2xl">
            <ProfileSummaryCard user={user} onEdit={() => setEditOpen(true)} expanded />
          </div>
        )}
      </main>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  )
}

function ProfileSummaryCard({ user, onEdit, expanded = false }) {
  return (
    <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy font-display text-xl font-semibold text-cream">
            {user.name[0]}
          </span>
          <div>
            <p className="font-display text-base font-semibold text-navy">{user.name}</p>
            <p className="text-xs text-ink-soft">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="focus-ring flex items-center gap-1.5 rounded-lg border border-ink-soft/20 px-2.5 py-1.5 text-xs font-medium text-navy hover:bg-paper"
        >
          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
          Edit
        </button>
      </div>

      <div className="mt-4 flex items-start gap-2 text-sm text-ink-soft">
        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
        <p>
          {user.course} · {user.yearLevel}
          <br />
          {user.school}
        </p>
      </div>

      {expanded && (
        <>
          <p className="mt-4 text-sm leading-relaxed text-ink">{user.bio}</p>
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-soft">Interests</p>
            <div className="flex flex-wrap gap-1.5">
              {user.interests.map((i) => (
                <span key={i} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-navy">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}