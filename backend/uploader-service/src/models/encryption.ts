import { UUID } from 'crypto';
import mongoose, {Schema, model, Document, Model} from 'mongoose';

interface RawDataFields {
    id : UUID;
    type : String;
    createdDate: Date;
    buyer : String;
    seller : String;
    stuff : Array<String>;
    method : String;
    payment : Number;
}

interface RawDataDocument extends Document {
    id : UUID;
    type : String;
    createdDate: Date;
    buyer : String;
    seller : String;
    stuff : Array<String>;
    method : String;
    payment : Number;
}

interface RawDataModel extends Model<RawDataDocument> {
    build(fields: RawDataFields) : RawDataDocument;
}

const rawDataSchema = new Schema({
    "id" : { type: Schema.Types.UUID },
    "type" : { type: String },
    "createdDate" : { type: Date },
    "buyer" : {type: String },
    "seller" : {type: String },
    "stuff" : {type: Array },
    "method" : {type: String },
    "payment" : {type: Number },
});


rawDataSchema.statics.build = (fields: RawDataFields) => {
    return new RawData(fields);
}

const RawData = model<RawDataDocument, RawDataModel>("RawData", rawDataSchema);

export { RawData };