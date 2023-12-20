import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const DeleteNode = asyncHandler(async (req: Request, res: Response) => {
  // Parse the cookie to get the JWT token
  const cookies = req.headers.cookie;

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

  // Decode the JWT token to get the payload
  const decodedToken = jwt.decode(jwtToken, { complete: true });

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
  try {
    // Log the userId before attempting deletion
    console.log("Deleting nodes for userId:", userId);
  
    // Deletes all nodes based on the userId
    const deleteNodes = await NodeModel.deleteMany({ UserId: userId });
  
    // Log the result of the deleteMany operation
    console.log("Delete Result:", deleteNodes);
  
    // Allows us to understand if nodes have been deleted by displaying text in terminal
    if (deleteNodes.deletedCount > 0) {
      console.log("Nodes deleted successfully");
      res.json({ message: "Nodes deleted successfully" });
    } else {
      console.log("No nodes found or not authorized for deletion");
      res.status(404).json({ error: "No nodes found or not authorized for deletion" });
    }
  } catch (error) {
    console.error("Error deleting nodes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { DeleteNode };

