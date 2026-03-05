import { useState, useRef } from 'react'

const TABS = [
  { id: 'url', label: 'URL' },
  { id: 'code', label: 'Code / HTML' },
  { id: 'screenshot', label: 'Screenshot' },
]

export default function InputForm({ onSubmit, loading }) {
  const [activeTab, setActiveTab] = useState('url')
  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [screenshotName, setScreenshotName] = useState('')
  const fileInputRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('File must be under 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setScreenshot(reader.result)
      setScreenshotName(file.name)
    }
    reader.readAsDataURL(file)
  }

  function getContent() {
    if (activeTab === 'url') return url
    if (activeTab === 'code') return code
    return screenshot
  }

  function handleSubmit(e) {
    e.preventDefault()
    const content = getContent()
    if (!content) return
    onSubmit({ inputType: activeTab, content })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex border-b border-gray-200" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {activeTab === 'url' && (
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="URL to evaluate"
          />
        )}

        {activeTab === 'code' && (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste HTML or code here..."
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                       font-mono text-sm focus:outline-none focus:ring-2
                       focus:ring-blue-500 resize-y"
            aria-label="Code to evaluate"
          />
        )}

        {activeTab === 'screenshot' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {screenshot ? (
              <div className="space-y-2">
                <img src={screenshot} alt="Uploaded screenshot preview"
                     className="max-h-48 mx-auto rounded" />
                <p className="text-sm text-gray-500">{screenshotName}</p>
                <button
                  type="button"
                  onClick={() => { setScreenshot(null); setScreenshotName('') }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 mb-2">Upload a screenshot to evaluate</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md
                             hover:bg-gray-200 text-sm"
                >
                  Choose File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload screenshot"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !getContent()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md
                     hover:bg-blue-700 disabled:opacity-50
                     disabled:cursor-not-allowed transition-colors
                     flex items-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Evaluating...' : 'Evaluate'}
        </button>

        <div className="relative group">
          <button
            type="button"
            disabled
            className="px-6 py-2 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed"
          >
            Automated Crawling
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                           px-2 py-1 bg-gray-800 text-white text-xs rounded
                           opacity-0 group-hover:opacity-100 transition-opacity
                           whitespace-nowrap pointer-events-none">
            Coming Soon
          </span>
        </div>
      </div>
    </form>
  )
}
