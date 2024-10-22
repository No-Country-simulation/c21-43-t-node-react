import CartService from "../services/cart";
import { Request,Response,NextFunction } from "express";


class CartController{
    static async createCart(req:Request, res:Response, next: NextFunction){
        try {
            const cart = await CartService.CreateCart(req.body);
            res.status(200).json({message:"Cart Creado",data:cart})
        } catch (error) {
            next(error);
        }
    };
};


export default CartController;