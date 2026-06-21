import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import Brandmark from './Brandmark'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/assessment', label: 'Assessment' },
  { to: '/recommendations', label: 'Recommendations' },
  { to: '/history', label: 'History' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink-soft/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <NavLink to="/dashboard">
          <Brandmark size="sm" />
        </NavLink>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
             className={({ isActive }) =>
             `relative text-sm font-medium transition-colors ${
             isActive
             ? 'text-navy after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-gold'
             : 'text-ink-soft hover:text-navy'
            }`
            }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2.5 rounded-full bg-paper py-1 pl-1 pr-3.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-semibold text-cream">
              {user?.name?.[0] ?? 'S'}
            </span>
            <span className="text-sm font-medium text-navy">{user?.name?.split(' ')[0] ?? 'Student'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="focus-ring flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-coral-light hover:text-coral"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
            Log out
          </button>
        </div>

        <button
          className="focus-ring rounded-lg p-2 text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-soft/10 bg-cream px-5 py-4 md:hidden">
          <div className="mb-3 flex items-center gap-2.5 rounded-lg bg-paper px-3 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-semibold text-cream">
              <User className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-navy">{user?.name ?? 'Student'}</p>
              <p className="text-xs text-ink-soft">{user?.email}</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper hover:text-navy"
              >
                {l.label}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="focus-ring mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-coral hover:bg-coral-light"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
              Log out
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}