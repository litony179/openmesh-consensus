// NodeRoutes.ts
import express, { Request, Response } from "express";
import { NodeClass } from "../Models/NodeDefined";
import { decrypttoken } from "../controllers/Decrypt";

const router = express.Router();

router.post("/create", (req: Request, res: Response) => {
  const { DataMajor, ConnectionType } = req.body;
  const UserId = decrypttoken(res.header("Authorization"));

  const NewNode = new NodeClass(UserId, DataMajor, ConnectionType);

  try {
    // Save the new node to MongoDB using the NodeModel
    const savedNode = await NodeModel.create(NewNode);
    console.log("Object saved to MongoDB:", savedNode);
    res.status(200).json(savedNode);
  } catch (error) {
    console.error("Error saving object:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
