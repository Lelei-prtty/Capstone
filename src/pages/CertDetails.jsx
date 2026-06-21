import { Link, useParams } from 'react-router-dom'
import Navbar from '../component/Navbar.jsx'
import { certifications } from '../Data/Dummycertification.js'
import {
  ArrowLeft, MapPin, Building2, Wallet, FileText, ListChecks,
  Clock, Repeat, Target, Bookmark, CheckCircle2,
} from 'lucide-react'

export default function CertDetail() {
  const { id } = useParams()
  const cert = certifications.find((c) => c.id === id)

  if (!cert) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <p className="font-display text-2xl text-navy">Certification not found</p>
          <Link to="/dashboard" className="mt-4 inline-block text-sm font-medium text-navy underline underline-offset-2">
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  const isFree = cert.cost === 'Free'

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <Link to="/dashboard" className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-navy">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Back to dashboard
        </Link>

        <div className="mt-5 rounded-2xl border border-ink-soft/10 bg-navy p-6 text-cream sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-cream/10 px-2.5 py-1 text-xs font-medium text-gold-light">
                {cert.field} · {cert.level}
              </span>
              <h1 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl">
                {cert.title}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-cream/70">{cert.summary}</p>
            </div>
            <div className="seal flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy-light">
              <span className="font-display text-xl font-semibold text-gold-light">{cert.matchScore}%</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="focus-ring flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-navy hover:bg-gold-light">
              <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
              Mark as in progress
            </button>
            <button className="focus-ring flex items-center gap-2 rounded-lg border border-cream/30 px-4 py-2.5 text-sm font-medium text-cream hover:bg-cream/10">
              <Bookmark className="h-4 w-4" strokeWidth={1.75} />
              Save for later
            </button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-3">
          <div className="space-y-7 lg:col-span-2">
            <section className="rounded-2xl border border-ink-soft/10 bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-gold" strokeWidth={1.75} />
                <h2 className="font-display text-lg font-semibold text-navy">Exam info</h2>
              </div>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <InfoStat icon={ListChecks} label="Format" value={cert.examInfo.format} />
                <InfoStat icon={Target} label="Questions" value={String(cert.examInfo.questions)} />
                <InfoStat icon={Clock} label="Time limit" value={cert.examInfo.timeLimit} />
                <InfoStat icon={CheckCircle2} label="Passing score" value={cert.examInfo.passingScore} />
                <InfoStat icon={Repeat} label="Retake policy" value={cert.examInfo.retakePolicy} />
              </dl>

              <div className="mt-5 border-t border-ink-soft/10 pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-soft">Requirements</p>
                <ul className="space-y-1.5">
                  {cert.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" strokeWidth={2} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-2xl border border-ink-soft/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-lg font-semibold text-navy">Skills you'll gain</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {cert.skills.map((s) => (
                  <span key={s} className="rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-navy">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gold" strokeWidth={1.75} />
                <h2 className="font-display text-base font-semibold text-navy">Exam provider</h2>
              </div>
              <p className="text-sm font-medium text-navy">{cert.provider}</p>
              <div className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span>{cert.location}</span>
              </div>
              <div className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span>{cert.deliveryMode} · {cert.duration}</span>
              </div>
            </div>

            <div className={`rounded-2xl border p-5 ${isFree ? 'border-sage/30 bg-sage-light' : 'border-coral/20 bg-coral-light'}`}>
              <div className="mb-2 flex items-center gap-2">
                <Wallet className={`h-4 w-4 ${isFree ? 'text-sage' : 'text-coral'}`} strokeWidth={1.75} />
                <h2 className="font-display text-base font-semibold text-navy">Cost</h2>
              </div>
              <p className={`font-display text-2xl font-semibold ${isFree ? 'text-sage' : 'text-coral'}`}>
                {cert.price}
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                {isFree
                  ? 'No exam fee required for this certification.'
                  : 'Exam fee payable directly to the provider.'}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function InfoStat({ icon: Icon, label, value }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs text-ink-soft">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-navy">{value}</p>
    </div>
  )
}