import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Header } from "../blueprint/raw-data-format";
import { retrieveData } from "../blueprint/retrieve-data-functions";

// const encryptDataHandler = asyncHandler(async (req: Request, res: Response) => {

// });

const retrieveDataHandler = (req: Request, res: Response) => {
    // get -> retrieve -> return
    let retrieved = retrieveData(req.body);
    const stringified = JSON.stringify(retrieved);

    res.send(stringified);
};

export { retrieveDataHandler };