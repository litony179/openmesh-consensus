import mongoose, {Schema, model} from 'mongoose';


const RawDataSchema = new Schema({
    "id" : { type: Schema.Types.UUID },
    "type" : { type: String },
    "createdDate" : { type: Date },
    "buyer" : {type: String },
    "seller" : {type: String },
    "stuff" : {type: Array },
    "method" : {type: String },
    "payment" : {type: Number },
});

const RawData = model("RawData", RawDataSchema);

export { RawData };