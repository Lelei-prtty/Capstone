import { Link } from 'react-router-dom'
import { certifications } from '../Data/Dummycertification.js'
import { CheckCircle2, Clock4, Bookmark, ArrowRight } from 'lucide-react'

const statusStyles = {
  Completed: { icon: CheckCircle2, className: 'text-sage bg-sage-light' },
  'In Progress': { icon: Clock4, className: 'text-gold bg-gold/10' },
  Saved: { icon: Bookmark, className: 'text-navy bg-paper' },
}

export default function RecommendationHistory({ history }) {
  return (
    <div className="rounded-2xl border border-ink-soft/10 bg-white p-5">
      <h2 className="font-display text-lg font-semibold text-navy">Recommendation history</h2>
      <p className="mt-1 text-sm text-ink-soft">Certifications you've viewed, saved, or completed.</p>

      <ul className="mt-4 divide-y divide-ink-soft/10">
        {history.map((item) => {
          const cert = certifications.find((c) => c.id === item.id)
          if (!cert) return null
          const { icon: Icon, className } = statusStyles[item.status]
          return (
            <li key={item.id}>
              <Link
                to={`/certifications/${cert.id}`}
                className="focus-ring group flex items-center gap-3.5 py-3.5"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${className}`}>
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-navy group-hover:underline decoration-gold/60 underline-offset-4">
                    {cert.title}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {item.status} · Viewed {item.viewedOn}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft/40 transition-colors group-hover:text-gold" />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}