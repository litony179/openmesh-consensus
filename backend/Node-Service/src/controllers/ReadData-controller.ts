import { FetchNode } from "./FetchNode-controller";


import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { fileRetrieveSchema } from "../Schema/filerequest-schema";

import { NotFoundError } from "../errors/not-found-error";
import { logEvents } from "../middleware/log-events";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { awsS3Client } from "../services/s3";
import { S3Config, awsConfig } from "../config/aws-config";
import { UploadFile } from "../Models/upload-file";
import { MetadataService } from "../services/metadata";
import { writeFile } from "fs/promises";
import { createReadStream } from "node:fs";
import { Node } from "../Models/NodeDefined";
import { nodeCreateSchema } from "../Schema/node-schema";
import { FileRetrieveService } from "../services/filerequest"

const retrieveFileHandler = asyncHandler(async (req: Request, res: Response) => {
    // fetch data

    // read data into node

    // potentionally print data
    /** Node-Service            |   Uploader-Service        |   filerequest-Schema
     * -------------------------|---------------------------|-------------------------
     *  userId: String;         |   userEmail: String       |   userId: String
        dataType: string;       |   nodeId: String          |   nodeId: String
        createDate: String;     |   dataType: String        |   dataType: String
        connectionType: String; |   fileName: String        |   fileName: String
                                |   fileExtension: String   |   fileExtension: String
       -------------------------|---------------------------|-------------------------
                                                            |       current use
     */
    // who request data?
    const file_request = fileRetrieveSchema.safeParse(req.body);
    // 1. request check
    if (!file_request.success) {
        logEvents(
            `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
                file_request.error.issues
            )}`,
            "error.txt"
        );
        throw new RequestValidationError(file_request.error.issues);
    }
    // 2. is he/she enrolled(trusted) Node?
    const isExistingNode = await FileRetrieveService.checkExistingNode(file_request.data);

    if (!isExistingNode) {
        throw new Error("Error occured in searching node is existing!");
    }

    const fileRequest = file_request.data;

    // 3. According to Bucket naming
    const bucket_name: string = `node-${fileRequest.nodeId}`;
    const file_full_name: string = fileRequest.fileName;
    // 4. Request file from given bucketname
    const retrievingProcess = await awsS3Client.retrieveByFileName(
        S3Config,
        bucket_name,
        file_full_name);

    console.log(`aws retrieving checking : ${retrievingProcess}`);

    // 5. respond file save to mongoDB
    if (retrievingProcess!) {
        const retrievingResult = await retrievingProcess.Body?.transformToString();
        console.log(`retrieving result checking :\n\n${retrievingResult}\n\n`);

        if (retrievingResult!) {// Save file content into mongoDB
            const savingFile =
                FileRetrieveService.saveFileToNewModel(
                    fileRequest.nodeId,
                    fileRequest,
                    retrievingResult);
        }
    }
});

export { retrieveFileHandler };