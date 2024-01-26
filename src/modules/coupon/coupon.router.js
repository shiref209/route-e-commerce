import { Router } from "express";
import { addCoupon } from "./controllers/coupon.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { validation } from "../../middlewares/validation.js";
import { addCouponSchema } from "./coupon.validation.js";

const couponRouter = Router();

couponRouter.post(
  "/",
  fileUpload(fileValidation.image).single("image"),
  validation(addCouponSchema),
  asyncHandler(addCoupon)
);

export default couponRouter;
