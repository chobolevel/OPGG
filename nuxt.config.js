module.exports = {
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'OP.GG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#5383E8' },
  /*
  ** Build configuration
  */
  build: {
    parallel: true,
    cache: true,
    hardSource: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/krApi': {
      target: 'https://kr.api.riotgames.com',
      pathRewrite: { '^/krApi': '' }
    },
    '/asiaApi': {
      target: 'https://asia.api.riotgames.com',
      pathRewrite: { '^/asiaApi': '' }
    }
  },
  plugins: [
    { src: '~plugins/filter.js' }
  ]
}

