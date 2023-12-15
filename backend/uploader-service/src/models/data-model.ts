import { RawDataFormat } from "./blueprint/raw-data-format";
import { Schema, model } from "mongoose";

// Mongoose use Schema as scaffold
const encryptedObjectSchema = new Schema<RawDataFormat>({
    header: {
        id: { type: Schema.Types.UUID, required: true },
        type: { type: String, required: true },
        createdDate: { type: Date, required: true },
    },
    body: {
        buyer: { type: String, required: true },
        seller: { type: String, required: true },
        products: [
            {
                productName: { type: String, required: true },
                value: { type: String, required: true }
            }
        ],
        method: { type: String, required: true },
        payment: { type: String, required: true },
    }
});

// Mongoose use Model as container
const encryptedObject = model('encryptedObject', encryptedObjectSchema);


// Mongoose use Schema as scaffold
const encryptedStringSchema = new Schema({
    header: {
        id: { type: Schema.Types.UUID, required: true },
        type: { type: String, required: true },
        createdDate: { type: Date, required: true },
    },
    body: {
        encryptedString: { type: String, required: true }
    }
});

// Mongoose use Model as container
const encryptedString = model('encryptedString', encryptedStringSchema);


export { encryptedObject, encryptedString };