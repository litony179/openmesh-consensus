import { Types } from "mongoose";
import { BucketModel, Node } from "../Models/NodeDefined";
import { fileRetrieve } from "../Schema/fileretrieve-schema";
import { NotFoundError } from "../errors/not-found-error";

export class FileRetrieveService {

    // R : Read ; valid check given NodeId
    static async isExistingNode(file_request: fileRetrieve) {
        console.log("existing node checking...\n\n");
        console.log(file_request.nodeId);
        console.log(typeof (file_request.nodeId));
        console.log("\ncheck\n");
        const existingNode = await Node.findById(file_request.nodeId);
        if (!existingNode) {
            return false;
            throw new NotFoundError("Existing Node checking is failed");
        }
        return true;
    }

    // C: Create; the node has a new property to save file content
    static async saveFile(file_info: fileRetrieve, file_content: string) {

        console.log("\ntry to saving file\n");
        const existingNode = await Node.findById(file_info.nodeId);

        if (!existingNode) {
            console.log('Node not found');
            return null;
        }

        let bucketId = existingNode.Bucket as Types.ObjectId;
        if (!bucketId) {
            const newBucket = new BucketModel({
                fileName: file_info.fileName,
                fileExtension: file_info.fileExtension,
                fileContent: file_content
            });
            const savedBucket = await newBucket.save();
            bucketId = savedBucket._id;
        } else {
            // Update the existing bucket
            await BucketModel.findByIdAndUpdate(bucketId, {
                fileName: file_info.fileName,
                fileExtension: file_info.fileExtension,
                fileContent: file_content
            });
        }

        // Update the node with the new or existing bucket _id
        existingNode.Bucket = bucketId;
        const updatedNode = await existingNode.save();

        if (!updatedNode) {
            console.error('Error in Bucket updating process');
        }

        console.log('Node updated with bucket information :', updatedNode);

        const returnBucketContent = await BucketModel.findById(existingNode.Bucket);

        if (!returnBucketContent) {
            console.error('Error in searching updated bucket process');
        }

        return returnBucketContent;
    }

}