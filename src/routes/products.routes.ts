import express from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/products.controller";
import { isAdminMiddleware } from "../middlewares/is-admin.middleware";
import { validateRequestMiddleware } from "../middlewares/validate-request.middleware";
import { addProductSchema } from "../validators/products.validator";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", isAdminMiddleware, validateRequestMiddleware(addProductSchema), createProduct);
router.put("/:id", isAdminMiddleware, validateRequestMiddleware(addProductSchema), updateProduct);
router.delete("/:id", isAdminMiddleware, deleteProduct);

export default router;
