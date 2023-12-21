import { Node } from "../Models/NodeDefined";
import { fileRetrieve } from "../Schema/filerequest-schema";
import { NotFoundError } from "../errors/not-found-error";

export class FileRetrieveService {

    // R : Read ; valid check given NodeId
    static async isExistingNode(file_request: fileRetrieve) {
        const existingNode = await Node.findById(file_request.nodeId);
        if (existingNode!) {
            throw new NotFoundError("Existing Node checking is failed");
        }
        return existingNode;
    }

    // C: Create; the node has a new property to save file content
    static async saveFileTo(existing_node: Node, file_info: fileRetrieve, file_content: string) {

    }

    // C: Create; assumption 1 : method overload experiment
    static async saveFileToExistingNode(existing_node: Node, file_info: fileRetrieve, file_content: string) {

    }

}