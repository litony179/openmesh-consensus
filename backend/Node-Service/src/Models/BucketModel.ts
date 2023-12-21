import mongoose, { Schema, Document } from "mongoose";

export interface BucketFields {
  fileName: string;
  fileExtension: string;
  fileContent: string;
}

export interface BucketDocument extends Document, BucketFields {}

const BucketSchema: Schema<BucketDocument> = new Schema<BucketDocument>({
  fileName: { type: String, required: true },
  fileExtension: { type: String, required: true },
  fileContent: { type: String, required: true },
});

const BucketModel = mongoose.model<BucketDocument>("Bucket", BucketSchema);

export { BucketModel };