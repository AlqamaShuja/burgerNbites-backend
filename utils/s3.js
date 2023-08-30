require("dotenv").config();
const fs = require('fs')
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')


const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKey,
    secretKey,
  },
})

const uploadFile = async (file, fileName) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
    ContentType: file.mimetype,
  }

  const command = new PutObjectCommand(uploadParams)

  return await s3Client.send(command)
}


const deleteFile = async (fileName) => {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    };
  
    const command = new DeleteObjectCommand(deleteParams);
  
    return await s3Client.send(command);
  } catch (error) {
    throw error
  }
};

async function getFileStream(fileKey) {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    }

    const command = new GetObjectCommand(downloadParams)
    const respsonse = await s3Client.send(command)

    return respsonse.Body
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  uploadFile,
  getFileStream,
  deleteFile,
}