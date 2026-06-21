import { useState } from 'react'
import { X } from 'lucide-react'
import FormField from './FormField'
import { useAuth } from '../context/AuthContext'

export default function EditProfile({ open, onClose }) {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState(user)

  if (!open) return null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateProfile(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-cream p-6 sm:rounded-2xl sm:p-7">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-navy">Edit profile</h2>
          <button onClick={onClose} className="focus-ring rounded-lg p-1.5 text-ink-soft hover:bg-paper hover:text-navy" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-2xl font-semibold text-cream">
              {form.name?.[0] ?? 'S'}
            </span>
            <button type="button" className="focus-ring rounded-lg border border-ink-soft/20 px-3 py-1.5 text-xs font-medium text-navy hover:bg-paper">
              Change photo
            </button>
          </div>

          <FormField id="name" label="Full name" value={form.name} onChange={handleChange} />
          <FormField id="email" label="Email" type="email" value={form.email} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <FormField id="school" label="School" value={form.school} onChange={handleChange} />
            <FormField id="course" label="Course" value={form.course} onChange={handleChange} />
          </div>
          <FormField id="yearLevel" label="Year level" value={form.yearLevel} onChange={handleChange} />

          <div>
            <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-navy">Short bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={form.bio}
              onChange={handleChange}
              className="focus-ring w-full resize-none rounded-lg border border-ink-soft/20 bg-white px-3.5 py-2.5 text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="focus-ring flex-1 rounded-lg border border-ink-soft/20 px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="focus-ring flex-1 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-cream hover:bg-navy-light"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}