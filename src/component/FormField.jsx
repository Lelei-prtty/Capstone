import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function FormField({ label, type = 'text', id, error, hint, ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          className={`focus-ring w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 transition-colors ${
            isPassword ? 'pr-10' : ''
          } ${
            error ? 'border-coral' : 'border-ink-soft/20 hover:border-ink-soft/40'
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="focus-ring absolute inset-y-0 right-0 flex items-center px-3 text-ink-soft hover:text-navy"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.75} /> : <Eye className="h-4 w-4" strokeWidth={1.75} />}
          </button>
        )}
      </div>
      {hint && !error && <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-coral">{error}</p>}
    </div>
  )
}