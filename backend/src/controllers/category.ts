import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/category";


class CategoryController{
    static async getAllCategory(req:Request, res:Response, next: NextFunction){
        try {
            const categories = await CategoryService.getAllCategory();
            res.status(200).json({data: categories})
        } catch (error) {
            throw error; 
        }
    }


    static async createCategory(req:Request, res: Response, next: NextFunction){
        try {
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json({message: "Categoría creada", data:category})
        } catch (error) {
            next(error)
        }
    }


    static async deleteCategory(req: Request, res:Response, next: NextFunction){
        try{
            const {id} = req.params;
            const deletedCategory = await CategoryService.categoryDelete(id);
            res.status(201).json({data:deletedCategory});
        }catch(error){
            throw error;
        }
      }


    

    
}


export default CategoryController;
