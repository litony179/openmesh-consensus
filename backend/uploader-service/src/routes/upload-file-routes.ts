import express, { Request, Response } from "express";
import { uploadFileHandler } from "../controllers/upload-file-controller";
// import { retrieveFileHandler } from "../controllers/retrieve-file-controller";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/healthCheck", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

// router.get("/retrieve", retrieveFileHandler);

router.post("/uploadFile", upload.single("file"), uploadFileHandler);
// router.get("/retrieveFile", retrieveAsyncHandler);

export { router as v1UploaderRouter };
