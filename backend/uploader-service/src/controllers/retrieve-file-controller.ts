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

const retrieveFileHandler = asyncHandler(async (req: Request, res: Response) => {
    /**
     * Step 1: Node require file using json object
     * {
        "userEmail": "altair01@test.io",
        "nodeId": "nodu1dxx87",
        "dataType": "Health",
        "fileName": "altairSecret",
        "fileExtension": "txt",
        "_id": "65812cbbc94e8687df41e235",
        "__v": 0
    }
     * all of those sets or just part of serts.
     * Step 2: Uploader find data from MongoDB.
     * Step 3: Uploader find file from S3 using data stored in MongoDB.
     */

    // Maybe the searchMetadataSchema includes nodeid
    const requestSearchMetadata = serachMetadataSchema.safeParse(req.body);

    if (!requestSearchMetadata.success) {
        console.log(requestSearchMetadata);
        console.log(requestSearchMetadata.error.issues);

        throw new RequestValidationError(requestSearchMetadata.error.issues);
    }

    const searchMetadata = requestSearchMetadata.data;

});

export { retrieveFileHandler };