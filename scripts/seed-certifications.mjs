// scripts/seed-certifications.mjs
//
// One-off script to load Data/Dummycertification.js into the Supabase
// `certifications` table. Uses the service_role key (bypasses RLS) since the
// anon key can only read the catalog, not write to it.
//
// Run from your project root:
//   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key node scripts/seed-certifications.mjs
//
// Get the service_role key from: Supabase dashboard -> Project Settings -> API
// -> "service_role" (secret). NEVER put this key in .env or commit it anywhere
// — only pass it inline on the command line, or in a separate .env.seed file
// that is also gitignored and never used by the frontend.

import { createClient } from '@supabase/supabase-js'
import { certifications } from '../src/Data/Dummycertification.js'

const SUPABASE_URL = 'https://hsjznxpyljefnidfxhbd.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  console.error(
    'Missing SUPABASE_SERVICE_ROLE_KEY.\n' +
    'Run this as: SUPABASE_SERVICE_ROLE_KEY=your_service_role_key node scripts/seed-certifications.mjs'
  )
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, serviceRoleKey)

const rows = certifications.map((cert) => ({
  id: cert.id,
  title: cert.title,
  summary: cert.summary,
  field: cert.field,
  level: cert.level,
  provider: cert.provider,
  location: cert.location,
  delivery_mode: cert.deliveryMode,
  duration: cert.duration,
  cost: cert.cost,
  price: cert.price,
  url: cert.url,
  match_score: cert.matchScore,
  roles: cert.roles,
  skills: cert.skills,
  requirements: cert.requirements,
  exam_format: cert.examInfo?.format ?? null,
  exam_questions: cert.examInfo?.questions != null ? String(cert.examInfo.questions) : null,
  exam_time_limit: cert.examInfo?.timeLimit ?? null,
  exam_passing_score: cert.examInfo?.passingScore ?? null,
  exam_retake_policy: cert.examInfo?.retakePolicy ?? null,
}))

const { error } = await supabase.from('certifications').upsert(rows, { onConflict: 'id' })

if (error) {
  console.error('Seed failed:', error)
  process.exit(1)
}

console.log(`Seeded ${rows.length} certifications into Supabase.`)
