import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  addCategory,
  allCategories,
  oneCategory,
  updateCategory,
} from "./controllers/category.controller.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import subCategoryRouter from "../subcategory/subcategory.router.js";
import { validation } from "../../middlewares/validation.js";
import {
  addCategorySchema,
  oneCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";

const categoryRouter = Router();
categoryRouter.use("/:categoryId/subcategory", subCategoryRouter);
categoryRouter
  .post(
    "/",
    fileUpload(fileValidation.image).single("image"),
    validation(addCategorySchema),
    asyncHandler(addCategory)
  )
  .get("/", asyncHandler(allCategories))
  .get("/:categoryId", validation(oneCategorySchema), asyncHandler(oneCategory))
  .patch(
    "/:categoryId",
    fileUpload(fileValidation.image).single("image"),
    validation(updateCategorySchema),

    asyncHandler(updateCategory)
  );
export default categoryRouter;
