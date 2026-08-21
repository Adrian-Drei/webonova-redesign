// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css', '~/assets/css/hero.css', '~/assets/css/spacing.css', '~/assets/css/theme.css', '~/assets/css/portfolio.css', '~/assets/css/pricing.css', '~/assets/css/contact.css', '~/assets/css/admin.css', '~/assets/css/layout-audit.css', '~/assets/css/mobile-nav.css', '~/assets/css/motion.css'],
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabasePublishableKey: process.env.SUPABASE_KEY,
    public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://webonova.ph' },
  },
  app: { pageTransition:{name:'page'}, head: { htmlAttrs:{lang:'en'}, link:[{rel:'icon',href:'/favicon.ico'},{rel:'apple-touch-icon',href:'/brand/webonova-mark.webp'}], meta:[{name:'theme-color',content:'#031923'}] } },
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
  nitro:{prerender:{routes:['/','/work','/pricing','/contact','/sitemap.xml','/robots.txt']}},
  routeRules:{
    '/sitemap.xml':{prerender:true},
    '/robots.txt':{prerender:true},
    '/admin':{headers:{'X-Robots-Tag':'noindex, nofollow'}},
    '/admin/**':{headers:{'X-Robots-Tag':'noindex, nofollow'}},
    '/api/**':{headers:{'X-Robots-Tag':'noindex, nofollow'}},
  },
});
