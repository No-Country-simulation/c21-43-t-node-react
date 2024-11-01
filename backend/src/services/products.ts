import Category from "../models/categories";
import Product from "../models/products";
import { productData } from "../types/type";
import { Op } from "sequelize";
import { validateUpdateProduct, validateProduct } from "../schemas/products";

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

  static async getProductByName(data: string) {
    try {
      const product = await Product.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${data}%`,
          },
        },
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
      });
      return product;
    } catch (error) {
      throw new Error("Hubo un problema al buscar el producto.");
    }
  }

  static async getProductsByCategory(categoryId: string) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            where: { id: categoryId },
            attributes: ["id", "name"],
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
            [Op.between]: [minPrice, maxPrice],
          },
        },
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
      const validationResult = validateProduct(data);

      if (!validationResult.success) {
        // Si la validación falla, arroja un error con los mensajes de validación
        const errorMessages = validationResult.error.errors
          .map((err) => err.message)
          .join(". ");
        const error: any = new Error(
          `Datos de creación de producto inválidos: ${errorMessages}`
        );
        error["statusCode"] = 400;
        throw error;
      }

      // Obtener los datos validados
      const validData = validationResult.data;

      const existingProduct = await Product.findOne({
        where: {
          name: validData.name,
        },
      });
  
      if (existingProduct) {
        throw new Error(`El producto con el nombre "${validData.name}" ya existe.`);
      }

      
      const product = await Product.create({
        name: validData.name,
        description: validData.description,
        price: validData.price,
        image: validData.image,
        stock: validData.stock,
      });
      await (product as any).addCategories(data.categoryId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(id: string) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error("El producto no existe");
      }

      const deleteProduct = await product.destroy();

      return deleteProduct;
    } catch (error) {
      throw new Error(`Error al borrar el producto: ${error}`);
    }
  }

  static async updateProduct(id: string, data: Partial<productData>) {
    try {
      const validationResult = validateUpdateProduct(data);

      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors
          .map((err) => err.message)
          .join(". ");
        const error: any = new Error(
          `Datos de actualización inválidos: ${errorMessages}`
        );
        error["statusCode"] = 400;
        throw error;
      }

      const validData = validationResult.data;

      const product = await Product.findByPk(id);
      if (!product) {
        const error: any = new Error("El producto no existe");
        error["statusCode"] = 404;
        throw error;
      }

      await product.update(validData);

      if (data.categoryId) {
        await (product as any).setCategories(data.categoryId);
      }

      const updatedProduct = await Product.findByPk(id, {
        include: {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
