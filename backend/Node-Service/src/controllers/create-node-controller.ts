// NEEDED IMPORTS
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { NodeModel } from "../Models/NodeDefined";
import { nodeCreateSchema } from "../Schema/node-schema";
import { RequestValidationError } from "../errors/request-validation-error";
import { logEvents } from "../middleware/log-events";

const CreateNode = asyncHandler(async (req: Request, res: Response) => {
  // Validating request data
  const authenticateNodeData = nodeCreateSchema.safeParse(req.body);
  console.log("Request Body:", req.body);
  if (!authenticateNodeData.success) {
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
        authenticateNodeData.error.issues
      )}`,
      "error.txt"
    );
    throw new RequestValidationError(authenticateNodeData.error.issues);
  }
  const userId = req.body.userId;
  const dataType = req.body.dataType;
  const 

  // Save the new node to MongoDB using the NodeModel
  const savedNode = await NodeModel.create(req.body);
  savedNode.save();
  console.log("Object saved to MongoDB:", savedNode);
  res.status(200).json(savedNode);
});

export { CreateNode };
