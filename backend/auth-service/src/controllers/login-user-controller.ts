import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import "dotenv/config";

import {
  loginuserRequestSchema,
  loginuserResponse,
} from "../schemas/login-user-schema";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { NotAuthorisedError } from "../errors/not-authorised-error";
import { UserService } from "../services/users";
import { logEvents } from "../middleware/log-events";
import { PasswordGenerator } from "../services/password";

const loginuserHandler = asyncHandler(async (req: Request, res: Response) => {
  // Validating request data
  const authenticateUserData = loginuserRequestSchema.safeParse(req.body);

  if (!authenticateUserData.success) {
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
        authenticateUserData.error.issues
      )}`,
      "error.txt"
    );
    throw new RequestValidationError(authenticateUserData.error.issues);
  }

  const authenticateUser = authenticateUserData.data;

  // Checking for existing user in database
  const existingUser = await UserService.getUserByEmail(
    authenticateUser.userEmail
  );

  if (!existingUser) {
    const methodName = "loginuser";
    const message = "User does not exist. Please register.";
    logEvents(
      `${req.method}\t${req.headers.origin}\t${methodName}\t${message}`,
      "error.txt"
    );
    throw new BadRequestError(message);
  }

  // Check if password matches
  const passwordMatch = await PasswordGenerator.compare(
    existingUser.userPassword,
    authenticateUser.userPassword
  );

  if (!passwordMatch) {
    const methodName = "loginuser";
    const message = "Invalid password.";
    logEvents(
      `${req.method}\t${req.headers.origin}\t${methodName}\t${message}`,
      "error.txt"
    );
    throw new NotAuthorisedError();
  }

  const userRoles = Object.values(existingUser.userRoles);

  // Generate JWT
  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: existingUser._id,
        userFirstName: existingUser.userFirstName,
        userLastName: existingUser.userLastName,
        userEmail: existingUser.userEmail,
        userRoles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET
      ? process.env.ACCESS_TOKEN_SECRET
      : "secret",
    { expiresIn: process.env.ACCESS_TOKEN_LIFE }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    {
      UserInfo: {
        userId: existingUser._id,
        userFirstName: existingUser.userFirstName,
        userLastName: existingUser.userLastName,
        userEmail: existingUser.userEmail,
        userRoles,
      },
    },
    process.env.REFRESH_TOKEN_SECRET
      ? process.env.REFRESH_TOKEN_SECRET
      : "secret",
    { expiresIn: process.env.REFRESH_TOKEN_LIFE }
  );

  await UserService.updateUserField(
    existingUser.userEmail,
    "userRefreshToken",
    refreshToken
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test",
    maxAge: 24 * 60 * 60 * 1000, // 1 Day
  });

  const authenticatedUserResponse: loginuserResponse = {
    userAccessToken: accessToken,
  };

  res.status(200).send(authenticatedUserResponse);
});

export { loginuserHandler };
