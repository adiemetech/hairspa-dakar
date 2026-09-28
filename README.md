# HairSpa Dakar — Site vitrine bilingue (FR/EN)

Site vitrine single-page pour **HairSpa Dakar**, centre de soins capillaires toutes
textures à Sacré-Cœur 2, Dakar. Stack : **Vite + React 19, Tailwind CSS v4,
Framer Motion, i18next**.

## Prérequis

- Node.js ≥ 20 (`node --version`)
- Un compte [Vercel](https://vercel.com) pour le déploiement

> **Windows / Git Bash** : si `node` ou `npm` ne sont pas trouvés, exportez le PATH :
> `export PATH="/c/Program Files/nodejs:$PATH"`

## Installation

```bash
npm install
npm run dev        # serveur de développement → http://localhost:5173
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de dev avec rechargement à chaud |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert le build de production en local |
| `npm run lint` | Analyse statique (oxlint) |

## Structure

```
src/
├── components/     # Header, Hero, About, Services, Pricing, Testimonials,
│                   # Contact, Footer, AlertBanner, BookingButton,
│                   # LanguageSwitcher, WhatsAppButton, LegalPage, Reveal
├── hooks/useSEO.js # title / description / Open Graph selon la langue active
├── locales/        # fr.json + en.json (tout le contenu du site, tarifs inclus)
├── i18n.js         # i18next : détection, localStorage ("hairspa-lang"), <html lang>
├── constants.js    # numéro WhatsApp, lien wa.me, réseaux sociaux, sections de nav
└── index.css       # design system Tailwind v4 (@theme : palette du logo, polices)
public/images/      # voir public/images/README.md pour le remplacement des images
```

## Fonctionnalités clés

- **Bilingue FR/EN** : sélecteur dans le header, changement instantané sans rechargement,
  langue persistée en `localStorage`, métadonnées SEO et attribut `lang` synchronisés.
- **Bandeau d'alerte anti-imitation** et badge **« Ouvert 7j/7 »** (exigences client).
- **Grille tarifaire** en onglets accessibles (clavier : flèches gauche/droite).
- **CTA rendez-vous** : WhatsApp avec message pré-rempli traduit. Si un lien de
  réservation externe (Addagio) est fourni, remplacer `waLink(...)` dans
  `src/components/BookingButton.jsx` par cette URL.
- **Pages légales** routées par hash : `#mentions-legales`, `#politique-confidentialite`
  (contenu rédactionnel à fournir par le client).

## Images & vidéos

Médias réels du salon intégrés (photos compressées, vidéos muettes transcodées) :
Hero, À Propos, cartes Services, Galerie (8 photos) et section Réalisations
(3 vidéos). Pour remplacer un média, écraser le fichier du même nom —
**aucune modification de code nécessaire**. Détail : `public/images/README.md`.
Le logo officiel (`logo-hairspa.png`, fond blanc) est intégré via `mix-blend-multiply`
dans le header ; optimisé sans perte (254 Ko).

## Déploiement Vercel

1. Pousser le projet sur un dépôt Git, puis **Import Project** sur vercel.com
   (Vercel détecte Vite automatiquement : build `npm run build`, output `dist`),
   ou en CLI depuis la racine du projet :
   ```bash
   npm i -g vercel
   vercel            # préproduction (preview)
   vercel --prod     # mise en ligne
   ```
2. Après le premier déploiement, renseigner le domaine définitif dans
   `og:url`/`og:image` si une URL absolue fixe est souhaitée (`src/hooks/useSEO.js`
   génère déjà l'URL absolue à partir de `location.origin`).

## À recevoir du client (non bloquant)

- Portrait de Marpessa (le lot reçu ne contenait pas de portrait dédié ; une frame
  vidéo du soin en cours est utilisée en attendant) → écraser `equipe/equipe-marpessa.jpg`
- Lien de réservation Addagio → remplacer le CTA WhatsApp
- Textes définitifs des mentions légales et de la politique de confidentialité
