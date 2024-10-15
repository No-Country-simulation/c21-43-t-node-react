import { Router } from "express";
import ProductsController from "../controllers/products";

const productsRouter = Router();

productsRouter.get('/', ProductsController.getAllProducts);
productsRouter.get('/getProduct/:id', ProductsController.getProduct)
productsRouter.post('/', ProductsController.createProduct);
productsRouter.put('/update/:id', ProductsController.updateProduct);
productsRouter.delete('/delete/:id', ProductsController.deleteProduct);

export default productsRouter;