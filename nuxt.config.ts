// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.BASE_URL,
    head: {
      htmlAttrs: {
        "data-theme": "sherlock"  
      }
    }
  },
  runtimeConfig: {
    public: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    'nuxt-icon',
    [
      '@pinia/nuxt', { autoImports: ['defineStore', 'useStore','storeToRefs']}
    ],
    '@nuxtjs/supabase'
  ],
  // https://content.nuxtjs.org
  content: {
    // documentDriven: true,
    ignores: ['^\/app/.*']
  },
  imports: {
    dirs: ['stores']
  },
  ssr: false
})