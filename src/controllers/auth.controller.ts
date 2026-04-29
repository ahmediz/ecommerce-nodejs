import type { Request, Response } from "express";
import { prisma } from "../data/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { success } from "../utils/success";
import { User } from "@prisma/client";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  // check if user already exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return res
    .status(200)
    .json({ message: "User created successfully", user: newUser });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check if user already exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id, res);

  return res.status(200).json({
    token,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      id: user.id,
    } as Omit<User, "password">,
  });
};

export const logout = async (_: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env["NODE_ENV"] === "production",
    maxAge: 0,
    sameSite: "strict",
  });
  return success(res, { message: "Logged out successfully" });
};
