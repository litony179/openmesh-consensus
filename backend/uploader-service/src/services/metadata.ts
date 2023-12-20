import { UploadFile } from "../models/upload-file";
import { FileMetadata } from "../schemas/file-metadata";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";

/**
 * C : Create
 * R : Read
 * U : Update
 * D : Delete
 */

export class MetadataService {

    // C : Create
    static async createMetadata(metadata: FileMetadata) {
        const newMetadata = UploadFile.build({
            userEmail: metadata.userEmail,
            nodeId: metadata.nodeId,
            dataType: metadata.dataType,
            fileName: metadata.fileName,
            fileExtension: metadata.fileExtension
        });

        return await newMetadata.save();
    }

    // R: Read
    static async getMetadataByRequestSchema(schema: FileMetadata) {
        const existingNode = await UploadFile.findOne(schema);
        const responseMetadata = existingNode?.toJSON();
        return responseMetadata;
    }
}