import { Stock } from "../models";

class StockService {
    static async getAllStocks() {
      try {
        const stock = await Stock.findAll();
        return stock;
      } catch (error) {
        throw error;
      }
    }
  
    static async getStock(id: string){
      try {
        const stock = await Stock.findByPk(id);
        if(!stock){
          return { message: "Stock no encontrado"}
        }
        return stock
      } catch (error) {
        throw error;
      } 
    }
  
    static async createStock(data: any) {
      try {
        const stock = await Stock.create(data);
        return stock;
      } catch (error) {
        throw error;
      }
    }
  
    
    static async findByIdAndUpdate(id: string, updateData: any) {
      try {
        const stock = await Stock.findByPk(id);
        if (!stock) {
          throw new Error(`Stock with id ${id} not found`);
        }
        await stock.update(updateData);
        return stock;
      } catch (error) {
        throw error;
      }
    }
  
    static async findByIdAndDelete(id: string) {
      try {
        const stock = await Stock.findByPk(id);
        if (!stock) {
          throw new Error(`Stock with id ${id} not found`);
        }
        await stock.destroy();
        return stock;
      } catch (error) {
        throw error; 
      }
    }
  }

  export default StockService