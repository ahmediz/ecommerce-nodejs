import jwt from "jsonwebtoken";
export const generateToken = (userId: string) => {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, process.env["JWT_SECRET"]!, {
    expiresIn: process.env["JWT_EXPIRES_IN"] || "7d",
  } as jwt.SignOptions);
};
