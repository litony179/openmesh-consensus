// NEEDED IMPORTS
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { NodeClass } from "../Models/NodeDefined";
import { decrypttoken } from "../controllers/DecryptJwt-controller";
import { NodeModel } from "../Schema/NodeDBSchema";

const CreateNode = asyncHandler(async (req: Request, res: Response) => {
  const { DataMajor, ConnectionType } = req.body;
  const UserId = decrypttoken(res.header("Authorization"));
  // Creates a NewNode based off the class and given data above
  const NewNode = new NodeClass(UserId, DataMajor, ConnectionType);
  // Save the new node to MongoDB using the NodeModel
  const savedNode = await NodeModel.create(NewNode);
  savedNode.save();
  console.log("Object saved to MongoDB:", savedNode);
  res.json(savedNode);
});

// router.post("/create", async (req: Request, res: Response) => {
//   try {
//     // Grabs data from the request body and find the current UserId of the user logged in
//     const { DataMajor, ConnectionType } = req.body;
//     const UserId = decrypttoken(res.header("Authorization"));
//     // Creates a NewNode based off the class and given data above
//     const NewNode = new NodeClass(UserId, DataMajor, ConnectionType);
//     // Save the new node to MongoDB using the NodeModel
//     const savedNode = await NodeModel.create(NewNode);
//     console.log("Object saved to MongoDB:", savedNode);
//     res.json(savedNode);
//   } catch (error) {
//     console.error("Error saving object:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

export { CreateNode };
