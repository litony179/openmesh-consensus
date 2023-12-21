import { format } from "date-fns";
import { v4 } from "uuid";

import fs, { promises as fsPromises } from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

const logEvents = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), "dd/MM/yyyy HH:mm:ss.SSS")}`;
  const logItem = `[${dateTime}]\t${v4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

export { logEvents, logger };
