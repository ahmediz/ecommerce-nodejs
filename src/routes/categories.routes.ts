import express from "express";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categories.controller";
import { getCategories } from "../controllers/categories.controller";
import { isAdminMiddleware } from "../middlewares/is-admin.middleware";
import { validateRequestMiddleware } from "../middlewares/validate-request.middleware";
import {
  addCategorySchema
} from "../validators/categories.validator";
const router = express.Router();

router.get("/", getCategories);
router.post(
  "/",
  isAdminMiddleware,
  validateRequestMiddleware(addCategorySchema),
  createCategory,
);
router.put(
  "/:id",
  isAdminMiddleware,
  validateRequestMiddleware(addCategorySchema),
  updateCategory,
);
router.delete("/:id", isAdminMiddleware, deleteCategory);

export default router;
