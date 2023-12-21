import express, { Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';
import { NodeRouter } from "./Router/NodeRouter";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/api/node/noderouter", NodeRouter);

export { app }; 