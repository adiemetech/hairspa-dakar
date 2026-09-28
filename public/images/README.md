# Images & vidéos HairSpa Dakar

Médias réels du salon intégrés (photos Instagram compressées via `mozjpeg`,
vidéos transcodées sans piste audio via ffmpeg). Pour remplacer un média :
écraser le fichier en conservant **exactement le même nom** — aucune
modification de code ne sera nécessaire.

| Emplacement | Fichier | Usage |
|---|---|---|
| `hero/` | `hero-accueil.jpg` | Fond du Hero (1920w) |
| `hero/` | `hero-accueil-960.jpg` | Variante `srcset` 960w |
| `equipe/` | `equipe-marpessa.jpg` | Section À Propos (frame vidéo du soin en cours) |
| `services/` | `service-diagnostic.jpg` | Carte Diagnostic capillaire |
| `services/` | `service-soin-vapeur.jpg` | Carte Soins profonds |
| `services/` | `service-massage.jpg` | Carte Massages du cuir chevelu |
| `services/` | `service-coiffure.jpg` | Carte Coiffures protectrices |
| `galerie/` | `galerie-1.jpg` … `galerie-8.jpg` | Section Galerie (grille 2×4) |
| `logo/` | `logo-hairspa.png` | **Logo officiel** (fond blanc, `mix-blend-multiply`) — ne pas écraser |

Vidéos (`public/videos/`, muettes, `muted loop autoPlay playsInline`) :

| Fichier | Contenu |
|---|---|
| `realisation-soin-vapeur.mp4` | Soin profond à la vapeur au bac (720p, source conservée) |
| `realisation-soin.mp4` | Application du soin (480p, re-encodé CRF 32) |
| `realisation-equipe.mp4` | L'équipe dans le salon (480p, re-encodé CRF 32) |

Chaque image porte un `alt` descriptif traduit (clés i18n `hero.imageAlt`,
`services.imageAlts.*`, `about.imageAlt`, `gallery.imageAlts.*`).
