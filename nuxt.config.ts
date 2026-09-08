export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src/',
  serverDir: 'src/server',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  runtimeConfig: {
    session: {
      name: 'nuxt-session',
      password: process.env.NUXT_SESSION_PASSWORD || 'dev-session-password-change-me-32-chars',
      maxAge: 60 * 60 * 8
    }
  },
  typescript: {
    strict: true,
    typeCheck: false
  }
})
