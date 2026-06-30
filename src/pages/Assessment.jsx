import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Check } from 'lucide-react'
import Navbar from '../component/Navbar.jsx'

const SKILL_LEVELS = ['Beginner', 'Junior', 'Intermediate', 'Senior', 'Expert']

const TECHNICAL_SKILLS = [
  "Networking",
  "Cybersecurity",
  "Database Management",
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Data Analysis",
  "Machine Learning",
  "Project Management",
  "UI/UX Design",
  "Graphic Design",
  "AI/Machine Learning",
  "Operating Systems",
  "System Design",
  "Object-Oriented Programming",
  "Data Structures and Algorithms",
  "Data Science",
]

const PROGRAMMING_LANGUAGES = [
  'Python',
  'SQL',
  'TypeScript',
  'JavaScript',
  'Java',
  'HTML/CSS',
  'C#',
  'C',
  'C++',
  'PHP',
  'Assembly',
  'Kotlin',
  'R',
  'Swift',
]

const SPECIALIZATIONS = [
  'Data Science',
  'Web Science',
]

const COMPLETED_PROJECTS = [
  'E-commerce website',
  'REST API development',
  'Mobile app (Android / iOS)',
  'ML/AI model',
  'Network monitoring tool',
  'Database design',
  'Chatbot / NLP system',
  'Data dashboard',
  'Capstone / thesis system',
  'Open-source contribution',
  'Penetration testing lab',
  'IoT prototype',
]

const INTERNSHIP_ROLES = [
  'Web developer intern',
  'IT support intern',
  'Data analyst intern',
  'QA / testing intern',
  'Cybersecurity intern',
  'Cloud / infra intern',
  'Software dev intern',
  'Network engineer intern',
  'None yet',
]

const INTERNSHIP_DURATIONS = [
  '1 month',
  '2 months',
  '3 months',
  '4 months',
  '5 months',
  '6 months',
  '7–9 months',
  '10–12 months',
  'More than 1 year',
]

const CAREER_INTERESTS = [
  'Software developer',
  'Cybersecurity analyst',
  'Cloud / DevOps engineer',
  'Data scientist',
  'Network engineer',
  'AI / ML engineer',
  'Full-stack web developer',
  'Mobile app developer',
  'Database administrator',
  'IT project manager',
  'QA / test engineer',
  'UI/UX designer',
  'Game developer',
  'Freelance / entrepreneur',
]

export default function Assessment() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    technicalSkills: [],        // [{ skill, level }]
    languages: [],
    specialization: '',
    completedProjects: [],
    internshipRole: '',
    internshipDuration: '',
    certificatesObtained: '',
    careerInterests: [],
  })

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSkillToggle(skill) {
    setForm((f) => {
      const exists = f.technicalSkills.find((s) => s.skill === skill)
      if (exists) {
        return { ...f, technicalSkills: f.technicalSkills.filter((s) => s.skill !== skill) }
      }
      return { ...f, technicalSkills: [...f.technicalSkills, { skill, level: 'Beginner' }] }
    })
  }

  function handleSkillLevel(skill, level) {
    setForm((f) => ({
      ...f,
      technicalSkills: f.technicalSkills.map((s) =>
        s.skill === skill ? { ...s, level } : s
      ),
    }))
  }

  function handleSubmit() {
    navigate('/recommendations')
  }

  const isNoneYet = form.internshipRole === 'None yet'

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
            : "Share where you want to go, and we'll map a certification path toward it."}
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
            {/* Technical Skills with Rating */}
            <Card title="Skills & experience">
              <Field
                label="Technical skills"
                hint="Select all areas where you have hands-on experience, then rate your level."
              >
                <SkillSelector
                  skills={TECHNICAL_SKILLS}
                  selected={form.technicalSkills}
                  onToggle={handleSkillToggle}
                  onLevel={handleSkillLevel}
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
                <div className="flex flex-wrap gap-2">
                  {SPECIALIZATIONS.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => update('specialization', form.specialization === spec ? '' : spec)}
                      className={`focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                        form.specialization === spec
                          ? 'border-navy bg-navy text-cream'
                          : 'border-ink-soft/20 bg-white text-ink hover:border-navy/40'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </Field>
            </Card>

            {/* Background */}
            <Card title="Background">
              <Field label="Completed projects" hint="Select all project types you have built or contributed to.">
                <MultiSelect
                  options={COMPLETED_PROJECTS}
                  selected={form.completedProjects}
                  onChange={(v) => update('completedProjects', v)}
                  placeholder="Select completed projects"
                />
              </Field>

              <Field label="Internship experience">
                <SingleSelect
                  options={INTERNSHIP_ROLES}
                  selected={form.internshipRole}
                  onChange={(v) => {
                    update('internshipRole', v)
                    if (v === 'None yet') update('internshipDuration', '')
                  }}
                  placeholder="Select internship role"
                />
                {form.internshipRole && !isNoneYet && (
                  <div className="mt-3">
                    <p className="mb-1.5 text-xs font-medium text-ink-soft">Duration</p>
                    <SingleSelect
                      options={INTERNSHIP_DURATIONS}
                      selected={form.internshipDuration}
                      onChange={(v) => update('internshipDuration', v)}
                      placeholder="Select duration"
                    />
                  </div>
                )}
              </Field>

              <Field
                label="Certificates already obtained"
                hint="List any certifications you already hold so we don't recommend duplicates."
              >
                <textarea
                  rows={3}
                  value={form.certificatesObtained}
                  onChange={(e) => update('certificatesObtained', e.target.value)}
                  placeholder="e.g. AWS Cloud Practitioner, Google Data Analytics, CompTIA A+…"
                  className="focus-ring w-full resize-y rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60"
                />
              </Field>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="mt-7 space-y-6">
            <Card title="Career interests">
              <Field
                label="Where do you want to go?"
                hint="Select all roles that interest you. We'll prioritize the best-fit certifications."
              >
                <div className="flex flex-wrap gap-2">
                  {CAREER_INTERESTS.map((role) => {
                    const isSelected = form.careerInterests.includes(role)
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() =>
                          update(
                            'careerInterests',
                            isSelected
                              ? form.careerInterests.filter((r) => r !== role)
                              : [...form.careerInterests, role]
                          )
                        }
                        className={`focus-ring flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          isSelected
                            ? 'border-navy bg-navy text-cream'
                            : 'border-ink-soft/20 bg-white text-ink hover:border-navy/40'
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                        {role}
                      </button>
                    )
                  })}
                </div>
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

// ── Sub-components ────────────────────────────────────────────────────────────

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

// Skill selector with inline level rating
function SkillSelector({ skills, selected, onToggle, onLevel }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-left text-sm"
      >
        <span className={selected.length ? 'text-ink' : 'text-ink-soft/60'}>
          {selected.length ? `${selected.length} skill${selected.length > 1 ? 's' : ''} selected` : 'Select technical skills'}
        </span>
        <ChevronDown className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-ink-soft/10 bg-white p-1.5 shadow-lg">
          {skills.map((skill) => {
            const isSelected = selected.find((s) => s.skill === skill)
            return (
              <button
                key={skill}
                type="button"
                onClick={() => onToggle(skill)}
                className="focus-ring flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-ink hover:bg-paper"
              >
                {skill}
                {isSelected && <Check className="h-4 w-4 text-navy" strokeWidth={2} />}
              </button>
            )
          })}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-3 space-y-2">
          {selected.map(({ skill, level }) => (
            <div
              key={skill}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ink-soft/10 bg-paper px-3.5 py-2.5"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggle(skill)}
                  className="text-ink-soft hover:text-coral text-xs"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
                <span className="text-sm font-medium text-navy">{skill}</span>
              </div>
              <div className="flex gap-1">
                {SKILL_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => onLevel(skill, lvl)}
                    className={`focus-ring rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                      level === lvl
                        ? 'bg-navy text-cream'
                        : 'bg-white border border-ink-soft/20 text-ink-soft hover:border-navy/40 hover:text-navy'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Multi-select dropdown
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

function SingleSelect({ options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-left text-sm"
      >
        <span className={selected ? 'text-ink' : 'text-ink-soft/60'}>
          {selected || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl border border-ink-soft/10 bg-white p-1.5 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { onChange(option); setOpen(false) }}
              className="focus-ring flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-ink hover:bg-paper"
            >
              {option}
              {selected === option && <Check className="h-4 w-4 text-navy" strokeWidth={2} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}