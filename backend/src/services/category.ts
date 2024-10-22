import Category from "../models/categories";
import { categoryData } from "../types/type";



class CategoryService {
    static async getAllCategory(){
        try {
            const categories = await Category.findAll();
            return categories
        } catch (error:any) {
            throw new Error (`Error al obtener las categorías: ${error.message}`);
        }
    }

    static async createCategory(data: categoryData){
        try {

            const verifyCategory = await Category.findOne({
                where:{
                    name: data.name
                }
            
            });

            if (verifyCategory){
                throw new Error("Categoría existente")
            }

            const category = await Category.create({name:data.name});

            return category
        } catch (error:any) {
           throw new Error(`Error al crear la categoría: ${error.message}`
        )}
    }

    static async categoryUpdate(data:categoryData){
        try {
            const category = await Category.findByPk(data.id);
            if(!category){
                throw new Error(`Category with id ${data.id} not found`)
            }
            await category.update(data);
            return category;
        } catch (error) {
            throw error
        }
    };


    static async categoryDelete(id:string) {
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


export default CategoryService;