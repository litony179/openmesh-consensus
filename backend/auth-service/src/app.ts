import express from "express";
import cors from "cors";
import { logger } from "./middleware/log-events";
import { corsOptions } from "../config/cors-options";
import cookieParser from "cookie-parser";
import { credentials } from "./middleware/credentials";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handlers";
import { v1AuthenticationRouter } from "./v1/routes/authentication-routes";

const app = express();

// Custom logger
app.use(logger);

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users/v1/authentication", v1AuthenticationRouter);

app.all("*", () => {
  const message = "The route that you have requested does not exist";
  throw new NotFoundError(message);
});

app.use(errorHandler);

export { app };
