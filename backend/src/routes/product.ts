import { Router } from "express";
import productController from "../controllers/products";

const productRouter = Router();

productRouter.get("/",productController.getAllProducts);
productRouter.get("/search", productController.getProductByName); 
productRouter.get('/byCategory', productController.getProductsByCategory);
productRouter.get('/byPriceRange', productController.getProductsByPriceRange);
productRouter.get("/:id",productController.getProductId);
productRouter.post("/",productController.createProduct);
productRouter.delete("/:id",productController.deleteProduct);
productRouter.put("/:id",productController.updateProduct);


export default productRouter;