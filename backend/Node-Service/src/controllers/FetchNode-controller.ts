import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

/**
 @precondition nodeId is in the request parameter
 **/
const FetchNode = asyncHandler(async (req: Request, res: Response) => {
  const nodeId = req.params.nodeId;

  const node = await NodeModel.findById(nodeId);
  res.json(node);
}); 

export { FetchNode };
