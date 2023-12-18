import mongoose from "mongoose";

interface NodeFields {
  nodeUserId: string;
  nodePublicKey: string;
  nodeDataSpecialisation: string;
  nodeCreatedAt: string;
  nodeConnectionType: string;
}

interface NodeModel extends mongoose.Model<NodeDocument> {
  build(fields: NodeFields): NodeDocument;
}

interface NodeDocument extends mongoose.Document {
  nodeUserId: string;
  nodePublicKey: string;
  nodeDataSpecialisation: string;
  nodeCreatedAt: string;
  nodeConnectionType: string;
}

const nodeSchema = new mongoose.Schema({
  nodeUserId: { type: String, required: true },
  nodePublicKey: { type: String, required: true },
  nodeDataSpecialisation: { type: String, required: true },
  nodeCreatedAt: { type: String, required: true },
  nodeConnectionType: { type: String, required: true },
});

nodeSchema.statics.build = (fields: NodeFields) => {
  return new Node(fields);
};

const Node = mongoose.model<NodeDocument, NodeModel>("Node", nodeSchema);

export { Node };
