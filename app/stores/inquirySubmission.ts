export const useInquirySubmissionStore = defineStore('inquiry-submission', () => {
  const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
  const message = ref('')
  const firstName = ref('')
  const isOpen = computed(() => status.value !== 'idle')

  function start(name: string) {
    firstName.value = name.trim().split(/\s+/)[0] || 'there'
    message.value = 'Securely sending your project details…'
    status.value = 'sending'
  }
  function succeed(text: string) { message.value = text; status.value = 'success' }
  function fail(text: string) { message.value = text; status.value = 'error' }
  function close() { if (status.value !== 'sending') status.value = 'idle' }

  return { status, message, firstName, isOpen, start, succeed, fail, close }
})
