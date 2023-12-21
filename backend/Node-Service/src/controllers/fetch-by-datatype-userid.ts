import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Node } from "../Models/NodeDefined";

/**
 * @precondition userId is in the request parameter
 **/
const FetchNodes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const dataType = req.body.dataType;

    // Assuming you have a "Node" model and you want to find all nodes by the user ID
    const nodes = await Node.find({ userId: userId, dataType: dataType });

    if (!nodes || nodes.length === 0) {
      res.status(404).json({ message: "No nodes found for the user" });
    }

    res.json(nodes);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
});

export { FetchNodes };
