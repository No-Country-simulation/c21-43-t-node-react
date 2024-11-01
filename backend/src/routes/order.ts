import { Router } from "express";
import OrderController from "../controllers/order";


const orderRouter = Router();

orderRouter.get("/",OrderController.getOrders);
//Buscar todas las ordenes del usuario.
orderRouter.get("/:cartId", OrderController.getOrderById);
orderRouter.post("/", OrderController.createOrder);


export default orderRouter;