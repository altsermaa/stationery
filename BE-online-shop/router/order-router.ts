import { Router } from "express";
import { createOrder } from "../controller/order/create-order";
import { getAllOrders } from "../controller/order/get-all-orders";
import { updateOrder } from "../controller/order/update-order";


export const OrderRouter = Router();

OrderRouter.post("/createOrder", createOrder);
OrderRouter.get("/getAllOrders", getAllOrders);
OrderRouter.put("/updateOrderStatus", updateOrder);

