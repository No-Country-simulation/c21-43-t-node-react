import Order from "../models/orders";
import { orderData } from "../types/type";


class OrderService{
    static async getOrders(){
        try {
            const orders = await Order.findAll();
            return orders
        } catch (error) {
            throw new Error (`Error al encontrar ordenes: ${error}`)
        }
    };

    static async createOrder(data:orderData){
        try {
            const order = await Order.create({
                orderDate: data.orderDate,
                shippingAddress: data.shippingAddress,
                totalAmount:data.totalAmount,
            });
            return order;
        } catch (error) {
            throw new Error(`Error al crear la orden: ${error}`)
        }
    };
};



export default OrderService;