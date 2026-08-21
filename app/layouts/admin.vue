<script setup lang="ts">
const auth = useAuthStore()
const { email, initials, loading: signingOut } = storeToRefs(auth)
const route = useRoute()
async function signOut() {
  if (await auth.logout()) await navigateTo('/admin/login')
}
</script>

<template>
  <div class="admin-shell">
    <aside v-if="route.path !== '/admin/login'" class="admin-sidebar">
      <NuxtLink class="admin-brand" to="/admin">WEBONOVA</NuxtLink>
      <p class="admin-role"><Icon name="lucide:building-2" /> Admin</p>
      <nav aria-label="Admin navigation">
        <NuxtLink to="/admin#overview" active-class="" exact-active-class="" :class="{ active: route.hash !== '#inquiries' }"><Icon name="lucide:layout-dashboard" /> Overview</NuxtLink>
        <NuxtLink to="/admin#inquiries" active-class="" exact-active-class="" :class="{ active: route.hash === '#inquiries' }"><Icon name="lucide:messages-square" /> Contact inquiries</NuxtLink>
        <NuxtLink to="/work"><Icon name="lucide:folder" /> Projects</NuxtLink>
        <NuxtLink to="/pricing"><Icon name="lucide:package" /> Packages</NuxtLink>
        <NuxtLink to="/"><Icon name="lucide:external-link" /> View website</NuxtLink>
      </nav>
      <div class="admin-account">
        <span class="admin-avatar">{{ initials }}</span>
        <div><b>Administrator</b><small>{{ email }}</small></div>
      </div>
      <button class="admin-signout" :disabled="signingOut" @click="signOut"><Icon name="lucide:log-out" /> {{ signingOut ? 'Signing out…' : 'Sign out' }}</button>
    </aside>
    <main class="admin-main" :class="{ 'login-main': route.path === '/admin/login' }"><slot /></main>
  </div>
</template>
