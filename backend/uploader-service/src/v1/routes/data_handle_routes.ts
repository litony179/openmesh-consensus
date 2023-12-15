import express, { Request, Response } from "express";
import { retrieveDataHandler, retrieveAsyncHandler } from "../../controllers/retrieve-data-controller";
import { uploadDataHandler, uploadAsyncHandler } from "../../controllers/upload-data-controller";


const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
    res.status(200).json({
        health: "OK",
    });
});

router.post("/upload", uploadDataHandler);

// router.get("/retrieve/:user/:data", encryptDataHandler);
router.get("/retrieve", retrieveDataHandler);

router.post("/uploadA", uploadAsyncHandler);
router.get("/retrieveA", retrieveAsyncHandler);

export { router as v1UploaderRouter };