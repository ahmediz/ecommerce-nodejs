import type { Response } from "express";

export const notFound = (res: Response, message: string) => {
  return res.status(404).json({ message });
};
