import { NextFunction, type Request, type Response } from "express";
import { UnAuthenticated } from "../utils/UnAuthenticated";
import { getUserFromToken } from "../utils/token-claims";

export const authMiddleware = async (
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


  try {
    const user = await getUserFromToken(token);
    (req as any).user = user;
    return next();
  } catch (error) {
    return UnAuthenticated(res);
  }
};
