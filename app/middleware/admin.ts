export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()
  await auth.initialize()
  if (!auth.isAuthenticated) return navigateTo('/admin/login')
  if (!auth.isAdmin) return navigateTo('/admin/login?unauthorized=1')
})
