// https://nuxt.com/docs/api/configuration/nuxt-config
import wasm from "vite-plugin-wasm"

export default defineNuxtConfig({
  app: {
    baseURL: process.env.BASE_URL,
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
    '@nuxtjs/supabase'
  ],
  ssr: false,
  vite: {
    plugins: [wasm()]
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  }
})