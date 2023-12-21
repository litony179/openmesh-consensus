import { Node } from "../Models/NodeDefined";
import { fileRetrieve } from "../Schema/fileretrieve-schema";
import { NotFoundError } from "../errors/not-found-error";

export class FileRetrieveService {

    // R : Read ; valid check given NodeId
    static async isExistingNode(file_request: fileRetrieve) {
        const existingNode = await Node.findById(file_request.nodeId);
        if (!existingNode) {
            return false;
            throw new NotFoundError("Existing Node checking is failed");
        }
        return true;
    }

    // C: Create; the node has a new property to save file content
    static async saveFile(file_info: fileRetrieve, file_content: string) {
        const existingNode = await Node.findByIdAndUpdate(file_info.nodeId,
            {
                Bucket: {
                    filename: file_info.fileName,
                    fileExtension: file_info.fileExtension,
                    fileContent: file_content
                }
            });
        if (!existingNode) {
            throw new NotFoundError("Node update failed!");
        }
        return existingNode;
    }

    // C: Create; assumption 1 : method overload experiment
    static async saveFileToExistingNode(file_info: fileRetrieve, file_content: string) {

    }

}