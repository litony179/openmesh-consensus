import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { FileMetadata, fileMetadataSchema } from "../schemas/file-metadata";

import { NotFoundError } from "../errors/not-found-error";
import { logEvents } from "../middleware/log-events";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { awsS3Client } from "../services/s3";
import { S3Config, awsConfig } from "../config/aws-config";
import { UploadFile } from "../models/upload-file";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Users upload datas that format is full stretched.
const uploadFileHandler = asyncHandler(async (req: Request, res: Response) => {
  /*
   * Step 1: Get request information and do validation
   * step 2: Save 'request_file' to S3 & Save file's 'metadata' to MongoDB
   */

  // retrieve file from request body
  console.log(req.body);
  console.log(req.file);
  const requestFile = req.file;

  const requestFileMetadata = fileMetadataSchema.safeParse(req.body);

  if (!requestFileMetadata.success) {
    console.log(requestFileMetadata);
    console.log(requestFileMetadata.error.issues);

    throw new RequestValidationError(requestFileMetadata.error.issues);
  }
  if (!requestFile) {
    const methodName = "uploadFileHandler";
    const message = "Error in file upload";
    logEvents(
      `${req.method}\t${req.headers.origin}\t${methodName}\t${message}`,
      "error.txt"
    );
    throw new BadRequestError(message);
  }

  console.log("This is the request body: ", req.body);
  console.log("This is the request image/file", req.file);

  // Remember 'requestFile'
  const fileMetadata = requestFileMetadata.data;

  console.log("This is the file metadata: ", fileMetadata);

  // Present: File & MetaData all inspected
  // So, this time, "ACTIVATE S3!"

  // Create Bucket ( Creating client & Checking bucket already applied)
  const s3Bucket = await awsS3Client.createS3Bucket(S3Config, "bucksbucks");

  if (s3Bucket === null) {
    // if (s3Bucket!) {

    const uploadingFile = awsS3Client.uploadFile(
      s3Bucket,
      requestFile,
      { bucketName: s3Bucket, key: "key", contentType: "contentType" });

    const uploadingMetaData = UploadFile.build(fileMetadata).save(this);

    const uploadingProcess = await Promise.all([
      uploadingFile, uploadingMetaData
    ]);

  } else {
    res.status(500).send("Server Error: Bucket creation failed!")
  }

  res.status(200).send("Hello");

});

export { uploadFileHandler };
