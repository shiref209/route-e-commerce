import mongoose, { Schema, Types, model } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name must be unique"],
      trim: true,
      lowercase: true,
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
      unique: [true, "slug must be unique"],
      trim: true,
      lowercase: true,
    },
    image: {
      type: Object,
    },
    userId: {
      type: Types.ObjectId,
      required: [false, "user-id is required"],
    },
    isDeleted: {
      type: Boolean,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
categoriesSchema.virtual("subCategory", {
  ref: "SubCategory",
  localField: "_id",
  foreignField: "categoryId",
});
const categoriesModel =
  mongoose.model.Category || model("Category", categoriesSchema);

export default categoriesModel;
