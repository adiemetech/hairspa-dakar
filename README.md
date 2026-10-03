# HairSpa Dakar — Site vitrine multipage bilingue (FR/EN)

Site vitrine **multipage** pour **HairSpa Dakar**, centre de soins capillaires toutes
textures à Sacré-Cœur 2, Dakar. Stack : **Next.js 15 (App Router) + next-intl,
Tailwind CSS v4, Framer Motion**. Ancien SPA Vite migré en multipage statique (SSG).

## Prérequis

- Node.js ≥ 20 (`node --version`)
- Un compte [Vercel](https://vercel.com) pour le déploiement

> **Windows / Git Bash** : si `node` ou `npm` ne sont pas trouvés, exportez le PATH :
> `export PATH="/c/Program Files/nodejs:$PATH"`

## Installation

```bash
npm install
npm run dev        # serveur de développement → http://localhost:3000
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de dev avec rechargement à chaud |
| `npm run build` | Build de production statique (SSG) dans `.next/` |
| `npm run start` | Sert le build de production en local |
| `npm run lint` | Analyse statique (oxlint) |

## Routes

Chaque langue a ses URLs : `/fr/…` et `/en/…` (next-intl, `localePrefix: 'always'`).

| Route | Contenu |
|---|---|
| `/` | Accueil (hero vidéo, services, réalisations, témoignages, bandeau CTA) |
| `/a-propos` | Histoire, équipe, valeurs + témoignages |
| `/services` | Prestations |
| `/realisations` | Galerie filtrable + lightbox + vidéos |
| `/tarifs` | Grille tarifaire en onglets |
| `/conseils` et `/conseils/<slug>` | Blog (3 articles) |
| `/contact` | Formulaire (Formspree / repli WhatsApp) + carte + infos |
| `/rendez-vous` | Prise de rendez-vous (widget si `BOOKING_URL`, sinon WhatsApp) |
| `/mentions-legales`, `/politique-confidentialite` | Pages légales (`noindex`) |

Toutes les pages sont pré-rendues en statique via `generateStaticParams`.

## Structure

```
messages/               # fr.json + en.json (tout le contenu, tarifs inclus)
src/
├── app/
│   ├── [locale]/       # layout (polices, SEO, JSON-LD) + une page par route
│   │   └── …/page.js   # generateMetadata + generateStaticParams par page
│   ├── icon.png        # favicon (convention de fichiers Next)
│   ├── apple-icon.png  # icône Apple
│   ├── sitemap.js      # sitemap XML bilingue (hreflang)
│   └── robots.js       # robots.txt
├── components/         # Header, Hero, Services, Gallery, Pricing, Contact,
│                       # ContactForm, BookingPanel, Footer, Preloader, etc.
├── i18n/               # routing + navigation next-intl (Link, usePathname…)
├── constants.js        # WhatsApp, BOOKING_URL, FORMSPREE_ENDPOINT, nav, slugs
└── app/globals.css     # design system Tailwind v4 (@theme : palette, polices)
public/images/          # voir public/images/README.md pour remplacer les médias
```

## Fonctionnalités clés

- **Bilingue FR/EN** : URLs `/fr/` `/en/`, sélecteur dans le header, `canonical` et
  alternates `hreflang` (fr/en/x-default) par page, `<html lang>` synchronisé.
- **SEO par page** : title/description/OG dédiés, JSON-LD `LocalBusiness`+`BeautySalon`
  (global), `ContactPage`, `BeautySalon` (rendez-vous) et `BlogPosting` (articles).
- **Bandeau d'alerte anti-imitation** et badge **« Ouvert 7j/7 »** (exigences client).
- **Formulaire de contact** : validation en temps réel, RGPD, états envoi/succès/erreur.
  Envoi **Formspree** si `FORMSPREE_ENDPOINT` est renseigné, sinon **repli WhatsApp**
  (message pré-rempli) — fonctionnel sans backend.
- **CTA rendez-vous** : `BOOKING_URL` dans `src/constants.js` (null pour l'instant) —
  renseigner l'URL du widget (Planity / Treatwell / Calendly / Addagio) pour remplacer
  automatiquement le CTA WhatsApp pré-rempli.
- **Animations** (Framer Motion, `reducedMotion: 'user'`) : transitions de page,
  header shrink-on-scroll, hero Ken Burns + titre mot à mot, apparitions au scroll
  (stagger), galerie lightbox + parallaxe, footer en cascade, micro-interactions.
- **Preloader** : première visite de session uniquement (sessionStorage), skippable
  (clic / Échap), désactivé si `prefers-reduced-motion`, jamais sur navigation interne.
- **Galerie filtrable** (tresses, chignons, soins) + lightbox clavier (Échap / flèches).
- **Grille tarifaire** en onglets accessibles (clavier : flèches gauche/droite).
- **Hero vidéo** muette en boucle (poster + fallback image si `prefers-reduced-motion`).
- **404 localisé** animé : statut HTTP 404 réel (pas de soft-404).
- **Finitions** : favicon dédié, sitemap XML, robots.txt, bouton retour-en-haut animé,
  bouton WhatsApp flottant sur toutes les pages.

## Images & vidéos

Médias réels du salon intégrés (photos compressées, vidéos muettes transcodées) :
Hero, À Propos, cartes Services, Galerie (8 photos) et Réalisations (3 vidéos).
Pour remplacer un média, écraser le fichier du même nom — **aucune modification de
code nécessaire**. Détail : `public/images/README.md`.
Le logo officiel (`logo-hairspa.png`, fond blanc) est intégré via `mix-blend-multiply`
dans le header ; **ne jamais l'écraser** (le favicon est un fichier séparé).

## Déploiement Vercel

Le dépôt GitHub est relié à Vercel : **chaque push sur `main` déploie automatiquement**
en production. `vercel.json` force le preset `nextjs` (le projet avait été créé avec le
preset Vite — sans ce fichier le build Vercel échoue en cherchant `dist/`).

```bash
git push origin main   # déclenche le déploiement
```

> Le CLI `vercel --prod` renvoie « Not authorized » sur ce compte : ne pas l'utiliser,
> le push suffit.

## À recevoir du client (non bloquant)

- Portrait de Marpessa (le lot reçu ne contenait pas de portrait dédié ; une frame
  vidéo du soin en cours est utilisée en attendant) → écraser `equipe/equipe-marpessa.jpg`
- Lien de réservation (Planity / Treatwell / Calendly / Addagio) → `BOOKING_URL`
- Identifiant de formulaire Formspree → `FORMSPREE_ENDPOINT` (active l'envoi email)
- Textes définitifs des mentions légales et de la politique de confidentialité
