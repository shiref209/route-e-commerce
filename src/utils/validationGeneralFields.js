import joi from "joi";
import { Types } from "mongoose";

export const validateObjectId = (id, helper) => {
  return Types.ObjectId.isValid(id)
    ? true
    : helper.message("invalid object id");
};

export const validationGeneralFields = {
  email: joi
    .string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")).required(),
  id: joi.string().custom(validateObjectId).required(),
  file: joi
    .object({
      size: joi.number().positive().required(),
      path: joi.string().required(),
      filename: joi.string().required(),
      destination: joi.string().required(),
      mimetype: joi.string().required(),
      encoding: joi.string().required(),
      originalname: joi.string().required(),
      fieldname: joi.string().required(),
    })
    .required(),
};
