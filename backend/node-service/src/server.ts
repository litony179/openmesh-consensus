import { app } from "./app";
import mongoose from "mongoose";
import "dotenv/config";

import { SnsService } from "./services/sns";
import { awsConfig } from "../config/aws-config";
const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const NODE_CREATED_TOPIC = process.env.NODE_CREATED_TOPIC;

const server = async () => {
  if (process.env.NODE_ENV === "dev") {
    if (!MONGODB_CONNECTION_STRING) {
      throw new Error("MONGODB_CONNECTION_STRING not defined");
    }

    if (!PORT) {
      throw new Error("PORT not defined");
    }

    if (!NODE_CREATED_TOPIC) {
      throw new Error("NODE_CREATED_TOPIC not defined");
    }

    try {
      console.log("connecting to mongodb...");
      await mongoose.connect(MONGODB_CONNECTION_STRING as string);
      console.log("connected to mongodb :)");
    } catch (error) {
      console.log("There is an error in connecting to mongoDb");
      console.error(error);
    }

    // create SNS topic
    const nodeCreatedSnsTopic = await SnsService.createSnsTopic(
      awsConfig,
      NODE_CREATED_TOPIC
    );

    console.log(nodeCreatedSnsTopic);

    // create SQS queue

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
