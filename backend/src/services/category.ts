import { Category } from "../models";


class CategoryService {
    static async getAllCategories() {
      try {
        const category = await Category.findAll();
        return category;
      } catch (error) {
        throw error;
      }
    }
  
    static async getCategory(id: string){
      try {
        const category = await Category.findByPk(id);
        if(!category){
          return { message: "Category no encontrado"}
        }
        return category
      } catch (error) {
        throw error;
      } 
    }
  
    static async createCategory(data: any) {
      try {
        const category = await Category.create(data);
        return category;
      } catch (error) {
        throw error;
      }
    }
  
    
    static async findByIdAndUpdate(id: string, updateData: any) {
      try {
        const category = await Category.findByPk(id);
        if (!category) {
          throw new Error(`Category with id ${id} not found`);
        }
        await category.update(updateData);
        return category;
      } catch (error) {
        throw error;
      }
    }
  
    static async findByIdAndDelete(id: string) {
      try {
        const category = await Category.findByPk(id);
        if (!category) {
          throw new Error(`Category with id ${id} not found`);
        }
        await category.destroy();
        return category;
      } catch (error) {
        throw error; 
      }
    }
  }

  export default CategoryService