import NotFoundView from '@/components/NotFoundView'

// Rendu pour toute route inconnue sous /[locale] (dans le layout localisé,
// donc avec accès aux traductions).
export default function NotFound() {
  return <NotFoundView />
}
