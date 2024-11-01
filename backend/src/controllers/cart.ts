import CartService from "../services/cart";
import { Request,Response,NextFunction } from "express";
import { cartData } from "../types/type";


class CartController{
    static async createCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.body; // Asegúrate de que el cuerpo de la solicitud incluye userId
            const cart = await CartService.CreateCart(userId);
            res.status(200).json({ message: "Cart Creado", data: cart });
        } catch (error) {
            next(error);
        }
    }

    static async getCartDetail(req:Request, res:Response, next: NextFunction){
        try {
            const {userId} = req.params;
            const result = await CartService.getCartDetail(userId);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    };

    static async addToCart(req:Request, res:Response, next: NextFunction){
        try {
            const {userId,productId,quantity} = req.body;
            console.log("addToCart body",req.body);

            const data: cartData = {
                userId: userId,
                status: "Activo"
            };
            const result = await CartService.addToCart(data, productId, quantity);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    };

    static async deleteProductToCart(req:Request, res:Response, next: NextFunction){
        try {
            const {userId,productId} = req.params;
            const deleteProduct = await CartService.deleteProductToCart(userId,productId);
            res.status(200).json(deleteProduct)
        } catch (error) {
            next(error)
        }
    };
};


export default CartController;