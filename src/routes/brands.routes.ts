import express from "express";
import { createBrand, deleteBrand, getBrands, updateBrand } from "../controllers/brands.controller";
import { isAdminMiddleware } from "../middlewares/is-admin.middleware";
import { validateRequestMiddleware } from "../middlewares/validate-request.middleware";
import { addBrandSchema } from "../validators/brands.validator";

const router = express.Router();

router.get("/", getBrands);
router.post("/", isAdminMiddleware, validateRequestMiddleware(addBrandSchema), createBrand);
router.put("/:id", isAdminMiddleware, validateRequestMiddleware(addBrandSchema), updateBrand);
router.delete("/:id", isAdminMiddleware, deleteBrand);

export default router;
