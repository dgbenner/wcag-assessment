import { useState } from 'react'
import PasswordPrompt from './components/PasswordPrompt'
import Header from './components/Header'
import VersionSelector from './components/VersionSelector'
import InputForm from './components/InputForm'
import ResultsDisplay from './components/ResultsDisplay'
import { evaluate } from './utils/anthropicClient'

export default function App() {
  const [password, setPassword] = useState(
    () => sessionStorage.getItem('wcag_password') || ''
  )
  const [authenticated, setAuthenticated] = useState(!!password)
  const [wcagVersion, setWcagVersion] = useState('2.2')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleAuthenticated(pw) {
    setPassword(pw)
    setAuthenticated(true)
  }

  async function handleEvaluate({ inputType, content }) {
    setLoading(true)
    setError('')
    setResults(null)

    try {
      const data = await evaluate({
        password,
        wcagVersion,
        inputType,
        content,
      })
      setResults(data.evaluation)
    } catch (err) {
      setError(err.message)
      if (err.message.includes('Invalid password')) {
        sessionStorage.removeItem('wcag_password')
        setAuthenticated(false)
        setPassword('')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return <PasswordPrompt onAuthenticated={handleAuthenticated} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header wcagVersion={wcagVersion} />

      <main className="max-w-4xl mx-auto px-6 py-5 space-y-5">
        <div className="flex justify-center">
          <VersionSelector version={wcagVersion} onChange={setWcagVersion} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <InputForm onSubmit={handleEvaluate} loading={loading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <ResultsDisplay results={results} />
        </div>
      </main>
    </div>
  )
}
