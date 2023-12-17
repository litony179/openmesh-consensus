import express, { Request, Response } from "express";

const router = express.Router();

router.get("/healthCheck", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

export { router as nodeRouter };
