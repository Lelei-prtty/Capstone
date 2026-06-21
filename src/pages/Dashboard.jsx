import { useMemo, useState } from 'react'
import Navbar from '../component/Navbar.jsx'
import CertCard from '../component/CertCard.jsx'
import SearchFilter from '../component/SearchFilter.jsx'
import ProgressChecker from '../component/ProgressChecker.jsx'
import EditProfileModal from '../component/EditProfile.jsx'
import { certifications } from '../Data/Dummycertification.js'
import { useAuth } from '../context/AuthContext.jsx'
import {
  Pencil,
  GraduationCap,
  Sparkles,
  BarChart3,
  LineChart,
  Workflow,
  Code2,
  Target,
  CheckCircle2,
  Circle,
  Award,
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()

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

            <SkillReadinessAnalytics />

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
            <SuggestedLearningPath />
            <ProfileSummaryCard user={user} onEdit={() => setEditOpen(true)} />
          </aside>
        </div>
      </main>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  )
}

function SkillReadinessAnalytics() {
  return (
    <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-navy">Skill &amp; readiness analytics</h2>
        <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
          Reserved
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl bg-paper text-ink-soft">
          <BarChart3 className="h-6 w-6" strokeWidth={1.5} />
          <p className="text-xs">Skill coverage chart will appear here.</p>
        </div>
        <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl bg-paper text-ink-soft">
          <LineChart className="h-6 w-6" strokeWidth={1.5} />
          <p className="text-xs">Certification readiness over time will appear here.</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-soft">
        Space reserved for analytics and personalized learning path visualization in a future release.
      </p>
    </div>
  )
}

const learningPath = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    note: 'Build on your existing AWS Cloud Practitioner foundation.',
    status: 'current',
  },
  {
    title: 'Certified Kubernetes Administrator',
    note: 'Deepen container orchestration skills for production systems.',
    status: 'upcoming',
  },
  {
    title: 'Google Professional Data Engineer',
    note: 'Expand into data engineering and ML operationalization.',
    status: 'upcoming',
  },
]

function SuggestedLearningPath() {
  return (
    <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper text-navy">
          <Workflow className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-display text-sm font-semibold text-navy">Suggested Learning Path</p>
          <p className="text-xs text-ink-soft">Future expansion</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {learningPath.map((step) => (
          <div key={step.title} className="flex gap-3">
            <div className="mt-0.5 shrink-0">
              {step.status === 'current' ? (
                <CheckCircle2 className="h-4 w-4 text-navy" strokeWidth={1.75} />
              ) : (
                <Circle className="h-4 w-4 text-ink-soft/40" strokeWidth={1.75} />
              )}
            </div>
            <div>
              <p className={`text-sm font-medium ${step.status === 'current' ? 'text-navy' : 'text-ink'}`}>
                {step.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{step.note}</p>
              {step.status === 'current' && (
                <span className="mt-1.5 inline-block text-[10px] font-semibold uppercase tracking-wide text-gold">
                  Start here
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
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

      {expanded && <p className="mt-4 text-sm leading-relaxed text-ink">{user.bio}</p>}

      <div className="mt-5 border-t border-ink-soft/10 pt-5">
        <p className="mb-4 font-display text-sm font-semibold text-navy">Profile summary</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <Workflow className="h-3.5 w-3.5" strokeWidth={1.75} />
              Technical skills
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(user.technicalSkills ?? user.interests ?? []).map((s) => (
                <span key={s} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-navy">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <Code2 className="h-3.5 w-3.5" strokeWidth={1.75} />
              Programming languages
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(user.languages ?? []).map((s) => (
                <span key={s} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-navy">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <GraduationCap className="h-3.5 w-3.5" strokeWidth={1.75} />
              Specialization
            </div>
            <p className="text-sm text-ink">{user.specialization ?? `${user.course} — ${user.yearLevel}`}</p>
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <Target className="h-3.5 w-3.5" strokeWidth={1.75} />
              Career goal
            </div>
            <p className="text-sm text-ink">{user.careerGoal ?? '—'}</p>
          </div>
        </div>

        {user.certificationsObtained?.length > 0 && (
          <div className="mt-4 border-t border-ink-soft/10 pt-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <Award className="h-3.5 w-3.5" strokeWidth={1.75} />
              Certifications obtained
            </div>
            <div className="flex flex-wrap gap-1.5">
              {user.certificationsObtained.map((c) => (
                <span key={c} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-navy">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}