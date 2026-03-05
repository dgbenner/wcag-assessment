import { useState } from 'react'
import { verifyPassword } from '../utils/anthropicClient'

export default function PasswordPrompt({ onAuthenticated }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const valid = await verifyPassword(password)
      if (valid) {
        sessionStorage.setItem('wcag_password', password)
        onAuthenticated(password)
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Connection error. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          WCAG Accessibility Evaluator
        </h1>
        <p className="text-sm text-gray-500 mb-6">Enter password to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-transparent mb-4"
            autoFocus
            aria-label="Password"
          />
          {error && (
            <p className="text-red-600 text-sm mb-4" role="alert">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md
                       hover:bg-blue-700 disabled:opacity-50
                       disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Checking...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
