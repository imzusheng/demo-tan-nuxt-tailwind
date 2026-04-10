export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Velvet Skill',
      meta: [
        { name: 'description', content: 'A dark, multilingual intimate-wellness skill landing page for Nuxt and Tailwind.' },
        { name: 'theme-color', content: '#08070b' }
      ]
    }
  },
  tailwindcss: {
    exposeConfig: true
  },
  typescript: {
    strict: true
  }
})
