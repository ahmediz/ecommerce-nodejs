import { NextFunction, type Request, type Response } from "express";
import { unAuthorized } from "../utils/unAuthorized";
import { isAdmin } from "../utils/token-claims";
import { UnAuthenticated } from "../utils/UnAuthenticated";

export const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]!;
  } else {
    token = req.cookies?.jwt ?? "";
  }

  if (!token) {
    return UnAuthenticated(res);
  }

  const isUserAdmin = await isAdmin(token);
  if (!isUserAdmin) {
    return unAuthorized(res);
  }
  return next();
};
