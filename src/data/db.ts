import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env["DATABASE_URL"],
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });


const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Disconnected from database");
  } catch (error) {
    console.error("Error disconnecting from database", error);
    process.exit(1);
  }
};

export { prisma, connectDB, disconnectDB };