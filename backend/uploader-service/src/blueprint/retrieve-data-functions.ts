import { Header } from "./raw-data-format";
import { encryptedObject, encryptedString } from "../models/data-model"

// get -> 'retrieve' -> return

// query, filter same term in Mongoose.
function retrieveData(query: Header) {
    const retrieved = encryptedObject.find(query);
    // const retrieved = encryptedString.find(query);
    return retrieved;
}

export { retrieveData };