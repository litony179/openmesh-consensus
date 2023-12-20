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

  // for saving to S3
  const requestFile = req.file;
  // for saving to mongoDB with mongoose
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

  // Remember 'requestFile'
  const fileMetadata = requestFileMetadata.data;

  // Create S3 client
  console.log("\ntry to connect to s3...");

  const s3client = awsS3Client.createS3Client(S3Config);

  console.log(`client created?\n\t\t${Boolean(s3client)}\n`);

  // Define 'bucket's name'
  console.log("\ntry to create or connect to S3 Bucket...");
  // const bucket_name: string = `test-bucket-${Date.now()}`; // !!!! Revision ! Required ! !!!!
  const bucket_name: string = requestFileMetadata.data.nodeId;
  // Create Bucket
  const s3Bucket = await awsS3Client.createS3Bucket(s3client, bucket_name);
  console.log(`bucket created?\n\t\t${Boolean(s3Bucket)}\n`);

  if (s3Bucket!) {
    // upload file to bucket
    const uploadingFile = awsS3Client.uploadFile(s3client, requestFile, {
      bucketName: bucket_name,
      key: requestFile.originalname,
      contentType: requestFile.mimetype,
    });

    // build model(mongoose) to save metadata to MongoDB
    const uploadingMetaData = UploadFile.build(fileMetadata).save(this);

    console.log(
      "\ntry to upload file to S3 Bucket...\n\t& try to save file data to MongoDB"
    );
    const uploadingProcess = await Promise.all([
      // .all : parallel start
      // uploading & saving perform concurrently
      uploadingFile,
      uploadingMetaData,
    ]);

    if (uploadingProcess) {
      // parallel processes are successfully performed.
      console.log(`file uploaded & saved?\n\t\t${Boolean(uploadingProcess)}\n`);
      res.status(200).send(uploadingProcess); // !!!!!! plz revise it plz !!!!!!
    } else {
      res.status(500).send("Server Error: Uploading process blocked");
    }
  } else {
    res.status(500).send("Server Error: Bucket creation failed!");
  }
});

export { uploadFileHandler };
