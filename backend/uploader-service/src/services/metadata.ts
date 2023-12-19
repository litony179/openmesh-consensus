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
    static async getMetadataByNodeid(nodeId: string) {
        const existingNode = await UploadFile.findOne({ nodeId: nodeId });
        const responseMetadata = existingNode?.toJSON();
        return responseMetadata;
    }
}