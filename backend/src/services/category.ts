import Category from "../models/categories";
import { categoryData } from "../type";



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
            const category = await Category.create({name:data.name});
            return category
        } catch (error) {
            
        }
    }

}


export default CategoryService;