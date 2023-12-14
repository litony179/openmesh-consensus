import express, { Request, Response } from 'express';
import { NodeClass } from '../Models/NodeDefined';

const router = express.Router();

router.post('/create', (req: Request, res: Response) => {
    const { UserId, DataMajor, ConnectionType} = req.body;

    const NewNode = new NodeClass(UserId, DataMajor, ConnectionType);

    
});