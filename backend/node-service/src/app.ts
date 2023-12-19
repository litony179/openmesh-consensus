import express from "express";
import cors from "cors";
import { logger } from "./middleware/log-events";
import { corsOptions } from "../config/cors-options";
import { errorHandler } from "./middleware/error-handlers";
import { NotFoundError } from "./errors/not-found-error";

import { nodeRouter } from "./routes/node-route";
import { credentials } from "./middleware/credentials";

const app = express();

// Custom logger
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/node", nodeRouter);

app.all("*", () => {
  const message = "The route that you have requested does not exist";
  throw new NotFoundError(message);
});

app.use(errorHandler);

export { app };
