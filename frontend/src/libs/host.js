function domainAnalyzer () {
  const hostname = window.location.hostname
  const parts = hostname.split('.')

  if (parts.length === 1) {
    // No hay subdomain
    return { domain: parts[0], subdomain: '' }
  } else if (parts.length === 2) {
    // Solo hay domain
    return { domain: parts[0], subdomain: '' }
  } else {
    // Hay subdomain y domain
    const subdomain = parts[0]
    parts.shift() // Eliminar el subdomain del array
    const domain = parts.join('.')
    return { domain, subdomain }
  }
}

export const domain = domainAnalyzer().domain
export const subdomain = domainAnalyzer().subdomain
