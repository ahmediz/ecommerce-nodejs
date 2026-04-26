import type { Response } from "express";

export const noContent = (res: Response) => {
  return res.status(204).json();
};
