import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const DEMO_USER = {
  name: ' ',
  email: ' ',
  school: ' ',
  course: ' ',
  yearLevel: ' ',
  bio: ' ',
  interests: ['  ', '  ', '  '],
  progress: {
    completed: 2,
    inProgress: 1,
    saved: 4,
    goal: 6,
  },
  history: [
    { id: 'cert-002', viewedOn: 'June 18, 2026', status: 'In Progress' },
    { id: 'cert-001', viewedOn: 'June 15, 2026', status: 'Completed' },
    { id: 'cert-003', viewedOn: 'June 10, 2026', status: 'Completed' },
    { id: 'cert-004', viewedOn: 'June 6, 2026', status: 'Saved' },
  ],
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = () => setUser(DEMO_USER)
  const register = (formData) =>
    setUser({ ...DEMO_USER, name: formData.name || DEMO_USER.name, email: formData.email || DEMO_USER.email })
  const logout = () => setUser(null)
  const updateProfile = (updates) => setUser((prev) => ({ ...prev, ...updates }))

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}