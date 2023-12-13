import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { v1UploaderRouter } from './v1/routes/data_handle_routes';

const app = express();

app.use(cors());

app.use("/api/uploader/v1/encryption", v1UploaderRouter)

export { app };