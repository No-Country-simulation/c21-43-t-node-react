import Cart from "../models/cart";
import Order from "../models/orders";
import CartDetail from "../models/cartDetail";
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

    //A este servicio lo van a utilizar 2 controladores: getOrdersByIdUser y getOrdersAdminById.
    static async getOrdersById(id:string){
        try {
            const orders = await Order.findAll({
                include:[{
                    model: Cart,
                    where: { UserId: id }, // Filtra las órdenes que pertenecen al usuario
                    include: [{
                        model: CartDetail, // Incluye los detalles del carrito (productos en el carrito)
                    }]
                }]
            });

            if (!orders || orders.length === 0) {
                throw new Error(`No se encontraron órdenes para el usuario con ID: ${id}`);
            }

            return orders;
        } catch (error) {
            throw new Error(`Error al obtener las órdenes: ${error}`);

        }
    }; 
};



export default OrderService;