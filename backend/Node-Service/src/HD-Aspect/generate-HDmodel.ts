import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generatekey } from "./generate-master";

const generatekey = asyncHandler(async (req: Request, res: Response) => {

  // Derive child keys
  const childKey1 = hdkey.derive("m/0'/0/1");
  const childKey2 = hdkey.derive("m/0'/0/2");

  // Display public keys
  console.log("HD private key:", hdkey.publicKey.toString("hex"));
  console.log("Child 1 Public Key:", childKey1.publicKey.toString("hex"));
  console.log("Child 2 Public Key:", childKey2.publicKey.toString("hex"));
  console.log("Child 1 Private Key:", childKey1.privateKey.toString("hex"));
  console.log("Child 2 Private Key:", childKey2.privateKey.toString("hex"));
});

export { generatekey };