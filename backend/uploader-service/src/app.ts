import { v1UploaderRouter } from "./routes/upload-file-routes";

import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { logger } from "./middleware/log-events";
import { corsOptions } from "./config/cors-options";
import { credentials } from "./middleware/credentials";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handlers";

const app = express();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/uploader", v1UploaderRouter);

app.all("*", () => {
  const message = "The route that you have requested does not exist";
  throw new NotFoundError(message);
});

export { app };
