// NEEDED IMPORTS
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { NodeClass } from "../Models/NodeDefined";
import { NodeModel } from "../Schema/NodeDBSchema";

const CreateNode = asyncHandler(async (req: Request, res: Response) => {
  const { DataMajor, ConnectionType } = req.body;
  
  // Parse the cookie to get the JWT token
  const cookies = req.headers.cookie;
  // console.log(req.headers.cookie);
  if (!cookies) {
    console.error("No cookies provided");
    res.status(400).json({ error: "No cookies provided" });
    return;
  }

  const jwtTokenCookie = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("jwt="));
  if (!jwtTokenCookie) {
    console.error("JWT token not found in the cookie");
    res.status(400).json({ error: "No cookies provided" });
    return;
  }

  const jwtToken = jwtTokenCookie.substring("jwt=".length);
  // console.log("jwtToken", jwtToken);

  // Decode the JWT token to get the payload
  const decodedToken = jwt.decode(jwtToken, { complete: true });
  // console.log("Decoded Token", decodedToken);

  // Check if decoding was successful and the payload exists
  if (
    !decodedToken ||
    typeof decodedToken === "string" ||
    !decodedToken.payload
  ) {
    console.error("Invalid JWT token");
    res.status(400).json({ error: "Invalid JWT token" });
    return;
  }

  // Extract userId from the payload with proper checks
  const userId = (decodedToken.payload as { UserInfo?: { userId: string } })
    ?.UserInfo?.userId;

  // Check if userId is available
  if (!userId) {
    console.error("Invalid UserId");
    res.status(400).json({ error: "Invalid UserId" });
    return;
  }

  // Creates a NewNode based off the class and given data above
  const NewNode = new NodeClass(userId, DataMajor, ConnectionType);
  // Save the new node to MongoDB using the NodeModel
  const savedNode = await NodeModel.create(NewNode);
  savedNode.save();
  console.log("Object saved to MongoDB:", savedNode);
  res.status(200).json(savedNode);
});

export { CreateNode };
