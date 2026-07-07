import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Sun, Moon } from 'lucide-react'
import Brandmark from './Brandmark'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard',       label: 'Dashboard' },
  { to: '/assessment',      label: 'Assessment' },
  { to: '/recommendations', label: 'Recommendations' },
  { to: '/history',         label: 'History' },
  { to: '/profile',         label: 'Profile' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink-soft/10 bg-cream/90 backdrop-blur transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">

        <NavLink to="/dashboard">
          <Brandmark size="sm" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                'relative text-sm font-medium transition-colors ' + (
                  isActive
                    ? 'text-navy after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-gold'
                    : 'text-ink-soft hover:text-navy'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Toggle switch */}
          <div className="flex items-center gap-2">
            <Sun className="h-3.5 w-3.5 text-ink-soft" strokeWidth={1.75} />
            <button
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle dark mode"
              className={'toggle-track ' + (dark ? 'active' : '')}
            >
              <span className="toggle-thumb">
              </span>
            </button>
          
          </div>

          
          

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="focus-ring flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-coral-light hover:text-coral"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
            Log out
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="focus-ring rounded-lg p-2 text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink-soft/10 bg-cream px-5 py-4 md:hidden">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 rounded-lg bg-paper px-3 py-2.5 flex-1 mr-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-semibold text-cream">
                {user?.name?.[0] ?? 'S'}
              </span>
              <div>
                <p className="text-sm font-medium text-navy">{user?.name ?? 'Student'}</p>
                <p className="text-xs text-ink-soft">{user?.email}</p>
              </div>
            </div>
            {/* Toggle in mobile */}
            <div className="flex items-center gap-1.5">
              <Sun className="h-3.5 w-3.5 text-ink-soft" strokeWidth={1.75} />
              <button
                onClick={() => setDark((v) => !v)}
                aria-label="Toggle dark mode"
                className={'toggle-track ' + (dark ? 'active' : '')}
              >
                <span className="toggle-thumb" />
              </button>
              <Moon className="h-3.5 w-3.5 text-ink-soft" strokeWidth={1.75} />
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
