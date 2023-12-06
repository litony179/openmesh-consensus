import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import "dotenv/config";
import { logEvents } from "../middleware/log-events";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { UserService } from "../services/users";
import { userOtpVerificationSchema } from "../schemas/otp-schema";
import { PasswordGenerator } from "../services/password";

const verifyOTPHandler = asyncHandler(async (req: Request, res: Response) => {
  // Validating request data
  const userOtpRequest = userOtpVerificationSchema.safeParse(req.body);
  const currentTime = new Date().getTime();

  if (!userOtpRequest.success) {
    logEvents(
      `${req.method}\t${req.headers.origin}\t${req.url}\t${JSON.stringify(
        userOtpRequest.error.issues
      )}`,
      "error.txt"
    );
    throw new RequestValidationError(userOtpRequest.error.issues);
  }

  const user = userOtpRequest.data;

  // Checking for existing user in database
  const existingUser = await UserService.getUserByEmail(user.userEmail);

  if (!existingUser) {
    const methodName = "getUserByOtp";
    const message = "User does not exist. Please register.";
    logEvents(
      `${req.method}\t${req.headers.origin}\t${methodName}\t${message}`,
      "error.txt"
    );
    throw new BadRequestError(message);
  }

  console.log("stored OTP: ", existingUser.userOtp);
  console.log("request OTP", user.userOtp);

  // Checking if OTP is valid
  if (existingUser.userOtpExpireAt && existingUser.userOtp) {
    if (existingUser.userOtpExpireAt < currentTime) {
      const methodName = "verifyOtpHandler";
      const message = "OTP has expired. Please generate a new OTP.";
      logEvents(
        `${req.method}\t${req.headers.origin}\t${methodName}\t${message}`,
        "error.txt"
      );
      throw new BadRequestError(message);
    }

    const isOtpValid = await PasswordGenerator.compare(
      existingUser.userOtp,
      user.userOtp
    );

    if (!isOtpValid) {
      const methodName = "verifyOtpHandler";
      const message = "OTP is invalid. Please try again.";
      logEvents(
        `${req.method}\t${req.headers.origin}\t${methodName}\t${message}`,
        "error.txt"
      );
      throw new BadRequestError(message);
    }
  }

  // Updating user's OTP verification status
  await UserService.updateUserField(user.userEmail, "userOtpVerified", true);

  res.status(200).send("Successfully verified OTP.");
});

export { verifyOTPHandler };
