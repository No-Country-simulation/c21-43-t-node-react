import { NextFunction, Request, Response } from "express";
import StockService from "../services/stock";

class StockController {
  static async getAllStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const stocks = await StockService.getAllStocks();
      res.status(200).json({ data: stocks });
    } catch (error) {
      throw error;
    }
  }

  static async createStock(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await StockService.createStock(req.body);
      res.status(201).json({ data: stock });
    } catch (error) {
      throw error;
    }
  }

  static async updateStock(req: Request, res: Response, next: NextFunction) {
    try {
    const {id} = req.params
    const updatedStock = await StockService.findByIdAndUpdate(id, req.body);
      res.status(201).json({ data: updatedStock });
    } catch (error) {
      throw error;
    }
  }

  static async deleteStock(req: Request, res:Response, next: NextFunction){
    try{
        const {id} = req.params
        const deletedStock = await StockService.findByIdAndDelete(id);
        res.status(201).json({data:deletedStock});
    }catch(error){
        throw error;
    }
  }

  static async getStock(req: Request, res: Response, next: NextFunction){
    try {
      const {id} = req.params
      const stock = await StockService.getStock(id);
      res.status(201).json({data: stock});
      
    } catch (error) {
      throw error;
    }
  }

}


export default StockController;