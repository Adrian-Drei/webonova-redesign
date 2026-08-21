export default defineNuxtPlugin((nuxtApp) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const revealSelector = [
    '.section-heading', '.portfolio-list article', '.portfolio-benefits', '.portfolio-cta',
    '.compare-section', '.pricing-faq', '.pricing-cta', '.inquiry-area > aside',
    '.inquiry-form', '.contact-links', '.contact-faq', '.contact-bottom', '.site-cta',
    '.site-footer',
  ].join(',')
  const staggerGroups = [
    ['.service-cards', 'article'], ['.preview-grid', 'article'], ['.home-packages', 'article'],
    ['.process-grid', 'article'], ['.two-packages', 'article'], ['.pricing-process > div', 'article'],
    ['.contact-links > div', 'a'], ['.stat-grid', 'article'],
  ] as const

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      reveal(entry.target as HTMLElement)
      observer.unobserve(entry.target)
    })
  }, { threshold: .15, rootMargin: '0px 0px -4% 0px' })

  function reveal(element: HTMLElement) {
    element.classList.add('is-revealed')
    const delay = Number.parseInt(element.style.getPropertyValue('--motion-delay')) || 0
    window.setTimeout(() => {
      element.classList.remove('motion-reveal', 'is-revealed')
      element.style.removeProperty('--motion-delay')
    }, 620 + delay)
  }

  function prepare(element: HTMLElement, delay = 0) {
    if (element.dataset.motionBound) return
    element.dataset.motionBound = 'true'
    element.style.setProperty('--motion-delay', `${Math.min(delay, 180)}ms`)
    element.classList.add('motion-reveal')
    if (reducedMotion.matches || element.getBoundingClientRect().top < window.innerHeight * .92) {
      reveal(element)
      return
    }
    observer.observe(element)
  }

  function initializeMotion() {
    if (reducedMotion.matches) return
    document.querySelectorAll<HTMLElement>(revealSelector).forEach(element => prepare(element))
    staggerGroups.forEach(([groupSelector, itemSelector]) => {
      document.querySelectorAll(groupSelector).forEach((group) => {
        group.querySelectorAll<HTMLElement>(itemSelector).forEach((item, index) => prepare(item, Math.min(index, 3) * 60))
      })
    })
  }

  nuxtApp.hook('app:mounted', initializeMotion)
  nuxtApp.hook('page:finish', () => requestAnimationFrame(initializeMotion))
  nuxtApp.hook('app:beforeUnmount', () => observer.disconnect())
})
