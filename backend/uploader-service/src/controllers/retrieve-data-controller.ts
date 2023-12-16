// import { Request, Response } from "express";
// import asyncHandler from "express-async-handler";
// import {
//   retrieveData,
//   retrieveDataAsync,
// } from "../modules/retrieve/retrieve-data-functions";

// // const encryptDataHandler = asyncHandler(async (req: Request, res: Response) => {

// // });

// const retrieveDataHandler = (req: Request, res: Response) => {
//   // get -> retrieve -> return
//   let retrieved = retrieveData(req.body);
//   const stringified = JSON.stringify(retrieved);

//   res.send(stringified);
// };

// const retrieveAsyncHandler = asyncHandler(
//   async (req: Request, res: Response) => {
//     // get -> retrieve -> return
//     let retrieved = await retrieveDataAsync(req.body);
//     const stringified = JSON.stringify(retrieved);

//     res.send(stringified);
//   }
// );

// export { retrieveDataHandler, retrieveAsyncHandler };
