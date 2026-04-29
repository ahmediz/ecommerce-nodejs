import { NextFunction, type Request, type Response } from "express";
import { boolean, ZodSchema } from "zod";
import { badRequest } from "../utils/badRequest";
export const validateRequestMiddleware = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formattedErrors = result.error.format();
      const error = Object.values(formattedErrors)
        .flat()
        .filter(boolean)
        .map((error) => error._errors)
        .flat()
        .join(", ");
      return badRequest(res, error);
    }
    return next();
  };
};
