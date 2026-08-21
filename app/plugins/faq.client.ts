export default defineNuxtPlugin((nuxtApp) => {
  const selector = '.faq details, .pricing-faq details, .contact-faq details'
  const running = new WeakMap<HTMLDetailsElement, Animation>()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  function setIcon(details: HTMLDetailsElement) {
    const icon = details.querySelector<HTMLElement>('summary span')
    if (icon) icon.textContent = details.open ? '−' : '+'
  }

  function finish(details: HTMLDetailsElement) {
    details.style.removeProperty('height')
    details.style.removeProperty('overflow')
    running.delete(details)
    setIcon(details)
  }

  function toggle(details: HTMLDetailsElement, open: boolean) {
    running.get(details)?.cancel()

    if (reduceMotion.matches) {
      details.open = open
      setIcon(details)
      return
    }

    const summary = details.querySelector<HTMLElement>('summary')
    if (!summary) return

    const startHeight = `${details.offsetHeight}px`
    if (open) details.open = true
    const endHeight = `${open ? details.scrollHeight : summary.offsetHeight}px`
    details.style.overflow = 'hidden'

    const animation = details.animate(
      { height: [startHeight, endHeight] },
      { duration: 280, easing: 'cubic-bezier(.22, 1, .36, 1)' },
    )
    running.set(details, animation)
    animation.onfinish = () => {
      details.open = open
      finish(details)
    }
    animation.oncancel = () => finish(details)
  }

  function onClick(event: MouseEvent) {
    const summary = (event.target as Element | null)?.closest('summary')
    const details = summary?.parentElement
    if (!(details instanceof HTMLDetailsElement) || !details.matches(selector)) return

    event.preventDefault()
    const shouldOpen = !details.open
    if (shouldOpen) {
      const group = details.closest('.faq, .pricing-faq, .contact-faq')
      group?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((item) => {
        if (item !== details) toggle(item, false)
      })
    }
    toggle(details, shouldOpen)
  }

  document.querySelectorAll<HTMLDetailsElement>(selector).forEach(setIcon)
  document.addEventListener('click', onClick)
  nuxtApp.hook('app:beforeUnmount', () => document.removeEventListener('click', onClick))
})
