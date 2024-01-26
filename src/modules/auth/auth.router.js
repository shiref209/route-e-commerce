import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { signUp } from "./controllers/auth.controller.js";
import { validation } from "../../middlewares/validation.js";
import { signUpSchema } from "./auth.validation.js";

const authRouter = Router();

authRouter
  .post("/sign-up", validation(signUpSchema), asyncHandler(signUp))
  .get("/confirm-email");

export default authRouter;
