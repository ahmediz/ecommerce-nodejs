import { prisma } from "../data/db";
import jwt from "jsonwebtoken";

export const getUserFromToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env["JWT_SECRET"]!) as {
    id: string;
  };
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });
  return user;
};

export const isAdmin = async (token: string) => {
  const user = await getUserFromToken(token);
  return user?.role === "ADMIN";
};
