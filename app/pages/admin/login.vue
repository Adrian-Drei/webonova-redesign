<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useSeoMeta({ title: 'Admin sign in · Webonova', robots: 'noindex, nofollow' })
const auth = useAuthStore()
const { loading: busy, error } = storeToRefs(auth)
const route = useRoute()
const email = ref('')
const password = ref('')
if (route.query.unauthorized) auth.error = 'This account does not have administrator access.'
else auth.clearError()

await auth.initialize()
if (auth.isAuthenticated && auth.isAdmin) await navigateTo('/admin')

async function login() {
  if (await auth.login({ email: email.value, password: password.value })) await navigateTo('/admin')
}
</script>

<template>
  <section class="admin-login">
    <div class="login-panel">
      <NuxtLink class="admin-brand login-logo" to="/" aria-label="Webonova home"><BrandLogo variant="dark" /></NuxtLink>
      <span class="eyebrow">SECURE ADMIN AREA</span>
      <h1>Welcome back.</h1>
      <p>Sign in to review and manage project inquiries.</p>
      <form @submit.prevent="login">
        <label>Email address<input v-model="email" type="email" autocomplete="email" required placeholder="admin@webonova.com"></label>
        <label>Password<input v-model="password" type="password" autocomplete="current-password" required placeholder="Your password"></label>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
        <button class="orange-cta" :disabled="busy">{{ busy ? 'Signing in…' : 'Sign in securely' }}</button>
      </form>
      <NuxtLink to="/">← Return to website</NuxtLink>
    </div>
  </section>
</template>
