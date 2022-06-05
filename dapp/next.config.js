const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const moduleExports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching
  },
  reactStrictMode: process.env.NODE_ENV === 'production',
  poweredByHeader: false
})

// const sentryWebpackPluginOptions = {
//   silent: true
// }

module.exports = moduleExports