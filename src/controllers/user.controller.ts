import { User } from "@prisma/client";
import { prisma } from "../data/db";
import type {Request, Response} from 'express';
import { notFound } from "../utils/notFound";
import { success } from "../utils/success";
import { ApiResponse } from "../models/api-response.model";

export const getUser = async (req: Request, res: Response) => {
  const userId = ((req as any).user as User).id
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return notFound(res, "User not found");
  }
  const response: ApiResponse<User> = {
    result: user,
  };
  return success(res, response);
};