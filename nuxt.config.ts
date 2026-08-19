// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css', '~/assets/css/hero.css', '~/assets/css/spacing.css'],
  app: { head: { htmlAttrs:{lang:'en'}, link:[{rel:'icon',href:'/favicon.ico'}], meta:[{name:'theme-color',content:'#f4f2ec'},{property:'og:image',content:'/og.png'},{name:'twitter:card',content:'summary_large_image'},{name:'twitter:image',content:'/og.png'}] } },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],
  supabase: {
    redirect: false,
  },
  nitro:{prerender:{routes:['/','/work','/pricing','/contact','/sitemap.xml']}},
  routeRules:{'/sitemap.xml':{prerender:true}},
});
