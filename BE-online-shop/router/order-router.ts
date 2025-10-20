import { Router } from "express";
import { createOrder } from "../controller/order/create-order";
import { getAllOrders } from "../controller/order/get-all-orders";
import { updateOrder } from "../controller/order/update-order";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";

export const OrderRouter = Router();

// Protected order routes
OrderRouter.post("/createOrder", verifyToken, createOrder);
OrderRouter.get("/getAllOrders", verifyToken, isAdmin, getAllOrders);
OrderRouter.put("/updateOrderStatus", verifyToken, isAdmin, updateOrder);

