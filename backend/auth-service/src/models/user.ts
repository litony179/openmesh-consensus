import mongoose from "mongoose";
import { PasswordGenerator } from "../services/password";

// Properties that are required to create a User
interface UserFields {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  userRoles: Record<string, number>;
  userRefreshToken: string;
  userOtp: string | undefined;
  userOtpExpireAt: number | undefined;
  userOtpVerified: boolean | undefined;
}

// Properties that a user model requires
interface UserModel extends mongoose.Model<UserDocument> {
  build(fields: UserFields): UserDocument;
}

// Properties that the User document requires
interface UserDocument extends mongoose.Document {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  userRoles: Record<string, number>;
  userRefreshToken: string;
  userOtp: string | undefined;
  userOtpExpireAt: number | undefined;
  userOtpVerified: boolean | undefined;
}

const userSchema = new mongoose.Schema({
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPassword: { type: String, required: true },
  userRoles: { type: Object, required: true },
  userRefreshToken: { type: String, required: false },
  userOtp: { type: String, required: false },
  userOtpExpireAt: { type: Number, required: false },
  userOtpVerified: { type: Boolean, required: false },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("userPassword")) {
    const hashedPassword = await PasswordGenerator.hashPassword(
      this.get("userPassword")
    );
    this.set("userPassword", hashedPassword);
  }
  done();
});

// This is special mongoose ORM syntax to define custom helper functions
userSchema.statics.build = (fields: UserFields) => {
  return new User(fields);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
