import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { fileMetadataSchema } from "../schemas/file-metadata";

import { NotFoundError } from "../errors/not-found-error";
import { logEvents } from "../middleware/log-events";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { awsS3Client } from "../services/s3";
import { S3Config, awsConfig } from "../config/aws-config";
import { UploadFile } from "../models/upload-file";
import { MetadataService } from "../services/metadata";
import { writeFile } from "fs/promises";
import { createReadStream } from "node:fs";

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
    const requestFileMetadata = fileMetadataSchema.safeParse(req.body);


    if (!requestFileMetadata.success) {
        console.log(requestFileMetadata);
        console.log(requestFileMetadata.error.issues);

        throw new RequestValidationError(requestFileMetadata.error.issues);
    }

    const searchMetadata = requestFileMetadata.data;

    // call metadata from MongoDB
    const existingMetadata = await MetadataService.getMetadataByRequestSchema(searchMetadata);

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

        const bucket_name: string = `node-${existingMetadata.nodeId}`;
        const retrievingProcess = await awsS3Client.retrieveByFileName(
            S3Config,
            bucket_name,
            `${existingMetadata.fileName}.${existingMetadata.fileExtension}`);

        if (retrievingProcess!) {
            // res.attachment(`${existingMetadata.fileName}.${existingMetadata.fileExtension}`);
            // const retrievingResult = await retrievingProcess.Body?.transformToWebStream().pipeTo(res);
            const retrievingResult = await retrievingProcess.Body?.transformToString();

            if (retrievingResult!) {
                const retrievedFile = await writeFile(
                    `../../temp/${existingMetadata.fileName}.${existingMetadata.fileExtension}`,
                    retrievingResult);

                res.attachment(`../../temp/${existingMetadata.fileName}.${existingMetadata.fileExtension}`);
                const fileStream = createReadStream(`../../temp/${existingMetadata.fileName}.${existingMetadata.fileExtension}`);
                fileStream.pipe(res);
                console.log("Testing: File handled!")
                // res.status(200).send("Testing: File handled!");
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