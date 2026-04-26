import type { Response } from "express";

export const success = (res: Response, response: any) => {
  return res.status(200).json(response);
};