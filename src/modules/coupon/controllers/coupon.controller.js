import slugify from "slugify";
import couponModel from "../../../../DB/models/coupon.model.js";
import cloudinary from "../../../utils/cloudinary.js";

//1-get data
//2-check if name unique .. create name and slug
//3-check for image
export const addCoupon = async (req, res, next) => {
  const { name } = req.body;
  const isFound = await couponModel.findOne({ name });
  if (isFound) {
    return next(new Error("name already exists", { cause: 409 }));
  }
  req.body.slug = slugify(name);
  console.log(req.file);
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/coupon` }
  );
  if (!public_id) {
    return next(new Error("image not uploaded", { cause: 400 }));
  }

  req.body.image = { public_id, secure_url };
  const coupon = await couponModel.create(req.body);
  return res.status(200).json({ msg: "created successfully", coupon });
};
