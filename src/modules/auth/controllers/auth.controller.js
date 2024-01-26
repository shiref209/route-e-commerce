import userModel from "../../../../DB/models/user.model.js";
import { generateToken } from "../../../utils/generateAndVerifyToken.js";
import { hash } from "../../../utils/hashAndVerify.js";
import sendEmail from "../../../utils/sendEmail.js";

export const signUp = async (req, res, next) => {
  const { email } = req.body;
  const isFound = await userModel.findOne({ email });
  //   TODO::server crashes on conflict here
  if (isFound) {
    return next(new Error("Email already exists", { cause: 409 }));
  }
  const token = generateToken({
    payload: { email },
    signature: process.env.EMAIL_SIGNATURE,
    expiresIn: 60 * 60,
  });
  const rf_token = generateToken({
    payload: { email },
    signature: process.env.EMAIL_SIGNATURE,
    expiresIn: 60 * 60 * 24 * 7,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/verify-email/${token}`;
  const rf_link = `${req.protocol}://${req.headers.host}/auth/refresh-token/${rf_token}`;
  const html = `<h1>Verify your email</h1><a href="${link}">Click here to verify</a><br><br><a href="${rf_link}">Click here to refresh token</a>`;
  if (!sendEmail({ to: email, subject: "Verify your email", html })) {
    return next(new Error("Email sending failed", { cause: 400 }));
  }
  req.body.password = hash({ payload: req.body.password });

  const user = await userModel.create(req.body);
  return res.status(201).json({ msg: "created", user });
};
