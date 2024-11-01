import { NextFunction, Request, Response } from "express";
import OrderService from "../services/order";



//Falta la de obtener la orden por el Id del usuario delete y update.
class OrderController {
    static async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await OrderService.getOrders();
            res.status(200).json({ orders })
        } catch (error) {
            next(error)
        }
    }


    static async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const order = await OrderService.createOrder(req.body);
            res.status(200).json({
                message: "Orden creada con éxito",
                order: order,
            })
        } catch (error) {
            next(error)
        }
    };

    static async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const { cartId } = req.params;
            const order = await OrderService.getOrderById(cartId);
            res.status(200).json({ order });
        } catch (error) {
            next(error);
        }
    }
}



export default OrderController;