import joi from "joi";
import { validationGeneralFields } from "../../utils/validationGeneralFields.js";

export const addCategorySchema = joi
  .object({
    name: joi.string().min(3).max(20).trim().required(),
    description: joi.string(),
    file: validationGeneralFields.file,
  })
  .required();

export const oneCategorySchema = joi
  .object({
    categoryId: validationGeneralFields.id,
  })
  .required()
  .messages({
    custom: "invalid category id",
  });

export const updateCategorySchema = joi
  .object({
    name: joi.string().min(3).max(20).trim(),
    file: validationGeneralFields.file,
    categoryId: validationGeneralFields.id,
  })
  .required();
