import Category from "../models/categories";
import Product from "../models/products";
import { productData } from "../types/type";
import { Op } from "sequelize";

class ProductService {
  static async getAllProducts() {
    try {
      const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProductByName(data:string){
    try {
      const product = await Product.findAndCountAll({
        where:{
          name:{
            [Op.iLike]: `%${data}%`
          }
        },
        include:[
          {model:Category,
            attributes:["id","name"],
            through:{attributes:[]}
          }
        ]
      });
      return product
    } catch (error) {
      throw new Error('Hubo un problema al buscar el producto.');
    }
  }

  static async getProductId(id: string) {
    try {
      const ProductId = await Product.findByPk(id, {
        include: {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });
      return ProductId;
    } catch (error) {
      throw error;
    }
  }

  static async createProduct(data: productData) {
    try {
      const existingProduct = await Product.findOne({
        where: {
          name: data.name,
        },
      });
  
      if (existingProduct) {
        throw new Error(`El producto con el nombre "${data.name}" ya existe.`);
      }

      
      const product = await Product.create({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        stock: data.stock,
      });

      

      await (product as any).addCategories(data.categoryId);
      return product;
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error}`);
    }
  }

  static async deleteProduct(id:string) {
    try {
        const product = await Product.findByPk(id);
        if(!product){
            throw new Error("El producto no existe")
        }

      const deleteProduct = await product.destroy();

      
      return deleteProduct
    } catch (error) {
      throw new Error(`Error al borrar el producto: ${error}`);
    }
  }

  static async updateProduct(id: string, data: Partial<productData>) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error("El producto no existe");
      }
      
      await product.update(data);

      if(data.categoryId){
        await (product as any).setCategories(data.categoryId);
      }

      const updatedProduct = await Product.findByPk(id,{
        include:{
          model: Category,
          attributes:["id","name"],
          through:{attributes:[]},
        }
      })

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error}`);
    }
  }

}

export default ProductService;
