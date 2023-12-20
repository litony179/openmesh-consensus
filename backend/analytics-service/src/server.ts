import { app } from "./app";
import mongoose from "mongoose";

import "dotenv/config";

const PORT = process.env.PORT;

const server = async () => {
  if (process.env.NODE_ENV === "dev") {
    app.listen(PORT, () => {
      console.log(`V1 Server running on port ${PORT} running in dev mode`);
    });
  }
};

server();
