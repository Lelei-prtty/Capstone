import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // Still checking for an existing Supabase session (e.g. right after a page
  // refresh) — don't redirect yet, or every refresh would briefly bounce a
  // logged-in user to /login before the session finishes loading.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-ink-soft">Loading…</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return children
}