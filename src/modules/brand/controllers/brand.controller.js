import slugify from "slugify";
import brandModel from "../../../../DB/models/brand.model.js";
import cloudinary from "../../../utils/cloudinary.js";

export const addBrand = async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  //2.
  if (await brandModel.findOne({ name })) {
    return next(new Error("name must be unique", { cause: 409 }));
  }
  //3.
  const slug = slugify(name);
  //4.
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/brand` }
  );
  if (!public_id) {
    return next(new Error("image not uploaded", { cause: 400 }));
  }
  const newBrand = await brandModel.create({
    name,
    slug,
    image: { public_id, secure_url },
  });
  return res.status(201).json({ message: "done", brand: newBrand });
};

export const allBrands = async (req, res, next) => {
  const brands = await brandModel.find();
  return res.status(200).json({ message: "done", brands });
};

export const oneBrand = async (req, res, next) => {
  const brand = await brandModel.findById({
    _id: req.params.brandId,
  });
  return res.status(200).json({ message: "done", brand });
};

export const updateBrand = async (req, res, next) => {
  const { brandId } = req.params;
  const brand = await brandModel.findById({ _id: brandId });
  //1
  if (!brand) {
    return next(new Error("brand not found", { cause: 404 }));
  }

  if (req.body.name) {
    //2
    if (await brandModel.findOne({ name: req.body.name })) {
      return next(new Error("name must be unique", { cause: 409 }));
    }
    req.body.slug = slugify(req.body.name);
  }

  if (req.file) {
    //3
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/brand` }
    );
    if (!public_id) {
      return next(new Error("image not uploaded", { cause: 400 }));
    }
    req.body.image = { public_id, secure_url };

    await cloudinary.uploader.destroy(brand.image.public_id);
  }

  //4
  const updatedbrand = await brandModel.findOneAndUpdate(
    { _id: brandId },
    req.body,
    { new: true }
  );
  return res.status(201).json({ message: "done", brand: updatedbrand });
};
