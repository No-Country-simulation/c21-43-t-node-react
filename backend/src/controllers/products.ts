    import { NextFunction, Request, Response } from "express";
    import ProductService from "../services/products";
    import { productData } from "../types/type";

    class productController{
        static async getAllProducts(req: Request, res: Response, next: NextFunction) {
            const page = parseInt(req.query.page as string) || 1; 
            const limit = parseInt(req.query.limit as string) || 10; 
            try {
              const products = await ProductService.getAllProducts(page, limit); 
              res.status(200).json(products);
            } catch (error) {
              next(error);
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

        static async getProductsByPriceRange(req: Request, res: Response, next: NextFunction) {
            const { minPrice, maxPrice } = req.query;

            console.log(minPrice, maxPrice);
            try {
                const productPrice = await ProductService.getProductsByPriceRange(minPrice as any, maxPrice as any);
                res.status(200).json({ data: productPrice });
            } catch (error) {
                next(error);
            }
        }
    
        static async getProductsByCategory(req: Request, res: Response, next: NextFunction) {
            const { categoryId } = req.query;
            try {
                const productsCategory = await ProductService.getProductsByCategory(String(categoryId));
                res.status(200).json({ data: productsCategory });
            } catch (error) {
                next(error);
            }
        }


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

