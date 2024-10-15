import { Router } from "express";
import CategoryController from "../controllers/category";

const CategoryRouter = Router();

CategoryRouter.get('/', CategoryController.getAllCategories);
CategoryRouter.get('/getCategory/:id', CategoryController.getCategory)
CategoryRouter.post('/', CategoryController.createCategory);
CategoryRouter.put('/update/:id', CategoryController.updateCategory);
CategoryRouter.delete('/delete/:id', CategoryController.deleteCategory);


export default CategoryRouter;