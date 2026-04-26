import express from "express";
import { createBrand, deleteBrand, getBrands, updateBrand } from "../controllers/brands.controller";

const router = express.Router();

router.get("/", getBrands);
router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;
