import { Router } from "express";
import CategoryController from "../controllers/category";

const categoryRouter = Router();


categoryRouter.get("/",CategoryController.getAllCategory);
categoryRouter.post("/",CategoryController.createCategory);


export default categoryRouter;