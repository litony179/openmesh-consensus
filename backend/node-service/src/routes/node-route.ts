import express, { Request, Response } from "express";
import { createNodeHandler } from "../controllers/create-node-controller";
import { verifyJWT } from "../middleware/verify-jwt";
const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

router.post("/createnode", verifyJWT, createNodeHandler);

router.get("/getallnodes", (req: Request, res: Response) => {});

router.get("/getnode:id", (req: Request, res: Response) => {});

router.patch("/updatenode:id", (req: Request, res: Response) => {});

router.delete("/deletenode:id", (req: Request, res: Response) => {});

export { router as nodeRouter };
