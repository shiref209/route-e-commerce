import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exists"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    status: {
      type: String,
      default: "offline",
      enum: ["online", "offline"],
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    image: String,
    DOB: String,
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userSchema);

export default userModel;
