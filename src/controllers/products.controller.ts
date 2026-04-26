import { prisma } from "../data/db";
import type { Request, Response } from "express";
import {
  ApiResponse,
  ApiResponseWithPagination,
} from "../models/api-response.model";
import { Product } from "@prisma/client";
import { notFound } from "../utils/notFound";
import { success } from "../utils/success";
import { badRequest } from "../utils/badRequest";

export const getProducts = async (req: Request, res: Response) => {
  const { page = "1", limit = "10" } = req.query;
  const products = await prisma.product.findMany({
    skip: (parseInt(page as string) - 1) * parseInt(limit as string),
    take: parseInt(limit as string),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      brand: true,
      categories: true,
    },
  });
  const total = await prisma.product.count();
  const response: ApiResponseWithPagination<Product[]> = {
    result: products,
    total,
    page: parseInt(page as string),
    limit: parseInt(limit as string),
  };
  return success(res, response);
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params["id"];
  const product = await prisma.product.findUnique({
    where: { id: productId as string },
  });
  if (!product) {
    return notFound(res, "Product not found");
  }
  const response: ApiResponse<Product> = {
    result: product,
  };
  return success(res, response);
};

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    imageUrl,
    brandId,
    categories,
    availableStock,
    isActive,
  } = req.body;

  // check if product already exists
  const existingProduct = await prisma.product.findFirst({
    where: { name },
  });
  if (existingProduct) {
    return badRequest(res, "Product already exists");
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
      brandId,
      categories: {
        connect: categories.map((category: string) => ({ id: category })),
      },
      availableStock,
      isActive,
      reservedStock: 0,
    },
    include: {
      brand: true,
      categories: true,
    },
  });

  const response: ApiResponse<Product> = {
    result: product,
  };
  return success(res, response);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    imageUrl,
    brandId,
    categories,
    availableStock,
    isActive,
  } = req.body;

  const product = await prisma.product.update({
    where: { id: id as string },
    data: {
      name,
      description,
      price,
      imageUrl,
      brandId,
      categories: {
        connect: categories.map((category: string) => ({ id: category })),
      },
      availableStock,
      isActive,
    },
    include: {
      brand: true,
      categories: true,
    },
  });

  const response: ApiResponse<Product> = {
    result: product,
  };
  return success(res, response);
};


export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id: id as string },
  });

  return success(res, { message: "Product deleted successfully" });
};