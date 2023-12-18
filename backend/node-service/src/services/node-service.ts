import { Node } from "../models/node";
import { node } from "../schemas/node-schema";

export class NodeService {
  static async createNode(node: node) {
    const newNode = Node.build({
      nodeUserId: node.nodeUserId,
      nodePublicKey: node.nodePublicKey,
      nodeDataSpecialisation: node.nodeDataSpecialisation,
      nodeCreatedAt: node.nodeCreatedAt,
      nodeConnectionType: node.nodeConnectionType,
    });

    return await newNode.save();
  }
}
