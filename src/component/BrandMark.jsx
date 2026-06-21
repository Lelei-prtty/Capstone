import { Award } from 'lucide-react'

export default function Brandmark({ size = 'md', light = false }) {
  const sizes = {
    sm: 'h-8 w-8 text-base',
    md: 'h-11 w-11 text-lg',
    lg: 'h-16 w-16 text-2xl',
  }
  return (
    <div className="flex items-center gap-3">
      <div
        className={`seal ${sizes[size]} rounded-full flex items-center justify-center font-display font-semibold ${
          light ? 'bg-cream text-navy' : 'bg-navy text-gold-light'
        }`}
      >
        <Award className="h-1/2 w-1/2" strokeWidth={1.75} />
      </div>
      <span
        className={`font-display font-semibold tracking-tight ${
          size === 'lg' ? 'text-2xl' : 'text-lg'
        } ${light ? 'text-cream' : 'text-navy'}`}
      >
        Sertipika
      </span>
    </div>
  )
}