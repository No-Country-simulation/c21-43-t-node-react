import { Router } from "express";
import { createOrderPaymentController, receiveWebhookPaymentController} from "../controllers/mercadoPago";


const mercadopagoRouter = Router();

mercadopagoRouter.post("/create-order",createOrderPaymentController);
mercadopagoRouter.post("/webhook",receiveWebhookPaymentController);



mercadopagoRouter.get("/success",(req,res)=>{
    res.send("Orden creada con exito");
});
mercadopagoRouter.get("/failure",(req,res)=>{
    res.send("Fallo en el pago")    
});
mercadopagoRouter.get("/pending",(req,res)=>{
    res.send("Pago pendiente")
});




export default mercadopagoRouter;