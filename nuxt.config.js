export default {
  ssr: false,
  head: {
    title: 'NHOM 17 KBS',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  vue: {
    config: {
      ignoredElements: [/^rs-/],
    },
  },
  css: ['@/assets/scss/main.scss'],
  styleResources: {
    scss: [
      '~assets/scss/utils/*.scss',
      '~material-icons/iconfont/material-icons',
    ],
  },
  plugins: [
    '@/plugins/rsmdc.client.js',
    '@/plugins/vmodel3.client.js',
    '@/plugins/layout-content.js',
    '@/plugins/directives/click-outside.js',
    '@/plugins/directives/tooltip.js',
    '@/plugins/filters/formatYen.js',
    '@/apis',
  ],
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],
  modules: [],
  build: {},
  router: {
    base: '/',
  },
}
