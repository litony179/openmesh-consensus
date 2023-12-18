import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import "dotenv/config";

import { Node } from "../models/node";
import { nodeSchema } from "../schemas/node-schema";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { logEvents } from "../middleware/log-events";

const createNodeHandler = asyncHandler(async (req: Request, res: Response) => {
  // Validating incoming request payload
  const responseData = nodeSchema.safeParse(req.body);
  if (!responseData.success) {
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
        responseData.error.issues
      )}`,
      "error.txt"
    );
    throw new RequestValidationError(responseData.error.issues);
  }

  const nodeData = responseData.data;

  // Create node
});

export { createNodeHandler };
