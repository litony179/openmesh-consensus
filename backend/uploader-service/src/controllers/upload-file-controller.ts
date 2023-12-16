import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { FileMetadata, fileMetadataSchema } from "../schemas/file-metadata";

import { NotFoundError } from "../errors/not-found-error";
import { logEvents } from "../middleware/log-events";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { awsS3Client } from "../services/s3";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Users upload datas that format is full stretched.
const uploadFileHandler = asyncHandler(async (req: Request, res: Response) => {
  /*
   * Step 1: Get request information and do validation
   * step 2:
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

  const fileMetadata = requestFileMetadata.data;

  console.log("This is the file metadata: ", fileMetadata);

  res.status(200).send("Hello");
  // // post -> check -> encrypt -> save
});

export { uploadFileHandler };
