import { Router } from "express";
import OrderController from "../controllers/order";


const orderRouter = Router();

orderRouter.get("/",OrderController.getOrders);
orderRouter.post("/", OrderController.createOrder);


export default orderRouter;