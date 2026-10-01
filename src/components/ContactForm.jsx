'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FORMSPREE_ENDPOINT, waLink } from '@/constants'

const SERVICE_KEYS = ['soin', 'coiffure', 'diagnostic', 'headspa', 'autre']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_BASE =
  'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40'

function FieldError({ id, message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-primary-dark"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export default function ContactForm() {
  const t = useTranslations('contact.form')

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (field) => (event) => {
    const value = field === 'consent' ? event.target.checked : event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    // Validation en temps réel : on revalide un champ dès qu'il a été touché.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate() {
    const next = {}
    if (!values.name.trim()) next.name = t('errors.nameRequired')
    if (!values.email.trim()) next.email = t('errors.emailRequired')
    else if (!EMAIL_RE.test(values.email.trim())) next.email = t('errors.emailInvalid')
    if (!values.message.trim()) next.message = t('errors.messageRequired')
    if (!values.consent) next.consent = t('errors.consentRequired')
    return next
  }

  function composeWhatsApp() {
    const service = values.service ? t(`services.${values.service}`) : '—'
    const lines = [
      `*Nouvelle demande — HairSpa Dakar*`,
      `Nom : ${values.name}`,
      `Email : ${values.email}`,
      values.phone ? `Téléphone : ${values.phone}` : null,
      `Prestation : ${service}`,
      ``,
      values.message,
    ].filter(Boolean)
    return waLink(lines.join('\n'))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            service: values.service ? t(`services.${values.service}`) : '',
            message: values.message,
          }),
        })
        if (!res.ok) throw new Error(`Formspree ${res.status}`)
      } else {
        // Pas de backend configuré : on ouvre WhatsApp avec le message composé.
        window.open(composeWhatsApp(), '_blank', 'noopener,noreferrer')
      }
      setStatus('success')
      setValues({ name: '', email: '', phone: '', service: '', message: '', consent: false })
    } catch {
      setStatus('error')
    }
  }

  const border = (field) => (errors[field] ? 'border-primary' : 'border-ink/15 focus:border-secondary')

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold text-ink">
          {t('name')} <span className="text-primary">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          onBlur={() => !values.name.trim() && setErrors((p) => ({ ...p, name: t('errors.nameRequired') }))}
          placeholder={t('namePlaceholder')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
          className={`${FIELD_BASE} ${border('name')}`}
        />
        <FieldError id="cf-name-error" message={errors.name} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold text-ink">
            {t('email')} <span className="text-primary">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            onBlur={() => {
              const v = values.email.trim()
              if (!v) setErrors((p) => ({ ...p, email: t('errors.emailRequired') }))
              else if (!EMAIL_RE.test(v)) setErrors((p) => ({ ...p, email: t('errors.emailInvalid') }))
            }}
            placeholder={t('emailPlaceholder')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            className={`${FIELD_BASE} ${border('email')}`}
          />
          <FieldError id="cf-email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-semibold text-ink">
            {t('phone')}
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            placeholder={t('phonePlaceholder')}
            className={`${FIELD_BASE} border-ink/15 focus:border-secondary`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-service" className="mb-1.5 block text-sm font-semibold text-ink">
          {t('service')}
        </label>
        <select
          id="cf-service"
          name="service"
          value={values.service}
          onChange={update('service')}
          className={`${FIELD_BASE} border-ink/15 focus:border-secondary ${values.service ? '' : 'text-ink/50'}`}
        >
          <option value="">{t('servicePlaceholder')}</option>
          {SERVICE_KEYS.map((key) => (
            <option key={key} value={key}>
              {t(`services.${key}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold text-ink">
          {t('message')} <span className="text-primary">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          onBlur={() => !values.message.trim() && setErrors((p) => ({ ...p, message: t('errors.messageRequired') }))}
          placeholder={t('messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          className={`${FIELD_BASE} resize-y ${border('message')}`}
        />
        <FieldError id="cf-message-error" message={errors.message} />
      </div>

      <div>
        <label htmlFor="cf-consent" className="flex items-start gap-2.5 text-sm text-ink/75">
          <input
            id="cf-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={update('consent')}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'cf-consent-error' : undefined}
            className="mt-0.5 size-4 shrink-0 rounded border-ink/25 text-secondary accent-secondary"
          />
          <span>
            {t('consent')} <span className="text-primary">*</span>
          </span>
        </label>
        <FieldError id="cf-consent-error" message={errors.consent} />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-secondary px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-secondary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="size-5" aria-hidden="true" />
            {t('submit')}
          </>
        )}
      </button>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.p
            key="success"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl bg-secondary-light px-4 py-3 text-sm font-medium text-secondary-dark"
          >
            <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
            {t('success')}
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            key="error"
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl bg-primary-light px-4 py-3 text-sm font-medium text-primary-dark"
          >
            <AlertCircle className="size-5 shrink-0" aria-hidden="true" />
            {t('error')}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
