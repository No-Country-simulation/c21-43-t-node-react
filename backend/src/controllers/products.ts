import { NextFunction, Request, Response } from "express";
import ProductsService from "../services/products";

class ProductsController {
  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await ProductsService.getAllProducts();
      res.status(200).json({ data: users });
    } catch (error) {
      throw error;
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductsService.createProduct(req.body);
      res.status(201).json({ data: products });
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
    const {id} = req.params
    const updatedproducts = await ProductsService.findByIdAndUpdate(id, req.body);
      res.status(201).json({ data: updatedproducts });
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(req: Request, res:Response, next: NextFunction){
    try{
        const {id} = req.params
        const deletedProduct = await ProductsService.findByIdAndDelete(id);
        res.status(201).json({data:deletedProduct});
    }catch(error){
        throw error;
    }
  }

  static async getProduct(req: Request, res: Response, next: NextFunction){
    try {
      const {id} = req.params
      const user = await ProductsService.getProduct(id);
      res.status(201).json({data: user});
      
    } catch (error) {
      throw error;
    }
  }

}


export default ProductsController;