import type { Response } from "express";

export const unAuthorized = (res: Response) => {
  return res.status(401).json({ message: "You don't have permission to access this resource" });
};
