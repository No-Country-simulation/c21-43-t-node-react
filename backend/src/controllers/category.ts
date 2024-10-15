import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/category";

class CategoryController {
  static async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json({ data: categories });
    } catch (error) {
      throw error;
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json({ data: category });
    } catch (error) {
      throw error;
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
    const {id} = req.params
    const updatedCategory = await CategoryService.findByIdAndUpdate(id, req.body);
      res.status(201).json({ data: updatedCategory });
    } catch (error) {
      throw error;
    }
  }

  static async deleteCategory(req: Request, res:Response, next: NextFunction){
    try{
        const {id} = req.params
        const deletedCategory = await CategoryService.findByIdAndDelete(id);
        res.status(201).json({data:deletedCategory});
    }catch(error){
        throw error;
    }
  }

  static async getCategory(req: Request, res: Response, next: NextFunction){
    try {
      const {id} = req.params
      const category = await CategoryService.getCategory(id);
      res.status(201).json({data: category});
      
    } catch (error) {
      throw error;
    }
  }

}


export default CategoryController;