import mongoose from "mongoose";
export const connection = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/e-commerce")
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log("error connection to db", error);
    });
};
