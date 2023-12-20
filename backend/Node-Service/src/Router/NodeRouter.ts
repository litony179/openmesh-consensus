import express, { Request, Response } from "express";
import { CreateNode } from "../controllers/CreateNode-controller";
import { DeleteNode } from "../controllers/DeleteNode-controller";
import { FetchNode } from "../controllers/FetchNode-controller";
import { verifyJWT } from "../middleware/verify-jwt";

const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

router.post("/createnode", CreateNode);
router.post("/deletenode", DeleteNode);
router.post("/fetchnode", FetchNode);

export { router as NodeRouter };