export default function Header({ wcagVersion }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
          WCAG Accessibility Evaluator
        </h1>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full
                         text-xs font-medium bg-blue-100 text-blue-800">
          WCAG {wcagVersion}
        </span>
      </div>
    </header>
  )
}
