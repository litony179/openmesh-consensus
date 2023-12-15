import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { checkData, checkDataAsync } from "../modules/paperplan/check-data-functions";
import { encryptDataToJSON, encryptDataToJSONAsync, encryptDataToString } from "../modules/encrypt/encrypt-data-functions";
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

// Users upload datas that format is full stretched.
const uploadAsyncHandler = asyncHandler(async (req: Request, res: Response) => {
    // post -> check -> encrypt -> save
    let chckdata = await checkDataAsync(req.body);
    let encrypted = await encryptDataToJSONAsync(chckdata);
    const encData = new encryptedObject(encrypted);
    encData.save();

    res.send('1st test');
});

export { uploadDataHandler, uploadAsyncHandler }