import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Link / router / pathname conscients de la locale (préfixe /fr /en géré)
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
