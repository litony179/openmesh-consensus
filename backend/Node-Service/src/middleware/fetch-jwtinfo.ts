import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const fetchjwtinfo = (req: Request, res: Response): string | undefined => {
  const cookies = req.headers.cookie; // Get cookies from the request

  const jwtTokenCookie = cookies
    ? cookies.split("; ").find((cookie) => cookie.startsWith("jwt="))
    : undefined;

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

  // Do something with userId or return it
  return userId;
};