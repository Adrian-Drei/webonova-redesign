import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const client = useSupabaseClient()
  const user = ref<User | null>(null)
  const initialized = ref(false)
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => Boolean(user.value))
  const isAdmin = computed(() => user.value?.app_metadata?.role === 'admin')
  const email = computed(() => user.value?.email || '')
  const initials = computed(() => email.value.slice(0, 2).toUpperCase())

  async function initialize() {
    if (initialized.value) return
    const { data, error: authError } = await client.auth.getUser()
    user.value = data.user
    error.value = authError?.message || ''
    initialized.value = true
  }

  async function login(credentials: { email: string; password: string }) {
    loading.value = true
    error.value = ''
    try {
      const { data, error: authError } = await client.auth.signInWithPassword(credentials)
      if (authError) {
        error.value = authError.message
        return false
      }
      if (data.user?.app_metadata?.role !== 'admin') {
        await client.auth.signOut()
        user.value = null
        error.value = 'This account does not have administrator access.'
        return false
      }
      user.value = data.user
      initialized.value = true
      return true
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    error.value = ''
    const { error: authError } = await client.auth.signOut()
    user.value = null
    initialized.value = true
    loading.value = false
    if (authError) {
      error.value = authError.message
      return false
    }
    return true
  }

  function syncUser(nextUser: User | null) {
    user.value = nextUser
    initialized.value = true
  }

  function clearError() { error.value = '' }

  return { user, initialized, loading, error, isAuthenticated, isAdmin, email, initials, initialize, login, logout, syncUser, clearError }
})
