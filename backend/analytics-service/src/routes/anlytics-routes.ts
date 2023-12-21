import express, { Request, Response } from "express";

const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

// Retrieve data from node
router.get("/analyticsdata:nodeid", (req: Request, res: Response) => {});

// Analyse data from node
router.post("/analysedata", (req: Request, res: Response) => {});

export { router as analyticsRouter };
