import { Configuration } from '@nuxt/types'
const config: Configuration = {
    mode: 'spa',
    srcDir: 'app/',
    /*
     **  Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/mixins',
        '~/plugins/axios'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/eslint-module', '@nuxt/typescript-build'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        ['cookie-universal-nuxt', { alias: 'cookies' }],
    ],
    axios: {
        prefix: '/api'
    },
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            pathRewrite: {
              '^/api' : '/'
              }
            }
    }
}

export default config
