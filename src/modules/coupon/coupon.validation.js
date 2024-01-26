import joi from "joi";
import { validationGeneralFields } from "../../utils/validationGeneralFields.js";

export const addCouponSchema = joi
  .object({
    name: joi.string().required(),
    amount: joi.number().positive().required(),
    expiresIn: joi.date().greater(new Date()).required(),
    file: validationGeneralFields.file.required(),
  })
  .required();
