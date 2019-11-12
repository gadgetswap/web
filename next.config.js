const withImages = require('next-images')
const withSass = require('@zeit/next-sass')

module.exports = withImages(
  withSass({
    env: {
      API_URI: process.env.API_URI,
    }
  })
)
