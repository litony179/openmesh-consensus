import mongoose from "mongoose";

interface UploadFileFields {
  userEmail: string;
  nodeId: string;
  dataType: string;
  fileName: string;
  fileExtension: string;
}

interface UploadFileModel extends mongoose.Model<UploadFileDocument> {
  build(fields: UploadFileFields): UploadFileDocument;
}

interface UploadFileDocument extends mongoose.Document {
  userEmail: string;
  nodeId: string;
  dataType: string;
  fileName: string;
  fileExtension: string;
}

const uploadFileSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  nodeId: { type: String, required: true },
  dataType: { type: String, required: true },
  fileName: { type: String, required: true },
  fileExtension: { type: String, required: true },
});

uploadFileSchema.statics.build = (fields: UploadFileFields) => {
  return new UploadFile(fields);
};

const UploadFile = mongoose.model<UploadFileDocument, UploadFileModel>(
  "UploadFile",
  uploadFileSchema
);

export { UploadFile };
