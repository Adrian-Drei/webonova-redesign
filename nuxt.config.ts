// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css', '~/assets/css/hero.css', '~/assets/css/spacing.css', '~/assets/css/theme.css', '~/assets/css/portfolio.css', '~/assets/css/pricing.css', '~/assets/css/contact.css', '~/assets/css/admin.css'],
  runtimeConfig: { supabaseUrl: process.env.SUPABASE_URL, supabasePublishableKey: process.env.SUPABASE_KEY },
  app: { head: { htmlAttrs:{lang:'en'}, link:[{rel:'icon',href:'/favicon.ico'}], meta:[{name:'theme-color',content:'#031923'},{property:'og:image',content:'/og.png'},{name:'twitter:card',content:'summary_large_image'},{name:'twitter:image',content:'/og.png'}] } },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],
  supabase: {
    redirect: false,
  },
  nitro:{prerender:{routes:['/','/work','/pricing','/contact','/sitemap.xml']}},
  routeRules:{'/sitemap.xml':{prerender:true}},
});
