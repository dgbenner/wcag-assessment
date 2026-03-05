import { useState } from 'react'
import { getLevelColor, getResponsibilityColor, formatResponsibility, getPrinciple } from '../utils/wcagHelpers'

function IssueCard({ issue, index }) {
  const [expanded, setExpanded] = useState(true)
  const principle = getPrinciple(issue.criterion?.id)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-3 py-2 flex items-center justify-between
                   bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-gray-400 shrink-0">#{index + 1}</span>
          <span className="font-medium text-gray-900 truncate text-sm">{issue.issue}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs
                            font-medium shrink-0 ${getLevelColor(issue.criterion?.level)}`}>
            {issue.criterion?.level}
          </span>
        </div>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform shrink-0 ml-2
                      ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-3 py-2.5 space-y-2">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Criterion</p>
            <p className="text-sm text-gray-900">
              {issue.criterion?.id} {issue.criterion?.name}
              <span className={`ml-2 inline-flex items-center px-2 py-0.5
                                rounded text-xs font-medium
                                ${getLevelColor(issue.criterion?.level)}`}>
                Level {issue.criterion?.level}
              </span>
              {principle && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5
                                 rounded text-xs font-medium bg-gray-100 text-gray-600">
                  {principle}
                </span>
              )}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Impact</p>
            <p className="text-sm text-gray-700">{issue.impact}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Testing Procedure</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{issue.testing}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Remediation</p>
            <p className="text-sm text-gray-700">{issue.remediation}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Responsible</p>
            <div className="flex gap-1.5 flex-wrap">
              {(issue.responsible || []).map((role) => (
                <span
                  key={role}
                  className={`inline-flex items-center px-2 py-0.5 rounded
                              text-xs font-medium ${getResponsibilityColor(role)}`}
                >
                  {formatResponsibility(role)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ResultsDisplay({ results }) {
  const [copied, setCopied] = useState(false)

  if (!results) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-lg">No evaluation results yet</p>
        <p className="text-sm mt-1">
          Enter a URL, paste code, or upload a screenshot to get started
        </p>
      </div>
    )
  }

  function handleCopy() {
    const text = JSON.stringify(results, null, 2)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const levelCounts = (results.issues || []).reduce((acc, issue) => {
    const level = issue.criterion?.level
    if (level) acc[level] = (acc[level] || 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {results.issues?.length || 0} issue{results.issues?.length !== 1 ? 's' : ''} found
        </p>
        <button
          onClick={handleCopy}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>

      {results.issues?.length > 0 && (
        <div className="flex gap-2">
          {['A', 'AA', 'AAA'].map((level) =>
            levelCounts[level] ? (
              <div
                key={level}
                className={`flex-1 rounded-lg px-3 py-2 ${getLevelColor(level)}`}
              >
                <p className="text-xl font-bold">{levelCounts[level]}</p>
                <p className="text-xs font-medium">Level {level}</p>
              </div>
            ) : null
          )}
        </div>
      )}

      {results.summary && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5">
          <p className="text-sm text-blue-800">{results.summary}</p>
        </div>
      )}

      {results.parseError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2.5">
          <p className="text-sm text-yellow-800">
            The response could not be parsed as structured data.
            The raw response is shown in the summary above.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {(results.issues || []).map((issue, i) => (
          <IssueCard key={i} issue={issue} index={i} />
        ))}
      </div>
    </div>
  )
}
