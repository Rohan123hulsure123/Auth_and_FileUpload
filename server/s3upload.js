const { S3Client } = require('@aws-sdk/client-s3')
const multer = require("multer");
const multerS3 = require('multer-s3')

const s3 = new S3Client(
    {
        credentials: {
            secretAccessKey: process.env.secretAccessKey,
            accessKeyId: process.env.accessKeyId
        },
        region: 'us-east-1'
    }
)

const upload = multer({
    storage: multerS3({
      s3: s3,
      // bucket: 'myfileuploadfilebucket',
      bucket: 'myfileuploadbucketwithpresignedurl',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
      }
    })
})

module.exports = upload;

