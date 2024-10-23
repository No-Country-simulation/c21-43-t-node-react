import { Router } from "express";
import CartController from "../controllers/cart";


const cartRouter = Router();

// cartRouter.get("/",CartController.)
cartRouter.post("/",CartController.createCart);



export default cartRouter;