export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()
  const client = useSupabaseClient()

  // Always restore the browser's persisted Supabase session after hydration.
  await auth.initialize(true)
  const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
    auth.syncUser(session?.user || null)
  })

  return {
    provide: {
      stopAuthListener: () => listener.subscription.unsubscribe(),
    },
  }
})
