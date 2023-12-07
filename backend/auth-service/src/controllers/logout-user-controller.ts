import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "../services/users";
import "dotenv/config";
import { NotFoundError } from "../errors/not-found-error";

const logoutHandler = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    throw new NotFoundError("JWT cookie not found");
  }

  const userRefreshToken = cookies.jwt;

  // is refreshToken valid?
  const foundUser = await UserService.getUserByRefreshToken(userRefreshToken);
  if (!foundUser) {
    throw new NotFoundError("User not found");
  }

  // delete refreshToken from user
  const loggedOutUser = await UserService.deleteRefreshTokenByUser(
    userRefreshToken
  );

  console.log(loggedOutUser);

  // clear refreshToken cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test",
  });

  res.status(200).json({ message: "User logged out" });
});

export { logoutHandler };
