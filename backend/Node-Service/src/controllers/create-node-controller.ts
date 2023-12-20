// NEEDED IMPORTS
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Node } from "../Models/NodeDefined";
import { nodeCreateSchema } from "../Schema/node-schema";
import { RequestValidationError } from "../errors/request-validation-error";
import { logEvents } from "../middleware/log-events";

const CreateNode = asyncHandler(async (req: Request, res: Response) => {
  // Validating request data
  const authenticateNodeData = nodeCreateSchema.safeParse(req.body);

  if (!authenticateNodeData.success) {
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
        authenticateNodeData.error.issues
      )}`,
      "error.txt"
    );
    throw new RequestValidationError(authenticateNodeData.error.issues);
  }

  // // Parse the cookie to get the JWT token
  // const cookies = req.headers.cookie;
  // // console.log(req.headers.cookie);
  // if (!cookies) {
  //   console.error("No cookies provided");
  //   res.status(400).json({ error: "No cookies provided" });
  //   return;
  // }

  // const jwtTokenCookie = cookies
  //   .split("; ")
  //   .find((cookie) => cookie.startsWith("jwt="));
  // if (!jwtTokenCookie) {
  //   console.error("JWT token not found in the cookie");
  //   res.status(400).json({ error: "No cookies provided" });
  //   return;
  // }

  // const jwtToken = jwtTokenCookie.substring("jwt=".length);
  // // Decode the JWT token to get the payload
  // const decodedToken = jwt.decode(jwtToken, { complete: true });
  // // Check if decoding was successful and the payload exists
  // if (
  //   !decodedToken ||
  //   typeof decodedToken === "string" ||
  //   !decodedToken.payload
  // ) {
  //   console.error("Invalid JWT token");
  //   res.status(400).json({ error: "Invalid JWT token" });
  //   return;
  // }

  // // Extract userId from the payload with proper checks
  // const userId = (decodedToken.payload as { UserInfo?: { userId: string } })
  //   ?.UserInfo?.userId;

  // // Check if userId is available
  // if (!userId) {
  //   console.error("Invalid UserId");
  //   res.status(400).json({ error: "Invalid UserId" });
  //   return;
  // }

  // Save the new node to MongoDB using the NodeModel
  const savedNode = await Node.create(req.body);
  savedNode.save();
  console.log("Object saved to MongoDB:", savedNode);
  res.status(200).json(savedNode);
});

export { CreateNode };
