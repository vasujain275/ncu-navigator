import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import CookieParser from "cookie-parser";

require("dotenv").config();
const PORT = process.env.PORT || 3000;

import { userRouter } from "./routes/user";
import { adminRouter } from "./routes/admin";

require("dotenv").config();
const mongoUrl: string = process.env.MONGO_URL;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(CookieParser());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

mongoose.connect(mongoUrl);

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
