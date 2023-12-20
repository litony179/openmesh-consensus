import express, { Request, Response } from "express";
import { CreateNode } from "../controllers/create-node-controller";

const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

router.post("/createnode", CreateNode);


export { router as NodeRouter };