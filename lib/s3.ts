import aws from 'aws-sdk'
import { ManagedUpload } from 'aws-sdk/clients/s3'

class S3 {
  constructor() {
    aws.config.region = process.env.AWS_REGION

    aws.config.credentials = new aws.CognitoIdentityCredentials({
      IdentityPoolId: process.env.AWS_IDENTITY_POOL as string
    })
  }

  async upload(path: string, file: File) {
    const upload = new ManagedUpload({
      params: {
        ACL: 'public-read',
        Body: file,
        Bucket: process.env.AWS_S3_BUCKET as string,
        ContentType: file.type,
        Key: path
      }
    })

    const { Location } = await upload.promise()

    return Location
  }
}

export const s3 = new S3()
