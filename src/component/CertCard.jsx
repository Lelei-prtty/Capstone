import { Link } from 'react-router-dom'
import { MapPin, Clock, ArrowUpRight } from 'lucide-react'

export default function CertCard({ cert }) {
  const isFree = cert.cost === 'Free'
  return (
    <Link
      to={`/certifications/${cert.id}`}
      className="focus-ring group flex flex-col rounded-2xl border border-ink-soft/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_8px_24px_-12px_rgba(27,42,74,0.25)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper text-xs font-mono font-semibold text-navy">
          {cert.field
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isFree ? 'bg-sage-light text-sage' : 'bg-coral-light text-coral'
          }`}
        >
          {isFree ? 'Free' : cert.price}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-navy group-hover:underline decoration-gold/60 underline-offset-4">
        {cert.title}
      </h3>
      <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">{cert.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-soft">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
          {cert.provider}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
          {cert.duration}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-ink-soft/10 pt-3.5">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm font-semibold text-gold">{cert.matchScore}%</span>
          <span className="text-xs text-ink-soft">match</span>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-navy opacity-0 transition-opacity group-hover:opacity-100">
          View details <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}