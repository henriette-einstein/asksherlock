// https://nuxt.com/docs/api/configuration/nuxt-config
import wasm from "vite-plugin-wasm"

export default defineNuxtConfig({
  app: {
    baseURL: process.env.BASE_URL,
  },
  runtimeConfig: {
    public: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    'nuxt-icon',
    '@nuxtjs/supabase'
  ],
  // https://content.nuxtjs.org
  content: {
    ignores: ['^\/app/.*']
  },
  ssr: false,
  vite: {
    plugins: [wasm()]
  },
  nitro: {
    storage: {
      data: {
        driver: 'fs',
        base: './data'
      }
    }
  }
})