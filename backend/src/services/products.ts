import Products from "../models/products";

class ProductsService {
  static async getAllProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProduct(id: string){
    try {
      const product = await Products.findByPk(id);
      if(!product){
        return { message: "Producto no encontrado"}
      }
      return product
    } catch (error) {
      throw error;
    } 
  }

  static async createProduct(data: any) {
    try {
      const products = await Products.create(data);
      return products;
    } catch (error) {
      throw error;
    }
  }

  
  static async findByIdAndUpdate(id: string, updateData: any) {
    try {
      const product = await Products.findByPk(id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      await product.update(updateData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async findByIdAndDelete(id: string) {
    try {
      const product = await Products.findByPk(id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      await product.destroy();
      return product;
    } catch (error) {
      throw error; 
    }
  }
}

export default ProductsService;