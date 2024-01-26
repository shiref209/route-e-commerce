import { Router } from "express";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { createSubCategory } from "./controllers/subcategory.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
const subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter.post(
  "/",
  fileUpload(fileValidation.image).single("image"),
  asyncHandler(createSubCategory)
);

export default subCategoryRouter;
