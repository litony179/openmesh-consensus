import { NotAuthorisedError } from "../errors/not-authorised-error";
import { Request, Response, NextFunction } from "express";

const verifyRoles = (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.userRoles) {
      throw new NotAuthorisedError();
    }

    const rolesArray = [...allowedRoles];
    req.userRoles.some((role) => {
      return rolesArray.includes(role);
    });

    next();
  };
};

export { verifyRoles };
