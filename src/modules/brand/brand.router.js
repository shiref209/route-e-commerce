import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  addBrand,
  allBrands,
  oneBrand,
  updateBrand,
} from "./controllers/brand.controller.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { validation } from "../../middlewares/validation.js";
import {
  addBrandSchema,
  oneBrandSchema,
  updateBrandSchema,
} from "./brand.validation.js";

const brandRouter = Router();
brandRouter
  .post(
    "/",
    fileUpload(fileValidation.image).single("image"),
    validation(addBrandSchema),
    asyncHandler(addBrand)
  )
  .get("/", asyncHandler(allBrands))
  .get("/:brandId", validation(oneBrandSchema), asyncHandler(oneBrand))
  .patch(
    "/:brandId",
    fileUpload(fileValidation.image).single("image"),
    validation(updateBrandSchema),
    asyncHandler(updateBrand)
  );
export default brandRouter;
