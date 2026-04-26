import { prisma } from "../data/db";
import type { Request, Response } from "express";
import { ApiResponse } from "../models/api-response.model";
import { Brand } from "@prisma/client";
import { success } from "../utils/success";
import { badRequest } from "../utils/badRequest";

export const getBrands = async (_: Request, res: Response) => {
  const brands = await prisma.brand.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const response: ApiResponse<Brand[]> = {
    result: brands,
  };
  return success(res, response);
};

export const createBrand = async (req: Request, res: Response) => {
  const { name } = req.body;

  const existingBrand = await prisma.brand.findFirst({
    where: { name },
  });
  if (existingBrand) {
    return badRequest(res, "Brand already exists");
  }

  const brand = await prisma.brand.create({
    data: {
      name,
    },
  });

  const response: ApiResponse<Brand> = {
    result: brand,
  };
  return success(res, response);
};

export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await prisma.brand.update({
    where: { id: id as string },
    data: { name },
  });

  const response: ApiResponse<Brand> = {
    result: brand,
  };
  return success(res, response);
};

export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.brand.delete({
    where: { id: id as string },
  });

  return success(res, { message: "Brand deleted successfully" });
};
