import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { fileMetadataSchema } from "../schemas/file-metadata";

import { logEvents } from "../middleware/log-events";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { awsS3Client } from "../services/s3";
import { S3Config } from "../config/aws-config";
import { MetadataService } from "../services/metadata";

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

  // Define 'bucket's name'
  console.log("\ntry to create or connect to S3 Bucket...")
  const bucket_name: string = `node-${requestFileMetadata.data.nodeId}`;

  // upload file to bucket
  const uploadingFile = awsS3Client.uploadFile(
    S3Config,
    requestFile,
    { bucketName: bucket_name, key: requestFile.originalname, contentType: requestFile.mimetype });

  // build model(mongoose) to save metadata to MongoDB
  const uploadingMetaData = MetadataService.createMetadata(fileMetadata);

  console.log("\ntry to upload file to S3 Bucket...\n\t& try to save file data to MongoDB");
  const uploadingProcess = await Promise.all([ // .all : parallel start
    // uploading & saving perform concurrently
    uploadingFile, uploadingMetaData
  ]);

  if (uploadingProcess) { // parallel processes are successfully performed.
    console.log(`file uploaded & saved?\n\t\t${Boolean(uploadingProcess)}\n`);
    res.status(200).send(uploadingProcess); // !!!!!! plz revise it plz !!!!!!
  } else {
    res.status(500).send("Server Error: Uploading process blocked");
  }

});

export { uploadFileHandler };
