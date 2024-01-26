import bcrypt from "bcryptjs";

export const hash = ({ payload, salt = process.env.SALT_ROUND } = {}) => {
  const hashResult = bcrypt.hashSync(payload, parseInt(salt));
  return hashResult;
};

export const compare = ({ payload, hashValue } = {}) => {
  const match = bcrypt.compareSync(payload, hashValue);
  return match;
};
