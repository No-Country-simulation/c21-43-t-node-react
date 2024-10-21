import { Router } from "express";
import productController from "../controllers/products";

const productRouter = Router();

productRouter.get("/",productController.getAllProducts);
productRouter.post("/",productController.createProduct);


export default productRouter;