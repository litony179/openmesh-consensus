import { User } from "../models/user";
import { registeruser } from "../schemas/register-user-schema";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";

export class UserService {
  static async getUserByEmail(userEmail: string) {
    const existingUser = await User.findOne({ userEmail: userEmail });
    const responseUser = existingUser?.toJSON();
    return responseUser;
  }

  static async getUserByRefreshToken(userRefreshToken: string) {
    const existingUser = await User.findOne({
      userRefreshToken: userRefreshToken,
    });
    const responseUser = existingUser?.toJSON();
    return responseUser;
  }

  static async getUserByOtp(userOtp: string) {
    const existingUser = await User.findOne({ userOtp: userOtp });
    const responseUser = existingUser?.toJSON();
    return responseUser;
  }

  static async createUser(user: registeruser, refreshToken: string) {
    const newUser = User.build({
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRefreshToken: refreshToken,
      userRoles: user.userRoles,
      userOtp: undefined,
      userOtpExpireAt: undefined,
      userOtpVerified: undefined,
    });

    return await newUser.save();
  }

  static async updateUserField(
    userEmail: string,
    field: string,
    value: string | boolean | number | Record<string, number>
  ) {
    const user = await User.findOne({ userEmail: userEmail });
    if (!user) {
      throw new NotFoundError("User does not exist.");
    }

    user.set(field, value);
    await user.save();
    return user;
  }

  static async deleteRefreshTokenByUser(refreshToken: string) {
    const user = await User.findOne({ userRefreshToken: refreshToken });

    if (!user) {
      throw new NotFoundError("User does not exist.");
    }

    await User.findOneAndUpdate(
      { userEmail: user?.userEmail },
      { userRefreshToken: "" }
    );

    const loggedOutUser = await User.findOne({
      userEmail: user?.userEmail,
    });

    if (!loggedOutUser) {
      throw new BadRequestError("Uable to log the user out");
    }

    return loggedOutUser.toJSON();
  }
}
