export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  const client = useSupabaseClient()

  auth.initialize()
  const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
    auth.syncUser(session?.user || null)
  })

  return {
    provide: {
      stopAuthListener: () => listener.subscription.unsubscribe(),
    },
  }
})
