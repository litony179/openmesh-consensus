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
import { MetadataService } from "../services/metadata";
import { writeFile } from "fs";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const retrieveFileHandler = asyncHandler(async (req: Request, res: Response) => {
    /**
     * Step 1: Node require file using json object
     *          all of those sets or just part of serts.
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

    // call metadata from MongoDB
    const existingMetadata = await MetadataService.getMetadataByNodeid(searchMetadata.nodeId);

    // call file from S3 using called metadata
    /**
     * {
        "userEmail": "altair01@test.io",
        "nodeId": "nodu1dxx87",
        "dataType": "Health",
        "fileName": "altairSecret",
        "fileExtension": "txt",
        "_id": "65812cbbc94e8687df41e235",
        "__v": 0
    }
     */
    if (existingMetadata!) {

        const bucket_name: string = existingMetadata.nodeId;
        const retrievingProcess = await awsS3Client.retrieveByFileName(
            S3Config,
            bucket_name,
            `${existingMetadata.fileName}${existingMetadata.fileExtension}`);

        if (retrievingProcess!) {
            const retrievedFile = await retrievingProcess.Body?.transformToByteArray();
            // !!!! discuss about 'file handling' !!!!
            if (retrievedFile!) {
                console.log("Testing: File handled!")
                res.status(200).send("Testing: File handled!");
            }
        } else {
            console.log("Error: restoring retrieved data failed");
            res.status(500).send("Error: restoring retrieved data failed.")
        }

    } else {
        // !!!! plz revise it plz !!!!
        console.log("Error: retrieve data failed");
        res.status(500).send("Error: retrieve data failed.");
    }

});

export { retrieveFileHandler };