import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { NodeModel } from "../Schema/NodeDBSchema";
import { decryptToken } from "./DecryptJwt-controller";

/**
 @precondition nodeId is in the request parameter
 **/
const FetchNode = asyncHandler(async (req: Request, res: Response) => {
  const nodeId = req.params.nodeId;
  const userId = decryptToken(req.headers.cookie);

  const node = await NodeModel.findById(nodeId);
  res.json(node);
}); 

// router.post("Fetch Node", async (req: Request, res: Response) => {
//   try {
//     const nodeId = req.params.nodeId;
//     const userId = decrypttoken(res.header("Authorization"));

//     const node = await NodeModel.findById(nodeId);

//     if(!node){
//         return res.status(400).json({error: "Node not found"});
//     }

//     if(node.UserId != String(userId)){
//         return res.status(403).json({error: "Unauthorized"})
//     }

//     res.json(node);
//   }catch (error){
//     console.error(error);
//     res.status(500).json({error: "Internal Server error"});
//   }
// });

export { FetchNode };
