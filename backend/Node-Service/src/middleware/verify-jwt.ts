import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { NotAuthorisedError } from "../errors/not-authorised-error";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userFirstName: string;
      userLastName: string;
      userEmail: string;
      userRoles: number[];
    }
  }
}
const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const cookieHeader = req.headers.cookie;

  console.log("Cookie Header:", cookieHeader);

  if (!cookieHeader || typeof cookieHeader !== "string") {
    console.error("Invalid or missing cookie header");
    throw new NotAuthorisedError();
  }

  const jwtCookie = cookieHeader
    .split("; ")
    .find((cookie) => cookie.startsWith("jwt="));

  if (!jwtCookie) {
    console.error("JWT token not found in the cookie");
    throw new NotAuthorisedError();
  }

  const jwttoken = jwtCookie.split("=")[1];

  console.log("JWT Token:", jwttoken);
  console.log("Access token universal", process.env.ACCESS_TOKEN_SECRET);
  const decodedToken = jwt.decode(jwttoken, { complete: true });
  console.log("Decoded Token", decodedToken);

  const SecretToken = decodedToken?.signature;
  console.log("SecretToken", SecretToken);

  jwt.verify(jwttoken, SecretToken!, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.userId = (user as JwtPayload).UserInfo.userId;
    req.userFirstName = (user as JwtPayload).UserInfo.userFirstName;
    req.userLastName = (user as JwtPayload).UserInfo.userLastName;
    req.userEmail = (user as JwtPayload).UserInfo.userEmail;
    req.userRoles = (user as JwtPayload).UserInfo.userRoles;
    next();
  });
  return decodedToken;
};

export { verifyJWT };
