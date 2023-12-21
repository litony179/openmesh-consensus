import mongoose, { Schema, Document, Model } from "mongoose";
import { BucketModel, BucketFields } from "../Models/BucketModel";

interface NodeFields {
  userId: string;
  dataType: string;
  createDate: string;
  connectionType: string;
  // Bucket?: BucketFields;
}

interface NodeDocument extends Document, NodeFields {}

interface NodeModel extends Model<NodeDocument> {
  build(fields: NodeFields): NodeDocument;
}

const NodeSchema: Schema<NodeDocument, NodeModel> = new Schema({
  userId: { type: String, required: true },
  dataType: { type: String, required: true },
  createDate: { type: String, required: true },
  connectionType: { type: String, required: true },
  // Bucket: { type: BucketModel.schema, required: false },
});

NodeSchema.statics.build = function (fields: NodeFields) {
  return new this(fields);
};

const NodeModel = mongoose.model<NodeDocument, NodeModel>("Node", NodeSchema);

export { NodeModel };