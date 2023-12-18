import express, { Request, Response } from "express";
import { NodeModel } from "../Schema/NodeDBSchema";
import { decrypttoken } from "./DecryptJwt-controller";

const router = express.Router();

router.delete("/delete/:nodeId", async (req: Request, res: Response) => {
  try {

    const nodeId = req.params.nodeId;
    const UserId = decrypttoken(res.header("Authorization"));
    //Deletes node based on the nodeId and userId
    const deleteNode = await NodeModel.deleteOne({ _id: nodeId, UserId });
    //Allows us to understand if the node has been deleted by displaying text in terminal
    if (deleteNode.deletedCount === 1) {
      console.log("Node deleted successfully");
      res.json({ message: "Node deleted successfully" });
    } else {
      console.log("Node not found or not authorized for deletion");
      res
        .status(404)
        .json({ error: "Node not found or not authorized for deletion" });
    }
  } catch (error) {
    console.error("Error deleting node:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
