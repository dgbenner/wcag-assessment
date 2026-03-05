export function getLevelColor(level) {
  switch (level) {
    case 'A': return 'bg-red-100 text-red-800'
    case 'AA': return 'bg-yellow-100 text-yellow-800'
    case 'AAA': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export function getResponsibilityColor(role) {
  switch (role) {
    case 'design': return 'bg-purple-100 text-purple-800'
    case 'development': return 'bg-blue-100 text-blue-800'
    case 'project_requirements': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export function formatResponsibility(role) {
  switch (role) {
    case 'design': return 'Design'
    case 'development': return 'Development'
    case 'project_requirements': return 'Product'
    default: return role
  }
}
