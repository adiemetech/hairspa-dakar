import { useTranslation } from 'react-i18next'

const PHOTOS = ['galerie-1.jpg', 'galerie-2.jpg', 'galerie-3.jpg', 'galerie-4.jpg', 'galerie-5.jpg', 'galerie-6.jpg', 'galerie-7.jpg', 'galerie-8.jpg']

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <section id="galerie" className="scroll-mt-24 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('gallery.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('gallery.title')}
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {PHOTOS.map((photo, index) => (
            <div key={photo} className="overflow-hidden rounded-card shadow-sm">
              <img
                src={`/images/galerie/${photo}`}
                alt={t(`gallery.imageAlts.${index + 1}`)}
                loading="lazy"
                className="aspect-[3/4] size-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
