import mongoose, { Schema, Types } from "mongoose";

interface BucketFields {
  fileName: string;
  fileExtension: string;
  fileContent: string;
}

interface BucketDocument extends Document, BucketFields { }

const BucketSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileExtension: { type: String, required: true },
  fileContent: { type: String, required: true },
});
const BucketModel = mongoose.model<BucketDocument>('Bucket', BucketSchema);

interface NodeFields {
  userId: string;
  dataType: string;
  createDate: string;
  connectionType: string;
  Bucket?: Types.ObjectId | BucketFields;
}

interface NodeDocument extends mongoose.Document {
  userId: string;
  dataType: string;
  createDate: string;
  connectionType: string;
  Bucket?: Types.ObjectId | BucketFields;
}

const NodeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  dataType: { type: String, required: true },
  createDate: { type: String, required: true },
  connectionType: { type: String, required: true },
  Bucket: { type: Schema.Types.ObjectId, ref: 'Bucket', required: false },
});

interface NodeModel extends mongoose.Model<NodeDocument> {
  build(fields: NodeFields): NodeDocument;
}

NodeSchema.statics.build = (fields: NodeFields) => {
  return new Node(fields);
};

const Node = mongoose.model<NodeDocument, NodeModel>("Node", NodeSchema);

export { Node, BucketModel, BucketDocument };
