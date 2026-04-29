import type { Response } from "express";

export const UnAuthenticated = (res: Response) => {
  return res.status(401).json({ message: "You are not authenticated, please login to continue" });
};
