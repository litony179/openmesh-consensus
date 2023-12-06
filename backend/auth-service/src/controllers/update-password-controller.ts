import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { userPasswordUpdateSchema } from "../schemas/otp-schema";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { logEvents } from "../middleware/log-events";
import { UserService } from "../services/users";
import { PasswordGenerator } from "../services/password";

const updatePasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    // Retrieving request for verificatrion
    const passwordUpdateRequestData = userPasswordUpdateSchema.safeParse(
      req.body
    );

    if (!passwordUpdateRequestData.success) {
      logEvents(
        `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
          passwordUpdateRequestData.error.issues
        )}`,
        "error.txt"
      );
      throw new RequestValidationError(passwordUpdateRequestData.error.issues);
    }

    const existingUserData = passwordUpdateRequestData.data;

    // Checking for existing user
    const existingUser = await UserService.getUserByEmail(
      existingUserData.userEmail
    );

    if (!existingUser) {
      const methodName = "updatePassword";
      const message = "User does not exist. Please register.";
      logEvents(
        `${req.method}\t${req.headers.origin}\t${methodName}\t${message}`,
        "error.txt"
      );
      throw new BadRequestError("The user does not exist. Please register.");
    }

    // Generating hashed password
    const userPassword = await PasswordGenerator.hashPassword(
      existingUserData.userPassword
    );

    // Updating user's password
    await UserService.updateUserField(
      existingUser.userEmail,
      "userPassword",
      userPassword
    );

    // Generate JWT
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: existingUser._id,
          userFirstName: existingUser.userFirstName,
          userLastName: existingUser.userLastName,
          userEmail: existingUser.userEmail,
          userRoles: existingUser.userRoles,
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
          userRoles: existingUser.userRoles,
        },
      },
      process.env.REFRESH_TOKEN_SECRET
        ? process.env.REFRESH_TOKEN_SECRET
        : "secret",
      { expiresIn: process.env.REFRESH_TOKEN_LIFE }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure:
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "test",
      maxAge: 24 * 60 * 60 * 1000, // 1 Day
    });

    const updateUserPasswordResponse = {
      userAccessToken: accessToken,
    };

    res.status(200).send(updateUserPasswordResponse);
  }
);

export { updatePasswordController };
