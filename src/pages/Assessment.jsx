import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Check, Loader2 } from 'lucide-react'
import Navbar from '../component/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const SKILL_LEVELS = ['Beginner', 'Junior', 'Intermediate', 'Senior', 'Expert']

// Maps your UI skill label -> the exact model feature name
// Values 5 (Beginner/Junior) or 6 (Intermediate/Senior/Expert) because
// the model was trained on scale 0-6 with baseline=4 and primary skill=6
const SKILL_MAP = {
  'Networking':                     'Networking',
  'Cybersecurity':                  'Cyber Security',
  'Database Management':            'Database Fundamentals',
  'Web Development':                'Software Development',
  'Mobile Development':             'Programming Skills',
  'Game Development':               'Programming Skills',
  'Data Analysis':                  'Data Science',
  'Machine Learning':               'AI ML',
  'Project Management':             'Project Management',
  'UI/UX Design':                   'Graphics Designing',
  'Graphic Design':                 'Graphics Designing',
  'AI/Machine Learning':            'AI ML',
  'Operating Systems':              'Computer Architecture',
  'System Design':                  'Software Engineering',
  'Object-Oriented Programming':    'Software Engineering',
  'Data Structures and Algorithms': 'Programming Skills',
  'Data Science':                   'Data Science',
}

// CRITICAL: model trained on 0-6 scale, baseline=4, primary skill=5 or 6
const SKILL_LEVEL_SCORE = {
  Beginner:     6,
  Junior:       6,
  Intermediate: 6,
  Senior:       6,
  Expert:       6,
}

const TECHNICAL_SKILLS = [
  'Networking', 'Cybersecurity', 'Database Management', 'Web Development',
  'Mobile Development', 'Game Development', 'Data Analysis', 'Machine Learning',
  'Project Management', 'UI/UX Design', 'Graphic Design', 'AI/Machine Learning',
  'Operating Systems', 'System Design', 'Object-Oriented Programming',
  'Data Structures and Algorithms', 'Data Science',
]

const PROGRAMMING_LANGUAGES = [
  'Python', 'SQL', 'TypeScript', 'JavaScript', 'Java', 'HTML/CSS',
  'C#', 'C', 'C++', 'PHP', 'Assembly', 'Kotlin', 'R', 'Swift',
]

const SPECIALIZATIONS = ['Data Science', 'Web Science']

const COMPLETED_PROJECTS = [
  'E-commerce website', 'REST API development', 'Mobile app (Android / iOS)',
  'ML/AI model', 'Network monitoring tool', 'Database design',
  'Chatbot / NLP system', 'Data dashboard', 'Capstone / thesis system',
  'Open-source contribution', 'Penetration testing lab', 'IoT prototype',
]

const INTERNSHIP_ROLES = [
  'Web developer intern', 'IT support intern', 'Data analyst intern',
  'QA / testing intern', 'Cybersecurity intern', 'Cloud / infra intern',
  'Software dev intern', 'Network engineer intern', 'None yet',
]

const INTERNSHIP_DURATIONS = [
  '1 month', '2 months', '3 months', '4 months', '5 months', '6 months',
  '7-9 months', '10-12 months', 'More than 1 year',
]

const CAREER_INTERESTS = [
  'Software developer', 'Cybersecurity analyst', 'Cloud / DevOps engineer',
  'Data scientist', 'Network engineer', 'AI / ML engineer',
  'Full-stack web developer', 'Mobile app developer', 'Database administrator',
  'IT project manager', 'QA / test engineer', 'UI/UX designer',
  'Game developer', 'Freelance / entrepreneur',
]

const PERSONALITY_QUESTIONS = [
  { id: 'p1',  trait: 'Openness',           text: 'I enjoy exploring new ideas and technologies.',          reverse: false },
  { id: 'p2',  trait: 'Openness',           text: 'I have a vivid imagination and like creative solutions.',reverse: false },
  { id: 'p3',  trait: 'Conscientousness',   text: 'I pay close attention to detail in my work.',           reverse: false },
  { id: 'p4',  trait: 'Conscientousness',   text: 'I often leave tasks unfinished.',                       reverse: true  },
  { id: 'p5',  trait: 'Extraversion',       text: 'I feel energized working with groups of people.',       reverse: false },
  { id: 'p6',  trait: 'Extraversion',       text: 'I prefer working alone over working in teams.',         reverse: true  },
  { id: 'p7',  trait: 'Agreeableness',      text: 'I consider others feelings before making decisions.',   reverse: false },
  { id: 'p8',  trait: 'Agreeableness',      text: 'I find it easy to trust the people I work with.',      reverse: false },
  { id: 'p9',  trait: 'Emotional_Range',    text: 'I get stressed out easily under pressure.',             reverse: false },
  { id: 'p10', trait: 'Emotional_Range',    text: 'I stay calm in difficult or high-pressure situations.', reverse: true  },
  { id: 'p11', trait: 'Conversation',       text: 'I enjoy long in-depth discussions about topics I care about.', reverse: false },
  { id: 'p12', trait: 'Openness to Change', text: 'I adapt quickly when plans change unexpectedly.',       reverse: false },
  { id: 'p13', trait: 'Openness to Change', text: 'I prefer stability and predictable routines.',          reverse: true  },
  { id: 'p14', trait: 'Hedonism',           text: 'Enjoying life and experiences matters a lot to me.',    reverse: false },
  { id: 'p15', trait: 'Self-enhancement',   text: 'Achieving success and recognition motivates me.',       reverse: false },
  { id: 'p16', trait: 'Self-transcendence', text: 'Helping others and contributing to my community is important.', reverse: false },
]

const TRAIT_NAMES = [
  'Openness', 'Conscientousness', 'Extraversion', 'Agreeableness',
  'Emotional_Range', 'Conversation', 'Openness to Change',
  'Hedonism', 'Self-enhancement', 'Self-transcendence',
]

const LIKERT = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']

function buildApiPayload(form, personalityAnswers) {
  // Build skill features: model feature name -> score (5 or 6)
  const skillFeatures = {}
  for (const { skill, level } of form.technicalSkills) {
    const modelKey = SKILL_MAP[skill]
    if (!modelKey) continue
    const score = SKILL_LEVEL_SCORE[level] || 6
    // If multiple UI skills map to same model key, keep the highest score
    if (!skillFeatures[modelKey] || score > skillFeatures[modelKey]) {
      skillFeatures[modelKey] = score
    }
  }

  // Compute personality scores (average per trait, normalize 1-5 to 0-1)
  const personality = {}
  for (const trait of TRAIT_NAMES) {
    const questions = PERSONALITY_QUESTIONS.filter((q) => q.trait === trait)
    if (questions.length === 0) {
      personality[trait] = 0.5
      continue
    }
    const values = questions.map((q) => {
      const raw = personalityAnswers[q.id] || 3
      return q.reverse ? 6 - raw : raw
    })
    const avg = values.reduce((s, v) => s + v, 0) / values.length
    personality[trait] = Math.round(((avg - 1) / 4) * 100) / 100
  }

  console.log('[Assessment] Sending skillFeatures:', skillFeatures)
  console.log('[Assessment] Sending personality:', personality)

  return { skillFeatures, personality }
}

export default function Assessment() {
  const navigate = useNavigate()
  const { updateProfile } = useAuth()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    technicalSkills: [],
    languages: [],
    specialization: '',
    completedProjects: [],
    internshipRole: '',
    internshipDuration: '',
    certificatesObtained: '',
    careerInterests: [],
  })
  const [personalityAnswers, setPersonalityAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSkillToggle(skill) {
    setForm((f) => {
      const exists = f.technicalSkills.find((s) => s.skill === skill)
      if (exists) return { ...f, technicalSkills: f.technicalSkills.filter((s) => s.skill !== skill) }
      return { ...f, technicalSkills: [...f.technicalSkills, { skill, level: 'Intermediate' }] }
    })
  }

  function handleSkillLevel(skill, level) {
    setForm((f) => ({
      ...f,
      technicalSkills: f.technicalSkills.map((s) => s.skill === skill ? { ...s, level } : s),
    }))
  }

  async function handleSubmit() {
    setLoading(true)
    setApiError('')
    try {
      const payload = buildApiPayload(form, personalityAnswers)
      const response = await fetch(API_BASE_URL + '/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || 'Server error ' + response.status)
      }
      const result = await response.json()

      const formSummary = {
        skills: form.technicalSkills.map((s) => s.skill),
        careerInterests: form.careerInterests,
        specialization: form.specialization,
      }

      // Save latest result so Recommendations page retains it on navigation
      const assessmentData = { result, formSummary }
      localStorage.setItem('lastAssessment', JSON.stringify(assessmentData))

      // Save to history log
      const existing = JSON.parse(localStorage.getItem('assessmentHistory') || '[]')
      const historyEntry = {
        date: new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }),
        recommendedRole: result.recommended_role,
        confidence: result.top_3?.[0]?.confidence ?? 0,
        skills: formSummary.skills,
        careerInterests: formSummary.careerInterests,
        top3: result.top_3,
      }
      localStorage.setItem('assessmentHistory', JSON.stringify([historyEntry, ...existing].slice(0, 20)))

      // Persist the latest assessment intake onto the user's profile, so
      // Profile/Dashboard reflect the skills/interests just submitted instead
      // of only ever showing what was there at registration time.
      const priorCerts = form.certificatesObtained
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)

      const profileUpdates = {
        technicalSkills: form.technicalSkills,
        languages: form.languages,
        certificationsObtained: priorCerts,
      }
      if (form.specialization) profileUpdates.specialization = form.specialization
      if (formSummary.careerInterests.length) profileUpdates.careerGoal = formSummary.careerInterests.join(', ')

      updateProfile(profileUpdates)

      navigate('/recommendations', { state: { result, formSummary } })
    } catch (err) {
      setApiError(err.message || 'Could not reach the prediction server. Make sure the backend is running.')
      setLoading(false)
    }
  }

  const allPersonalityAnswered = PERSONALITY_QUESTIONS.every((q) => personalityAnswers[q.id] !== undefined)
  const isNoneYet = form.internshipRole === 'None yet'

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        <p className="text-xs font-semibold text-navy">Step {step} of 3</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
          {step === 1 ? 'Tell us about yourself' : step === 2 ? 'What are you working toward?' : 'Quick personality check'}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {step === 1
            ? 'The more detail you provide, the more accurate your certification recommendations will be.'
            : step === 2
            ? 'Share where you want to go, and we will map a certification path toward it.'
            : 'Rate how much you agree with each statement.'}
        </p>

        <div className="mt-3 flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <span key={s} className={'h-1 flex-1 rounded-full ' + (s <= step ? 'bg-navy' : 'bg-ink-soft/15')} />
          ))}
        </div>

        {step === 1 && (
          <div className="mt-7 space-y-6">
            <Card title="Skills & experience">
              <Field label="Technical skills" hint="Select all areas where you have hands-on experience, then rate your level.">
                <SkillSelector skills={TECHNICAL_SKILLS} selected={form.technicalSkills} onToggle={handleSkillToggle} onLevel={handleSkillLevel} />
              </Field>
              <Field label="Programming languages" hint="Languages you can build with comfortably.">
                <MultiSelect options={PROGRAMMING_LANGUAGES} selected={form.languages} onChange={(v) => update('languages', v)} placeholder="Select programming languages" />
              </Field>
              <Field label="Academic specialization">
                <div className="flex flex-wrap gap-2">
                  {SPECIALIZATIONS.map((spec) => (
                    <button key={spec} type="button"
                      onClick={() => update('specialization', form.specialization === spec ? '' : spec)}
                      className={'focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ' + (form.specialization === spec ? 'border-navy bg-navy text-cream' : 'border-ink-soft/20 bg-white text-ink hover:border-navy/40')}>
                      {spec}
                    </button>
                  ))}
                </div>
              </Field>
            </Card>

            <Card title="Background">
              <Field label="Completed projects" hint="Select all project types you have built or contributed to.">
                <MultiSelect options={COMPLETED_PROJECTS} selected={form.completedProjects} onChange={(v) => update('completedProjects', v)} placeholder="Select completed projects" />
              </Field>
              <Field label="Internship experience">
                <SingleSelect options={INTERNSHIP_ROLES} selected={form.internshipRole}
                  onChange={(v) => { update('internshipRole', v); if (v === 'None yet') update('internshipDuration', '') }}
                  placeholder="Select internship role" />
                {form.internshipRole && !isNoneYet && (
                  <div className="mt-3">
                    <p className="mb-1.5 text-xs font-medium text-ink-soft">Duration</p>
                    <SingleSelect options={INTERNSHIP_DURATIONS} selected={form.internshipDuration} onChange={(v) => update('internshipDuration', v)} placeholder="Select duration" />
                  </div>
                )}
              </Field>
              <Field label="Certificates already obtained" hint="List any certifications you already hold.">
                <textarea rows={3} value={form.certificatesObtained} onChange={(e) => update('certificatesObtained', e.target.value)}
                  placeholder="e.g. AWS Cloud Practitioner, Google Data Analytics..."
                  className="focus-ring w-full resize-y rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60" />
              </Field>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="mt-7 space-y-6">
            <Card title="Career interests">
              <Field label="Where do you want to go?" hint="Select all roles that interest you.">
                <div className="flex flex-wrap gap-2">
                  {CAREER_INTERESTS.map((role) => {
                    const isSelected = form.careerInterests.includes(role)
                    return (
                      <button key={role} type="button"
                        onClick={() => update('careerInterests', isSelected ? form.careerInterests.filter((r) => r !== role) : [...form.careerInterests, role])}
                        className={'focus-ring flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ' + (isSelected ? 'border-navy bg-navy text-cream' : 'border-ink-soft/20 bg-white text-ink hover:border-navy/40')}>
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

        {step === 3 && (
          <div className="mt-7 space-y-4">
            <Card title="Personality & work style">
              <p className="text-xs text-ink-soft -mt-2">Rate each statement 1 (Strongly Disagree) to 5 (Strongly Agree).</p>
              {PERSONALITY_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="border-b border-ink-soft/10 pb-4 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-navy mb-2">{idx + 1}. {q.text}</p>
                  <div className="flex gap-2">
                    {LIKERT.map((label, i) => {
                      const value = i + 1
                      const selected = personalityAnswers[q.id] === value
                      return (
                        <button key={value} type="button" title={label}
                          onClick={() => setPersonalityAnswers((a) => ({ ...a, [q.id]: value }))}
                          className={'flex-1 rounded-lg border py-2 text-xs font-medium transition ' + (selected ? 'bg-navy text-cream border-navy' : 'bg-white text-ink-soft border-ink-soft/20 hover:border-navy/40 hover:text-navy')}>
                          {value}
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-ink-soft">Strongly Disagree</span>
                    <span className="text-[10px] text-ink-soft">Strongly Agree</span>
                  </div>
                </div>
              ))}
            </Card>
            {apiError && (
              <div className="rounded-lg bg-coral-light border border-coral/20 px-4 py-3 text-sm text-coral">{apiError}</div>
            )}
          </div>
        )}

        <div className="mt-7 flex items-center justify-between">
          <button onClick={() => step === 1 ? navigate('/dashboard') : setStep(step - 1)}
            className="focus-ring rounded-lg px-4 py-2.5 text-sm font-medium text-ink-soft hover:text-navy">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)}
              className="focus-ring rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-cream hover:bg-navy/90">
              Continue
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading || !allPersonalityAnswered}
              className="focus-ring flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-navy hover:bg-gold/90 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? 'Analysing your profile...' : 'Get recommendations'}
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

function SkillSelector({ skills, selected, onToggle, onLevel }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    function onClickOutside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-left text-sm">
        <span className={selected.length ? 'text-ink' : 'text-ink-soft/60'}>
          {selected.length ? selected.length + ' skill' + (selected.length > 1 ? 's' : '') + ' selected' : 'Select technical skills'}
        </span>
        <ChevronDown className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-ink-soft/10 bg-white p-1.5 shadow-lg">
          {skills.map((skill) => {
            const isSelected = selected.find((s) => s.skill === skill)
            return (
              <button key={skill} type="button" onClick={() => onToggle(skill)}
                className="focus-ring flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-ink hover:bg-paper">
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
            <div key={skill} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ink-soft/10 bg-paper px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => onToggle(skill)} className="text-ink-soft hover:text-coral text-xs" aria-label={'Remove ' + skill}>x</button>
                <span className="text-sm font-medium text-navy">{skill}</span>
              </div>
              <div className="flex gap-1">
                {SKILL_LEVELS.map((lvl) => (
                  <button key={lvl} type="button" onClick={() => onLevel(skill, lvl)}
                    className={'focus-ring rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ' + (level === lvl ? 'bg-navy text-cream' : 'bg-white border border-ink-soft/20 text-ink-soft hover:border-navy/40 hover:text-navy')}>
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

function MultiSelect({ options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    function onClickOutside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])
  function toggle(option) {
    onChange(selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option])
  }
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-left text-sm">
        <span className={selected.length ? 'text-ink' : 'text-ink-soft/60'}>
          {selected.length ? selected.length + ' selected' : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl border border-ink-soft/10 bg-white p-1.5 shadow-lg">
          {options.map((option) => {
            const isSelected = selected.includes(option)
            return (
              <button key={option} type="button" onClick={() => toggle(option)}
                className="focus-ring flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-ink hover:bg-paper">
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
            <span key={s} className="flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-navy">
              {s}
              <button type="button" onClick={() => toggle(s)} className="text-ink-soft hover:text-coral" aria-label={'Remove ' + s}>x</button>
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
    function onClickOutside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-xl border border-ink-soft/15 bg-white px-3.5 py-2.5 text-left text-sm">
        <span className={selected ? 'text-ink' : 'text-ink-soft/60'}>{selected || placeholder}</span>
        <ChevronDown className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl border border-ink-soft/10 bg-white p-1.5 shadow-lg">
          {options.map((option) => (
            <button key={option} type="button" onClick={() => { onChange(option); setOpen(false) }}
              className="focus-ring flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-ink hover:bg-paper">
              {option}
              {selected === option && <Check className="h-4 w-4 text-navy" strokeWidth={2} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
