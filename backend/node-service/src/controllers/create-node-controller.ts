import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import "dotenv/config";

import { Node } from "../models/node";
import { nodeSchema } from "../schemas/node-schema";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { logEvents } from "../middleware/log-events";
import { NodeService } from "../services/node-service";

const createNodeHandler = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  // Validating incoming request payload
  const responseNodeData = nodeSchema.safeParse(req.body);
  if (!responseNodeData.success) {
    console.log(responseNodeData.error.issues);
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
        responseNodeData.error.issues
      )}`,
      "error.txt"
    );

    throw new RequestValidationError(responseNodeData.error.issues);
  }

  const nodeData = responseNodeData.data;

  // Create node
  const createdNode = await NodeService.createNode(nodeData);
  if (!createdNode) {
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
        "Node not created"
      )}`,
      "error.txt"
    );

    throw new BadRequestError("Node not created");
  }

  // Send message that a node has been created

  res.status(201).json(createdNode);
});

export { createNodeHandler };
