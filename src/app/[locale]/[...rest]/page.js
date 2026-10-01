import { notFound } from 'next/navigation'

// Route fourre-tout : toute URL non reconnue sous /[locale] déclenche le
// not-found localisé (rendu dans le layout avec NextIntlClientProvider).
export default function CatchAllPage() {
  notFound()
}
