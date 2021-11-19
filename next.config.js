const path = require('path')
require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
