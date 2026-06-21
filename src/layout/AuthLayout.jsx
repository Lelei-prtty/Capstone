// src/layouts/AuthLayout.jsx

import { GraduationCap } from 'lucide-react'

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-navy px-12 py-16 text-cream">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-3">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold">
              Certification Recommendation System
            </h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Discover the right certifications for your career path.
          </h2>

          <p className="mt-6 text-base text-cream/80">
            Get personalized certification recommendations based on your
            technical skills, academic specialization, projects, and career
            interests.
          </p>

          <div className="mt-10 space-y-4 text-sm text-cream/80">
            <div>✓ Personalized certification recommendations</div>
            <div>✓ Skill gap analysis</div>
            <div>✓ Career-focused learning pathways</div>
            <div>✓ Industry-relevant certification matching</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            
            {/* Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="rounded-lg bg-navy p-2 text-cream">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-semibold text-navy">
                Certification Recommendation System
              </span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-2 text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Content */}
            {children}

            {/* Footer */}
            {footer && (
              <div className="mt-6 text-center text-sm text-gray-600">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}