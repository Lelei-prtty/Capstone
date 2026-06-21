import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../component/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import AuthLayout from '../layout/AuthLayout.jsx'
import { Loader2 } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const data = Object.fromEntries(form.entries())
    const nextErrors = {}

    if (!data.name) nextErrors.name = 'Tell us your full name.'
    if (!data.email) nextErrors.email = 'A valid email is required.'
    if (!data.school) nextErrors.school = "Your school's name helps tailor results."
    if (!data.password || data.password.length < 8) nextErrors.password = 'Use at least 8 characters.'
    if (data.confirmPassword !== data.password) nextErrors.confirmPassword = 'Passwords do not match.'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      register(data)
      setLoading(false)
      navigate('/dashboard')
    }, 600)
  }

  return (
    <AuthLayout
      title="Create your student account"
      subtitle="It's free — takes less than a minute."
      footer={
        <p>
          Already registered?{' '}
          <Link to="/login" className="font-medium text-navy underline underline-offset-2">
            Log in instead
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FormField id="name" label="Full name" placeholder="Juan Dela Cruz" error={errors.name} autoComplete="name" />
        <FormField id="email" label="School or personal email" type="email" placeholder="juan.delacruz@email.com" error={errors.email} autoComplete="email" />
        <FormField id="school" label="School / University" placeholder="University of the Philippines" error={errors.school} />
        <div className="grid grid-cols-2 gap-4">
          <FormField id="password" label="Password" type="password" placeholder="••••••••" error={errors.password} hint="At least 8 characters" autoComplete="new-password" />
          <FormField id="confirmPassword" label="Confirm password" type="password" placeholder="••••••••" error={errors.confirmPassword} autoComplete="new-password" />
        </div>

        <label className="flex items-start gap-2.5 text-xs text-ink-soft">
          <input required type="checkbox" className="focus-ring mt-0.5 h-4 w-4 rounded border-ink-soft/30 text-navy" />
          I agree to the Terms of Use and Privacy Policy.
        </label>

        <button
          type="submit"
          disabled={loading}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-light disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}