import joi from "joi";
import { validationGeneralFields } from "../../utils/validationGeneralFields.js";

export const addBrandSchema = joi
  .object({
    name: joi.string().min(3).max(20).trim().required(),
    description: joi.string(),
    file: validationGeneralFields.file,
  })
  .required();

export const oneBrandSchema = joi
  .object({
    brandId: validationGeneralFields.id,
  })
  .required()
  .messages({
    custom: "invalid brand id",
  });

export const updateBrandSchema = joi
  .object({
    name: joi.string().min(3).max(20).trim(),
    file: validationGeneralFields.file,
    brandId: validationGeneralFields.id,
  })
  .required();
