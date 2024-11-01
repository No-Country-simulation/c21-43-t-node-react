import Cart from "../models/cart";
import Order from "../models/orders";
import CartDetail from "../models/cartDetail";
import { orderData } from "../types/type";
import Product from "../models/products";


class OrderService {
    static async getOrders() {
        try {
            const orders = await Order.findAll();
            return orders
        } catch (error) {
            throw new Error(`Error al encontrar ordenes: ${error}`)
        }
    };

    static async createOrder(data: orderData) {
        try {
            const order = await Order.create({
                orderDate: data.orderDate,
                shippingAddress: data.shippingAddress,
                totalAmount: data.totalAmount,
            });
            return order;
        } catch (error) {
            throw new Error(`Error al crear la orden: ${error}`)
        }
    };

    static async getOrderById(cartId: string) {
        try {
            const order = await Order.findOne({
                where: { CartId: cartId },
                include: [
                    {
                        model: Cart,
                        attributes: ["id"],
                        include: [
                            {
                                model: CartDetail,
                                attributes: {
                                    exclude: ["createdAt", "deletedAt", "CartId", "ProductId", "updatedAt"]
                                },
                                include: [
                                    {
                                        model: Product,
                                        attributes: ['id', 'name', 'price'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            if (!order) {
                throw new Error(`No se encontró la orden con ID: ${cartId}`);
            }

            return order;
        } catch (error) {
            throw error;
        }
    }
};



export default OrderService;