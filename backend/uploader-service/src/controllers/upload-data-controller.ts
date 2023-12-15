import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { checkData } from "../blueprint/paperplan/check-data-functions";
import { encryptDataToJSON, encryptDataToString } from "../blueprint/encrypt-data-functions";
import { encryptedObject, encryptedString } from "../models/data-model";

// Users upload datas that format is full stretched.
const uploadDataHandler = (req: Request, res: Response) => {
    // post -> check -> encrypt -> save
    let chckdata = checkData(req.body);
    let encrypted = encryptDataToJSON(chckdata);
    const encData = new encryptedObject(encrypted);
    encData.save();

    res.send('1st test');
};

// // Users upload datas that format is compressed.
// const uploadDataHandler = (req: Request, res: Response) => {
//     // post -> check -> encrypt -> save
//     let chckdata = checkData(req.body);
//     let encrypted = encryptDataToString(chckdata);
//     const encData = new encryptedString(encrypted);
//     encData.save();

//     res.send('1st test');
// };

export { uploadDataHandler }