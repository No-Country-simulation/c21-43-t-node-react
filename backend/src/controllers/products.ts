import { NextFunction, Request, Response } from "express";
import ProductService from "../services/products";

class productController{
    static async getAllProducts(req:Request,res:Response,next:NextFunction){
        try {
            const Products = await ProductService.getAllProducts();
            res.status(200).json({data: Products})
        } catch (error) {
            throw error;
        }
    };


    static async createProduct(req:Request,res:Response,next:NextFunction){
        try {
            const Product = await ProductService.createProduct(req.body);
            res.status(201).json({message: "Producto creado", data:Product})
        } catch (error) {
            next(error)
        }
    };
};


export default productController;

