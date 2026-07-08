import { useState } from 'react'
import Navbar from '../component/Navbar.jsx'
import EditProfileModal from '../component/EditProfile.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import {
  Pencil,
  GraduationCap,
  Workflow,
  Code2,
  Target,
  Award,
} from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()
  const [editOpen, setEditOpen] = useState(false)

  if (!user) return null

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-2xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-wider text-gold">Your profile</p>
          <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Profile
          </h1>
          <p className="text-sm text-ink-soft">
            Keep this up to date for more accurate certification recommendations.
          </p>
        </div>

        <div className="mt-7">
          <ProfileSummaryCard user={user} onEdit={() => setEditOpen(true)} expanded />
        </div>
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
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy font-display text-xl font-semibold text-cream">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              user.name[0]
            )}
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