const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withImages(
  withSass({
    env: {
      API_URI: process.env.API_URI,
      AWS_IDENTITY_POOL: process.env.AWS_IDENTITY_POOL,
      AWS_REGION: process.env.AWS_REGION,
      AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
      GOOGLE_KEY: process.env.GOOGLE_KEY
    }
  })
)
