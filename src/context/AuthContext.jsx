import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/Supabaseclient'

const AuthContext = createContext(null)

// Pulls everything needed to render Dashboard/Profile from Supabase:
// the profiles row, plus skills/languages/prior-certs from their own tables,
// plus live-counted progress instead of a stored percentage.
async function loadFullProfile(userId) {
  const [
    { data: profile, error: profileError },
    { data: skills },
    { data: languages },
    { data: priorCerts },
    { count: completedCount },
    { count: inProgressCount },
    { count: savedCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase.from('user_skills').select('skill_name').eq('user_id', userId),
    supabase.from('user_languages').select('language').eq('user_id', userId),
    supabase.from('user_prior_certifications').select('certification_name').eq('user_id', userId),
    supabase
      .from('certification_progress')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'completed'),
    supabase
      .from('certification_progress')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'in_progress'),
    supabase.from('saved_certifications').select('id', { count: 'exact', head: true }).eq('user_id', userId),
  ])

  if (profileError) throw profileError

  return {
    id: profile.id,
    name: profile.full_name,
    email: profile.email,
    school: profile.school ?? '',
    course: profile.course ?? '',
    yearLevel: profile.year_level ?? '',
    bio: profile.bio ?? '',
    avatar: profile.avatar_url ?? null,
    specialization: profile.specialization ?? '',
    careerGoal: profile.career_goal ?? null,
    technicalSkills: (skills ?? []).map((s) => s.skill_name),
    languages: (languages ?? []).map((l) => l.language),
    certificationsObtained: (priorCerts ?? []).map((c) => c.certification_name),
    progress: {
      completed: completedCount ?? 0,
      inProgress: inProgressCount ?? 0,
      saved: savedCount ?? 0,
      goal: profile.certification_goal ?? 6,
    },
  }
}

// Pulls every saved assessment for this user from Supabase and repopulates
// the same localStorage keys Assessment/Recommendation/History already read
// from, so those pages keep working unchanged after a fresh login — instead
// of only ever having data right after you submit the assessment in the
// same browser session.
async function hydrateAssessmentCache(userId) {
  const { data: rows, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error || !rows || !rows.length) return

  const toSkillNames = (technicalSkills) =>
    (technicalSkills ?? []).map((s) => (typeof s === 'string' ? s : s.skill)).filter(Boolean)

  const latest = rows[0]
  const lastAssessment = {
    result: { recommended_role: latest.recommended_role, top_3: latest.top_3 },
    formSummary: {
      skills: toSkillNames(latest.technical_skills),
      careerInterests: latest.career_interests ?? [],
      specialization: latest.specialization ?? '',
    },
  }
  localStorage.setItem('lastAssessment', JSON.stringify(lastAssessment))

  const history = rows.slice(0, 20).map((row) => ({
    date: new Date(row.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }),
    recommendedRole: row.recommended_role,
    confidence: row.top_3?.[0]?.confidence ?? 0,
    skills: toSkillNames(row.technical_skills),
    careerInterests: row.career_interests ?? [],
    top3: row.top_3,
  }))
  localStorage.setItem('assessmentHistory', JSON.stringify(history))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // Starts true so ProtectedRoute doesn't redirect to /login before we've
  // even had a chance to check for an existing session (e.g. on page refresh).
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await loadFullProfile(session.user.id).catch(() => null)
        if (active) setUser(profile)
        await hydrateAssessmentCache(session.user.id).catch(() => {})
      }
      if (active) setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await loadFullProfile(session.user.id).catch(() => null)
        if (active) setUser(profile)
        await hydrateAssessmentCache(session.user.id).catch(() => {})
      } else if (active) {
        setUser(null)
      }
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const profile = await loadFullProfile(data.user.id)
    setUser(profile)
    await hydrateAssessmentCache(data.user.id).catch(() => {})
    return profile
  }

  // The DB trigger (handle_new_user) auto-creates the profiles row the
  // instant signUp succeeds — we just fill in the extra fields afterward.
  async function register(formData) {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.name } },
    })
    if (error) throw error

    // If your Supabase project has "Confirm email" turned on, there's no
    // session yet — the user has to click the emailed link first.
    if (!data.session) {
      return { needsEmailConfirmation: true }
    }

    if (formData.school) {
      await supabase.from('profiles').update({ school: formData.school }).eq('id', data.user.id)
    }

    const profile = await loadFullProfile(data.user.id)
    setUser(profile)
    return profile
  }

  async function logout() {
    await supabase.auth.signOut()
    localStorage.removeItem('lastAssessment')
    localStorage.removeItem('assessmentHistory')
    setUser(null)
  }

  // Accepts the same flat shape the app already uses (name, email, school,
  // course, yearLevel, bio, avatar, specialization, careerGoal,
  // technicalSkills, languages, certificationsObtained) and routes each
  // field to the right table.
  async function updateProfile(updates) {
    if (!user) return

    const profileFields = {}
    if ('name' in updates) profileFields.full_name = updates.name
    if ('email' in updates) profileFields.email = updates.email
    if ('school' in updates) profileFields.school = updates.school
    if ('course' in updates) profileFields.course = updates.course
    if ('yearLevel' in updates) profileFields.year_level = updates.yearLevel
    if ('bio' in updates) profileFields.bio = updates.bio
    if ('avatar' in updates) profileFields.avatar_url = updates.avatar
    if ('specialization' in updates) profileFields.specialization = updates.specialization
    if ('careerGoal' in updates) profileFields.career_goal = updates.careerGoal

    if (Object.keys(profileFields).length) {
      const { error } = await supabase.from('profiles').update(profileFields).eq('id', user.id)
      if (error) throw error
    }

    if ('technicalSkills' in updates) {
      await supabase.from('user_skills').delete().eq('user_id', user.id)
      const rows = updates.technicalSkills
        .map((s) => (typeof s === 'string' ? { skill: s, level: 'Beginner' } : s))
        .filter((s) => s.skill)
        .map((s) => ({ user_id: user.id, skill_name: s.skill, level: s.level || 'Beginner' }))
      if (rows.length) {
        const { error } = await supabase.from('user_skills').insert(rows)
        if (error) throw error
      }
    }

    if ('languages' in updates) {
      await supabase.from('user_languages').delete().eq('user_id', user.id)
      const rows = updates.languages.filter(Boolean).map((language) => ({ user_id: user.id, language }))
      if (rows.length) {
        const { error } = await supabase.from('user_languages').insert(rows)
        if (error) throw error
      }
    }

    if ('certificationsObtained' in updates) {
      await supabase.from('user_prior_certifications').delete().eq('user_id', user.id)
      const rows = updates.certificationsObtained
        .filter(Boolean)
        .map((certification_name) => ({ user_id: user.id, certification_name }))
      if (rows.length) {
        const { error } = await supabase.from('user_prior_certifications').insert(rows)
        if (error) throw error
      }
    }

    const refreshed = await loadFullProfile(user.id)
    setUser(refreshed)
  }

  // Writes one finished assessment to Supabase (table: assessments) so it
  // survives logout/login instead of only living in localStorage. Call this
  // right after the model returns a result.
  async function saveAssessment({ form, personalityAnswers, result }) {
    if (!user) return
    const { error } = await supabase.from('assessments').insert({
      user_id: user.id,
      technical_skills: form.technicalSkills,
      languages: form.languages,
      specialization: form.specialization,
      completed_projects: form.completedProjects,
      internship_role: form.internshipRole,
      internship_duration: form.internshipDuration,
      certificates_obtained_note: form.certificatesObtained,
      career_interests: form.careerInterests,
      personality_answers: personalityAnswers,
      recommended_role: result.recommended_role,
      top_3: result.top_3,
    })
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, saveAssessment }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
