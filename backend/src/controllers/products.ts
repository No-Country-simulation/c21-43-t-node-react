    import { NextFunction, Request, Response } from "express";
    import ProductService from "../services/products";
    import { productData } from "../types/type";

    class productController{
        static async getAllProducts(req:Request,res:Response,next:NextFunction){
            try {
                const Products = await ProductService.getAllProducts();
                res.status(200).json({data: Products})
            } catch (error) {
                throw error;
            }
        };

        static async deleteProduct(req:Request,res:Response,next:NextFunction){
            const {id} = req.params;
            try {
                const deleteProduct = await ProductService.deleteProduct(id)
                res.status(200).json({message: "Producto Eliminado",data:deleteProduct})
            } catch (error) {
                next(error)
            }
        };

        static async getProductByName(req:Request,res:Response,next:NextFunction){
            const {name} = req.query;
            console.log("Consulta de nombre:", name);
            if(typeof name === 'string'){
                try {
                    const searchProduct = await ProductService.getProductByName(name);
                    res.status(200).json({data:searchProduct})
                } catch (error) {
                    next(error)
                }
            }else{
                res.status(400).json({message:'El nombre del producto debe ser una cadena'})
            }
        };

        static async getProductId(req:Request,res:Response,next:NextFunction){
            const { id } = req.params; 
            try {   
                const Product = await ProductService.getProductId(id);
                res.status(200).json({data:Product})
            } catch (error) {
                next(error);
            }
        }


        static async createProduct(req:Request,res:Response,next:NextFunction){
            try {
                const Product = await ProductService.createProduct(req.body);
                res.status(201).json({message: "Producto creado", data:Product})
            } catch (error) {
                next(error)
            }
        };


        static async updateProduct(req: Request, res: Response, next: NextFunction) {
            const { id } = req.params;
            const data: Partial<productData> = req.body; 
            try {
              const updatedProduct = await ProductService.updateProduct(id, data);
              res.status(200).json({ message: "Producto actualizado", data: updatedProduct });
            } catch (error) {
              next(error);
            }
          };

    };


    export default productController;

