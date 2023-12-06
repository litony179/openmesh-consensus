import { app } from "./app";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import "dotenv/config";

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const server = async () => {
  if (process.env.NODE_ENV === "dev") {
    if (!MONGODB_CONNECTION_STRING) {
      throw new Error("MONGODB_CONNECTION_STRING not defined");
    }

    try {
      console.log("connecting to mongodb...");
      await mongoose.connect(MONGODB_CONNECTION_STRING as string);
      console.log("connected to mongodb :)");
    } catch (error) {
      console.log("There is an error in connecting to mongoDb");
      console.error(error);
    }

    app.listen(PORT, () => {
      console.log(`V1 Server running on port ${PORT} running in dev mode`);
    });
  }

  if (process.env.NODE_ENV === "integrated") {
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(
        `V1 Server running on port ${PORT} running in local-integrated mode`
      );
    });
  }
};

server();
