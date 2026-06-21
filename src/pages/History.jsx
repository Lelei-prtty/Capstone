import Navbar from '../component/Navbar.jsx'
import RecommendationHistory from '../component/RecommendationHistory.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function History() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-2xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-wider text-gold">Past activity</p>
          <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Recommendation history
          </h1>
          <p className="text-sm text-ink-soft">A log of the certifications you've been matched with over time.</p>
        </div>

        <div className="mt-7">
          <RecommendationHistory history={user.history} />
        </div>
      </main>
    </div>
  )
}