import express, { Request, Response } from "express";
import { encryptdataHandler } from "../../controllers/encrypt-data-controller";


const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
    res.status(200).json({
        health: "OK",
    });
});

router.post("/encryptdata", encryptdataHandler);

export {router as v1UploaderRouter};