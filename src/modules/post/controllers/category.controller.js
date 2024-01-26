import slugify from "slugify";
import categoriesModel from "../../../../DB/models/category.model.js";
import cloudinary from "../../../utils/cloudinary.js";
// 1- check if user is exist
// 2-check if name is unique
// 3- create slug
// 4- upload image
// 5-add category
export const addCategory = async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  //2.
  if (await categoriesModel.findOne({ name })) {
    return next(new Error("name must be unique", { cause: 409 }));
  }
  //3.
  const slug = slugify(name);
  //4.
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/category` }
  );
  if (!public_id) {
    return next(new Error("image not uploaded", { cause: 400 }));
  }
  const newCategory = await categoriesModel.create({
    name,
    slug,
    image: { public_id, secure_url },
  });
  return res.status(201).json({ message: "done", category: newCategory });
};

export const allCategories = async (req, res, next) => {
  const categories = await categoriesModel.find().populate([
    {
      path: "subCategory",
    },
  ]);
  return res.status(200).json({ message: "done", categories });
};

export const oneCategory = async (req, res, next) => {
  const category = await categoriesModel.findById({
    _id: req.params.categoryId,
  });
  return res.status(200).json({ message: "done", category });
};

//1- check if category is exist
//2-check if name is updated>>check for uniqueness and update slug
//3-if update image>>upload new image and delete old one
//4-update category
export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoriesModel.findById({ _id: categoryId });
  console.log(category);
  //1
  if (!category) {
    return next(new Error("category not found", { cause: 404 }));
  }

  if (req.body.name) {
    //2
    if (await categoriesModel.findOne({ name: req.body.name })) {
      return next(new Error("name must be unique", { cause: 409 }));
    }
    req.body.slug = slugify(req.body.name);
  }

  if (req.file) {
    //3
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/category` }
    );
    if (!public_id) {
      return next(new Error("image not uploaded", { cause: 400 }));
    }
    req.body.image = { public_id, secure_url };

    await cloudinary.uploader.destroy(category.image.public_id);
  }

  //4
  const updatedCategory = await categoriesModel.findOneAndUpdate(
    { _id: categoryId },
    req.body,
    { new: true }
  );
  return res.status(201).json({ message: "done", category: updatedCategory });
};
