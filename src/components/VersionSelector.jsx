export default function VersionSelector({ version, onChange }) {
  const versions = ['2.1', '2.2']

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1" role="radiogroup"
         aria-label="WCAG Version">
      {versions.map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          role="radio"
          aria-checked={version === v}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${version === v
              ? 'bg-white text-blue-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          WCAG {v}
        </button>
      ))}
    </div>
  )
}
