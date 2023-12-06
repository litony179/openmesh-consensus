import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserService } from "../services/users";
import "dotenv/config";
import { NotAuthorisedError } from "../errors/not-authorised-error";

const refreshTokenHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      throw new NotAuthorisedError();
    }

    const userRefreshToken = cookies.jwt;

    const foundUser = await UserService.getUserByRefreshToken(userRefreshToken);
    if (!foundUser) {
      throw new NotAuthorisedError();
    }

    jwt.verify(
      userRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      (err: any, user: any) => {
        if (err || foundUser.userEmail !== user.UserInfo.userEmail) {
          return res.sendStatus(403);
        }

        const userRoles = Object.values(foundUser.userRoles);

        const accessToken = jwt.sign(
          {
            UserInfo: {
              userId: user._id,
              userFirstName: user.userFirstName,
              userLastName: user.userLastName,
              userEmail: user.userEmail,
              userRoles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: process.env.ACCESS_TOKEN_LIFE }
        );
        res.status(200).json({ accessToken: accessToken });
      }
    );
  }
);

export { refreshTokenHandler };
