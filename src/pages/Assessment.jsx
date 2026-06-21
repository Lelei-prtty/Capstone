import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Check } from 'lucide-react'
import Navbar from '../component/Navbar.jsx'

const TECHNICAL_SKILLS = [
  'Cloud Computing', 'Data Analysis', 'DevOps', 'Machine Learning',
  'Cybersecurity', 'UI/UX Design', 'Project Management', 'Networking',
]

const PROGRAMMING_LANGUAGES = [
  'Python', 'SQL', 'TypeScript', 'JavaScript', 'Java', 'C++', 'HTML/CSS', 'Swift', 'C#',
]

const EXISTING_CERTIFICATES = [
  'AWS Certified Cloud Practitioner', 'Google Data Analytics',
  'CompTIA A+', 'Microsoft Azure Fundamentals', 'Certified Scrum Master',
]

export default function Assessment() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    technicalSkills: [],
    languages: [],
    specialization: '',
    completedProjects: '',
    internshipExperience: '',
    certificatesObtained: [],
    careerGoal: '',
  })

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit() {
    // TODO: persist assessment + recompute recommendations
    navigate('/dashboard?tab=recommendations')
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        <p className="text-xs font-semibold text-navy">Step {step} of 2</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
          {step === 1 ? 'Tell us about yourself' : 'What are you working toward?'}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {step === 1
            ? 'The more detail you provide, the more accurate your certification recommendations will be. All fields are optional, but a complete profile yields the best matches.'
            : 'Share where you want to go, and we\u2019ll map a certification path toward it.'}
        </p>

        <div className="mt-3 flex gap-1.5">
          {[1, 2].map((s) => (
            <span
              key={s}
              className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-navy' : 'bg-ink-soft/15'}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="mt-7 space-y-6">
            <Card title="Skills & experience">
              <Field label="Technical skills" hint="Select all areas where you have hands-on experience.">
                <MultiSelect
                  options={TECHNICAL_SKILLS}
                  selected={form.technicalSkills}
                  onChange={(v) => update('technicalSkills', v)}
                  placeholder="Select technical skills"
                />
              </Field>

              <Field label="Programming languages" hint="Languages you can build with comfortably.">
                <MultiSelect
                  options={PROGRAMMING_LANGUAGES}
                  selected={form.languages}
                  onChange={(v) => update('languages', v)}
                  placeholder="Select programming languages"
                />
              </Field>

              <Field label="Academic specialization">
                <input
                  type="text"
                  value={form.specialization}
                  onChange={(e) => update('specialization', e.target.value)}
                  placeholder="e.g. Computer Science — Data & Cloud Systems"
                  className="focus-ring w-full rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60"
                />
              </Field>
            </Card>

            <Card title="Background">
              <Field label="Completed projects">
                <textarea
                  rows={3}
                  value={form.completedProjects}
                  onChange={(e) => update('completedProjects', e.target.value)}
                  placeholder="Briefly describe notable projects you have built or contributed to."
                  className="focus-ring w-full resize-y rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60"
                />
              </Field>

              <Field label="Internship experience">
                <textarea
                  rows={3}
                  value={form.internshipExperience}
                  onChange={(e) => update('internshipExperience', e.target.value)}
                  placeholder="Describe any internships, including your role and responsibilities."
                  className="focus-ring w-full resize-y rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60"
                />
              </Field>

              <Field
                label="Certificates already obtained"
                hint="Helps us avoid recommending credentials you already hold."
              >
                <MultiSelect
                  options={EXISTING_CERTIFICATES}
                  selected={form.certificatesObtained}
                  onChange={(v) => update('certificatesObtained', v)}
                  placeholder="Select your existing certificates"
                />
              </Field>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="mt-7 space-y-6">
            <Card title="Career goals">
              <Field label="Future career plan">
                <textarea
                  rows={3}
                  value={form.careerGoal}
                  onChange={(e) => update('careerGoal', e.target.value)}
                  placeholder="e.g. Become a Cloud Solutions Architect within 3 years."
                  className="focus-ring w-full resize-y rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60"
                />
              </Field>
            </Card>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between">
          <button
            onClick={() => (step === 1 ? navigate('/dashboard') : setStep(1))}
            className="focus-ring rounded-lg px-4 py-2.5 text-sm font-medium text-ink-soft hover:text-navy"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              className="focus-ring rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-cream hover:bg-navy/90"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="focus-ring rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-navy hover:bg-gold/90"
            >
              Get recommendations
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-ink-soft/10 bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-navy">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      <p className="text-sm font-medium text-navy">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-ink-soft">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  )
}

function MultiSelect({ options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function toggle(option) {
    onChange(
      selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option]
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-left text-sm"
      >
        <span className={selected.length ? 'text-ink' : 'text-ink-soft/60'}>
          {selected.length ? `${selected.length} selected` : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl border border-ink-soft/10 bg-white p-1.5 shadow-lg">
          {options.map((option) => {
            const isSelected = selected.includes(option)
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className="focus-ring flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-ink hover:bg-paper"
              >
                {option}
                {isSelected && <Check className="h-4 w-4 text-navy" strokeWidth={2} />}
              </button>
            )
          })}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-navy"
            >
              {s}
              <button
                type="button"
                onClick={() => toggle(s)}
                className="text-ink-soft hover:text-coral"
                aria-label={`Remove ${s}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}