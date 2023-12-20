import { FetchNode } from "./FetchNode-controller";


import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { fileMetadataSchema } from "../Schema/file-metadata";

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
import { NodeClass } from "../Models/NodeDefined";

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const retrieveFileHandler = asyncHandler(async (req: Request, res: Response) => {
//     // fetch data

//     // read data into node

//     // potentionally print data
//     /** Node-Service            |   Uploader-Service
//      * -------------------------|--------------------------
//      *  NodeHash: String;       |   userEmail: String
//         UserId: string;         |   nodeId: String
//         Public_key: String;     |   dataType: String
//         DataMajor: String;      |   fileName: String
//         CreateDate: String;     |   fileExtension: String
//         ConnectionType: String; |
//      */

//     // Maybe the searchMetadataSchema includes nodeid
//     const reqFileMetadata = fileMetadataSchema.safeParse(req.body);

//     console.log(`requested file format checking : ${reqFileMetadata}`);

//     if (!reqFileMetadata.success) {
//         console.log(reqFileMetadata);
//         console.log(reqFileMetadata.error.issues);

//         throw new RequestValidationError(reqFileMetadata.error.issues);
//     }

//     const searchMetadata = reqFileMetadata.data;

//     // call metadata from MongoDB
//     const existingMetadata = await MetadataService.getMetadataByRequestSchema(searchMetadata);

//     console.log(`mongodb checking : ${existingMetadata}`);

//     // call file from S3 using called metadata
//     /**
//      * {
//         "userEmail": "altair01@test.io",
//         "nodeId": "nodu1dxx87",
//         "dataType": "Health",
//         "fileName": "altairSecret",
//         "fileExtension": "txt",
//         "_id": "65812cbbc94e8687df41e235",
//         "__v": 0
//     }
//      */
//     if (existingMetadata!) {

//         const bucket_name: string = `node-${existingMetadata.nodeId}`;
//         const retrievingProcess = await awsS3Client.retrieveByFileName(
//             S3Config,
//             bucket_name,
//             `${existingMetadata.fileName}.${existingMetadata.fileExtension}`);

//         console.log(`aws retrieving checking : ${retrievingProcess}`);

//         if (retrievingProcess!) {
//             // res.attachment(`${existingMetadata.fileName}.${existingMetadata.fileExtension}`);
//             // const retrievingResult = await retrievingProcess.Body?.transformToWebStream().pipeTo(res);
//             const retrievingResult = await retrievingProcess.Body?.transformToString();
//             console.log(`retrieving result checking : ${retrievingResult}`);

//             if (retrievingResult!) {
//                 console.log(`Trying to create a file from retrieved data`);
//                 const retrievedFile = await writeFile(
//                     `./temp/${existingMetadata.fileName}.${existingMetadata.fileExtension}`,
//                     retrievingResult);

//                 console.log(`Is the file created? : ${retrievedFile}`);

//                 res.attachment(`./temp/${existingMetadata.fileName}.${existingMetadata.fileExtension}`);
//                 // to download the file for someone; use like this functions 
//                 // const fileStream = createReadStream(`./temp/${existingMetadata.fileName}.${existingMetadata.fileExtension}`);
//                 // fileStream.pipe(res);
//                 // or use this function too.
//                 res.download(`./temp/${existingMetadata.fileName}.${existingMetadata.fileExtension}`);
//                 console.log("Testing: File handled!")
//                 // res.status(200).send("Testing: File handled!");
//             }
//         } else {
//             console.log("Error: restoring retrieved data failed");
//             res.status(500).send("Error: restoring retrieved data failed.")
//         }

//     } else {
//         // !!!! plz revise it plz !!!!
//         console.log("Error: retrieve data failed");
//         res.status(500).send("Error: retrieve data failed.");
//     }

// });

// export { retrieveFileHandler };

const retrieveFileHandler = asyncHandler(async (req: Request, res: Response) => {
    // fetch data

    // read data into node

    // potentionally print data
    /** Node-Service            |   Uploader-Service
     * -------------------------|--------------------------
     *  NodeHash: String;       |   userEmail: String
        UserId: string;         |   nodeId: String
        Public_key: String;     |   dataType: String
        DataMajor: String;      |   fileName: String
        CreateDate: String;     |   fileExtension: String
        ConnectionType: String; |
     */

    const bucket_name: string = `node-${NodeHash}`;
    const retrievingProcess = await awsS3Client.retrieveByFileName(
        S3Config,
        bucket_name,
        `${fileName}.${fileExtension}`);

    console.log(`aws retrieving checking : ${retrievingProcess}`);

});

export { retrieveFileHandler };