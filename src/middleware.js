import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Toutes les routes sauf les fichiers statiques (dot), _next, _vercel et les API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
