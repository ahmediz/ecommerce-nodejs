import { prisma } from "../data/db";
import type { Request, Response } from "express";
import { ApiResponse } from "../models/api-response.model";
import { Category } from "@prisma/client";
import { success } from "../utils/success";
import { badRequest } from "../utils/badRequest";

export const getCategories = async (_: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const response: ApiResponse<Category[]> = {
    result: categories,
  };
  return success(res, response);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  // check if category already exists
  const existingCategory = await prisma.category.findFirst({
    where: { name },
  });
  if (existingCategory) {
    return badRequest(res, "Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  const response: ApiResponse<Category> = {
    result: category,
  };
  return success(res, response);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await prisma.category.update({
    where: { id: id as string },
    data: { name },
  });

  const response: ApiResponse<Category> = {
    result: category,
  };
  return success(res, response);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.category.delete({
    where: { id: id as string },
  });

  return success(res, { message: "Category deleted successfully" });
};
