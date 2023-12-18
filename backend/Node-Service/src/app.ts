import express, { Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

export { app }; 