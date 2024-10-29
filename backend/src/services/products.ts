import Category from "../models/categories";
import Product from "../models/products";
import { productData } from "../types/type";
import { Op } from "sequelize";

class ProductService {
  static async getAllProducts(page: number = 1, limit: number = 5) {
    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await Product.findAndCountAll({
            limit: limit,
            offset: offset,
            include: {
                model: Category,
                attributes: ["id", "name"],
                through: { attributes: [] },
            },
        });

        return {
            products: rows,
            currentPage: page,
            totalProducts: count, 
            totalPages: Math.ceil(count / limit),
        };
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

  static async getProductsByCategory(categoryId: string) {
    try {
        const products = await Product.findAll({
             include: [
                {
                    model: Category,
                    where: { id: categoryId }, 
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                },
            ],
        });
        return products;
    } catch (error) {
        throw error;
    }
  }

static async getProductsByPriceRange(minPrice: number, maxPrice: number) {
    try {
        const products = await Product.findAll({
            where: {
                price: {
                    [Op.between]: [minPrice, maxPrice]
                }
            }
        });
        return products;
    } catch (error) {
        throw error; 
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
