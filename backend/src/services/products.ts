import Category from "../models/categories";
import Product from "../models/products";
import { productData } from "../types/type";


class ProductService {
    static async getAllProducts(){
        try {
            const products = await Product.findAll({
                include:{
                    model: Category,
                    attributes:["id","name"],
                    through:{attributes:[]}
                }
            })
            return products;
        } catch (error) {
            throw error;
        }
    }


    static async getProductId(id:string){
        try {
            const ProductId = await Product.findByPk(id,{
                include:{
                    model:Category,
                    attributes:["id","name"],
                    through:{attributes:[]}
                }
            })
            return ProductId
        } catch (error) {
            throw error;
        }

    };

    static async createProduct(data:productData){
        try {
            
            const product = await Product.create({
                name: data.name,
                description: data.description,
                price: data.price,
                image: data.image,
                stock: data.stock,
            });
            await (product as any).addCategories(data.categoryId) 
            return product
        } catch (error) {
            throw new Error (`Error al crear el producto: ${error}`)
        }
    }



    //FALTA EL DELETE Y EL PUT
};


export default ProductService;