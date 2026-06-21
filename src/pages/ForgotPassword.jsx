import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../component/FormField.jsx'
import { MailCheck, Loader2 } from 'lucide-react'
import AuthLayout from '../layout/AuthLayout.jsx'

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 600)
  }

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox"
        footer={
          <p>
            <Link to="/login" className="font-medium text-navy underline underline-offset-2">
              Back to log in
            </Link>
          </p>
        }
      >
        <div className="rounded-xl border border-sage/30 bg-sage-light px-5 py-6 text-center">
          <MailCheck className="mx-auto h-9 w-9 text-sage" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-ink">
            We sent password reset instructions to <span className="font-medium">{email}</span>.
          </p>
          <button
            onClick={() => setSent(false)}
            className="focus-ring mt-4 text-xs font-medium text-navy underline underline-offset-2"
          >
            Use a different email
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email linked to your account and we'll send you a reset link."
      footer={
        <p>
          Remembered it?{' '}
          <Link to="/login" className="font-medium text-navy underline underline-offset-2">
            Back to log in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="juan.delacruz@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-light disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Sending link…' : 'Send reset link'}
        </button>
      </form>
    </AuthLayout>
  )
}