import type { Response } from "express";

export const badRequest = (res: Response, message: string) => {
  return res.status(400).json({ message });
};
