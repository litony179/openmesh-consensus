import express, { Request, Response } from "express";
import { CreateNode } from "../controllers/create-node-controller";
import { FetchNodesByUserId } from "../controllers/fetch-node-by-userid-controller";
import { FetchNodes } from "../controllers/fetch-by-datatype-userid";
import { retrieveFileHandler } from "../controllers/retrieve-data-controller";
import { FetchConnectionTypeNodes } from "../controllers/fetch-by-connectiontype";

const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

router.post("/createnode", CreateNode);
router.post("/fetchnodeUID", FetchNodesByUserId);
router.post("/fetchdnodeDT", FetchNodes);
router.post("/retrievedata", retrieveFileHandler);
router.post("/fetchnodeCT", FetchConnectionTypeNodes);


export { router as NodeRouter };