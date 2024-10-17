import Category from "../models/categories";
import Product from "../models/products";
import { productData } from "../type";


class ProductService {
    static async getAllProducts(){
        try {
            const products = await Product.findAll({
                include:{
                    model: Category,
                    attributes:["id","name"]
                }
            })
            return products;
        } catch (error) {
            throw error;
        }
    }


    static async createProduct(data:productData){
        try {
            const category = await Category.findByPk(data.categoryId);
            if(!category){
                throw new Error ("No existe la categoría")
            }

            const product = await Product.create({
                name: data.name,
                description: data.description,
                price: data.price,
                image: data.image,
                stock: data.stock,
                CategoryId:data.categoryId,
            });
            return product
        } catch (error) {
            throw new Error (`Error al crear el producto: ${error}`)
        }
    }

    //Falta el delete y el put
};


export default ProductService;