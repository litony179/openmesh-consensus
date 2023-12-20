import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/log-events";
import { credentials } from "./middleware/credentials";
import { corsOptions } from "../config/cors-options";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handlers";

const app = express();

app.use(logger);

app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.all("*", () => {
  const message = "The route that you have requested does not exist";
  throw new NotFoundError(message);
});

app.use(errorHandler);

export { app };
