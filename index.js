import express from "express";
import path from "path";
import dotenv from "dotenv";
import initApp from "./src/index.router.js";

dotenv.config({ path: path.resolve("./src/config/.env") });
export const app = express();
initApp(app, express);
const server = app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
