import jwt from "jsonwebtoken";
import type { Response } from "express";
export const generateToken = (userId: string, res: Response) => {
  const payload = {
    id: userId,
  };
  const token = jwt.sign(payload, process.env["JWT_SECRET"]!, {
    expiresIn: process.env["JWT_EXPIRES_IN"] || "7d",
  } as jwt.SignOptions);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env["NODE_ENV"] === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    // sameSite: "strict",
  });

  return token;
};
