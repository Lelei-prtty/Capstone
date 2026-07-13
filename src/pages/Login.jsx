import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import FormField from '../component/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Loader2 } from 'lucide-react'
import AuthLayout from '../layout/AuthLayout.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const successMessage = location.state?.message

  function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const email = form.get('email')
    const password = form.get('password')

    if (!email || !password) {
      setError('Enter both your email and password to continue.')
      return
    }
    setError('')
    setLoading(true)
    login(email, password)
      .then(() => navigate('/dashboard'))
      .catch((err) => setError(err.message || 'Could not log in. Check your email and password.'))
      .finally(() => setLoading(false))
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see your recommended certifications."
      footer={
        <p>
          New here?{' '}
          <Link to="/register" className="font-medium text-navy underline underline-offset-2">
            Create a student account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {successMessage && (
          <p className="rounded-lg bg-sage-light px-3.5 py-2.5 text-sm text-sage" role="status">
            {successMessage}
          </p>
        )}
        <FormField id="email" label="School or personal email" type="email" placeholder="juan.delacruz@email.com" autoComplete="email" />
        <FormField id="password" label="Password" type="password" placeholder="••••••••" autoComplete="current-password" />

        {error && (
          <p className="rounded-lg bg-coral-light px-3.5 py-2.5 text-sm text-coral" role="alert">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-soft">
            <input type="checkbox" className="focus-ring h-4 w-4 rounded border-ink-soft/30 text-navy" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-navy underline underline-offset-2">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-light disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  )
}