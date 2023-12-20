import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

interface NodeFields {
  userId: string;
  // Public_key: String;
  dataType: string;
  createDate: string;
  connectionType: string;
}

interface NodeModel extends mongoose.Model<NodeDocument>{
  build(fields: NodeFields): NodeDocument;
}

interface NodeDocument extends mongoose.Document {
  userId: string;
  // Public_key: String;
  dataType: string;
  createDate: string;
  connectionType: string;
}

const NodeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  // Public_key: { type: String, required: true },
  dataType: { type: String, required: true },
  createDate: { type: String, required: true },
  connectionType: { type: String, required: true },
});

NodeSchema.statics.build = (fields: NodeFields) => {
  return new Node(fields);
};

const Node = mongoose.model<NodeDocument, NodeModel>("Node", NodeSchema);

export { Node };
