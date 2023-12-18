import express, { Request, Response } from "express";
import { CreateNode } from "../controllers/CreateNode-controller";
import { DeleteNode } from "../controllers/DeleteNode-controller";
import { FetchNode } from "../controllers/FetchNode-controller";

const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

router.post("/CreateNode", CreateNode);
router.delete("/DeleteNode", DeleteNode);
router.post("/FetchNode", FetchNode);

export { router as NodeRouter };