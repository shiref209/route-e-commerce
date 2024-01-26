import joi from 'joi';
import { validationGeneralFields } from '../../utils/validationGeneralFields.js';

export const signUpSchema=joi.object({
    userName:joi.string().min(3).max(20).required(),
    email:validationGeneralFields.email,
    password:validationGeneralFields.password,
    cpassword:joi.ref('password'),
}).required()