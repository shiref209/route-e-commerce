import slugify from "slugify";
import categoriesModel from "../../../../DB/models/category.model.js";
import subCategoryModel from "../../../../DB/models/subCategory.model.js";
import cloudinary from "../../../utils/cloudinary.js";

//1-find category
//2-find if name of subcateegory exist
//3-upload image
//4-make slug of name
//5-add subcategory
export const createSubCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  console.log(categoryId);
};
