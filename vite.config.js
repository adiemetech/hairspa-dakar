import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const here = dirname(fileURLToPath(import.meta.url))

// URLs de langue (/fr/, /en/) servies statiquement : copie dist/index.html dans
// chaque sous-dossier après le build. Les chemins d'assets étant absolus, la
// copie fonctionne telle quelle et i18next détecte la langue via le segment d'URL.
function localePages() {
  return {
    name: 'locale-pages',
    closeBundle() {
      const src = resolve(here, 'dist/index.html')
      if (!existsSync(src)) return
      const html = readFileSync(src)
      for (const code of ['fr', 'en']) {
        const dir = resolve(here, `dist/${code}`)
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localePages()],
})
