import mongoose, { Schema, Document } from "mongoose";
import { any, string } from "zod";

// Node database schema interface
export interface NodeDBInt extends Document {
  NodeHash: String;
  UserId: string;
  Public_key: String;
  DataMajor: String;
  CreateDate: String;
  ConnectionType: String;
}
// Node database schema
const NodedbSchema: Schema = new Schema({
  NodeHash: { type: String, required: true },
  UserId: { type: String, required: true },
  Public_key: { type: String, required: true },
  DataMajor: { type: String, required: true },
  CreateDate: { type: String, required: true },
  ConnectionType: { type: String, required: true },
});

const NodeModel = mongoose.model<NodeDBInt>("NodeSchema", NodedbSchema);

export { NodeModel };
