const {
  Keystone
} = require('@keystonejs/keystone');
const {
  Text
} = require('@keystonejs/fields');
const {
  GraphQLApp
} = require('@keystonejs/app-graphql');
const {
  AdminUIApp
} = require('@keystonejs/app-admin-ui');
const {
  NuxtApp
} = require('@keystonejs/app-nuxt');

const {
  MongooseAdapter: Adapter
} = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = 'tasks-manager';
const adapterConfig = {
  mongoUri: process.env.MONGO_URI || 'mongodb://admin:manager@127.0.0.1/tasks-manager-db'
};

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  cookieSecret: 'mh4r674rn7xexhdugfx76x634nxg71fnx1dhienksdfxuib1xn4rgxn4yfgy3rfgnx6xgn64nr81386508137xn67tggngxf'
});

// importing models
require('./api/models')(keystone);

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp(),
    new NuxtApp({
      srcDir: 'src',
      buildDir: 'dist',
      dev: (process.env.NODE_ENV !== 'production'),

      mode: 'spa',

      /*
       ** Headers of the page
       */
      head: {
        title: 'hola',
        meta: [{
            charset: 'utf-8'
          },
          {
            name: 'X-UA-Compatible',
            content: 'IE=edge'
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=1, shrink-to-fit=no'
          },
          {
            hid: 'description',
            name: 'description',
            content: ''
          },
          {
            name: 'author',
            content: 'Creative Tim, Cristi Jora'
          }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
          }
        ]
      },

      /*
       ** Configuration for @nuxtjs/pwa
       ** https://developer.mozilla.org/en-US/docs/Web/Manifest
       */
      manifest: {
        name: 'Vue Argon Design',
        short_name: 'Argon Design',
        description: 'Vue Argon Design System for Nuxt',
        theme_color: '#172b4d',
      },

      meta: {
        // apple-mobile-web-app-capable=yes
        // https://medium.com/@firt/dont-use-ios-web-app-meta-tag-irresponsibly-in-your-progressive-web-apps-85d70f4438cb
        mobileAppIOS: true,
        appleStatusBarStyle: '#172b4d'
      },

      /*
       ** Customize the progress-bar color
       */
      loading: {
        color: '#fff'
      },

      /*
       ** Global CSS
       */
      css: [
        '~assets/argon/vendor/nucleo/css/nucleo.css',
        '@fortawesome/fontawesome-free/css/all.css',
        '~assets/argon/scss/argon.scss',
        'bootstrap-vue/dist/bootstrap-vue.css',
        '~assets/transitions.css'
      ],

      /*
       ** Plugins to load before mounting the App
       */
      plugins: [
        '~/plugins/argon/argon-kit'
      ],

      /*
       ** Nuxt.js modules
       */
      modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Doc: https://bootstrap-vue.js.org/docs/
        ['bootstrap-vue/nuxt', {
          bootstrapCSS: false,
          bootstrapVueCSS: false,
          componentPlugins: [
            'Carousel',
            'Spinner'
          ],
          directivePlugins: [
            'Tooltip',
            'Popover'
          ]
        }],
        '@nuxtjs/pwa'
      ],
      /*
       ** Axios module configuration
       */
      axios: {
        // See https://github.com/nuxt-community/axios-module#options
      },

      /*
       ** Build configuration
       */
      build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {

        }
      }

    }),
  ],
};