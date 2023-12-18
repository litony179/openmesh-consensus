import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { FetchNode } from "./FetchNode-controller";
import { NodeModel } from "../Schema/NodeDBSchema";

const UpdateNode = asyncHandler(async (req: Request, res: Response) => {
    const { DataMajor, ConnectionType } = req.body;

    const node = await NodeModel.findByIdAndUpdate(FetchNode, DataMajor, ConnectionType);
    res.json(node);
});

export {UpdateNode}; 