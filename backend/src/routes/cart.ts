import { Router } from "express";
import CartController from "../controllers/cart";


const cartRouter = Router();

//Para utilizar los detalles del carrito, tengo que pasarle a la url el id del usuario.
cartRouter.get("/cartDetail/:userId",CartController.getCartDetail);
cartRouter.post("/create",CartController.createCart);
cartRouter.put("/addToCart", CartController.addToCart);
cartRouter.delete("/delete/:userId/:productId",CartController.deleteProductToCart);


export default cartRouter;