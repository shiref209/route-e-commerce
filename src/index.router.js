import { connection } from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import brandRouter from "./modules/brand/brand.router.js";
import couponRouter from "./modules/coupon/coupon.router.js";
import categoryRouter from "./modules/post/category.router.js";
import subCategoryRouter from "./modules/subcategory/subcategory.router.js";
import globalErrorHandler from "./utils/gobalErrorHandler.js";

const initApp = (app, express) => {
  connection();
  app.use(express.json());
  app.use("/category", categoryRouter);
  app.use("/subcategory", subCategoryRouter);
  app.use("/brand", brandRouter);
  app.use("/coupon", couponRouter);
  app.use("/auth", authRouter);
  app.all("*", (req, res, next) => {
    res.send("Invalid routing");
  });
  app.use(globalErrorHandler);
};
export default initApp;
