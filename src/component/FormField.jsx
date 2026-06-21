export default function FormField({ label, type = 'text', id, error, hint, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`focus-ring w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 transition-colors ${
          error ? 'border-coral' : 'border-ink-soft/20 hover:border-ink-soft/40'
        }`}
        {...props}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-coral">{error}</p>}
    </div>
  )
}