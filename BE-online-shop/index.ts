import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ProductsRouter } from "./router/product-router";
import { OrderRouter } from "./router/order-router";
import carouselRouter from "./router/carousel-router";
import { SubCategoryRouter } from "./router/subcategory-router";
import { HolidayRouter } from "./router/holiday-router";
import userRouter from "./router/user-router";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || ""
    );
  } catch (error) {
    console.log(error);
  }
};

databaseConnect();

app.use(ProductsRouter);
app.use(OrderRouter);
app.use(carouselRouter);
app.use(SubCategoryRouter);
app.use(HolidayRouter);
app.use(userRouter);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});