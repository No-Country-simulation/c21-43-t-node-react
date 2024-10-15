import { Router } from "express";
import StockController from "../controllers/stock";

const StockRouter = Router();

StockRouter.get('/', StockController.getAllStocks);
StockRouter.get('/getStock/:id', StockController.getStock)
StockRouter.post('/', StockController.createStock);
StockRouter.put('/update/:id', StockController.updateStock);
StockRouter.delete('/delete/:id', StockController.deleteStock);

export default StockRouter;