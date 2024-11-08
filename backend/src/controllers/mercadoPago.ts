import { NextFunction, Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { Cart, Order, CartDetail, Product} from "../models/associations";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const { ACCESS_TOKEN, URL_FRONT, URL_BACK } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN as string,
  options: { timeout: 5000}
});

//Hardcodeo el shippingAddres para probar
let address = "Calle Principal 123";
export const createOrderPaymentController = async (req:Request, res:Response, next: NextFunction) =>{
    const {cartId, products} = req.body;
    console.log(products);
    try {
        const body = {
            items: products.map((product:any) => ({
                id: product.id,
                title: product.name,     
                quantity:product.quantity,            
                unit_price:Number(product.price), 
                currency_id: "ARS",
            })),
            binary_mode:true, //Los pagos pueden ser aprobados o rechazados.
            back_urls:{
              success: `${URL_FRONT}/mercado-pago/success`, //DEPLOY PAGINA PRINCIPAL
              failure: `${URL_FRONT}/mercado-pago/failure`,//DEPLOY vista "Fallo en la compra"
              pending: `${URL_BACK}/mercado-pago/pending`
            },
            external_reference: cartId,
            auto_return: "approved", //Si se aprueba el pago, redirreciona al success automaticamente
            notification_url:`${URL_BACK}/mercadoPago/webhook`,// ACA VA IR EL DEPLOY
        }

        const preference = new Preference(client);
        const result = await preference.create({body});
        res.status(200).json(result.init_point);
    } catch (error) {
        console.log(error);
        next(error)
    }
};

export const receiveWebhookPaymentController = async (req: Request, res: Response, next: NextFunction) => {
    const { id, topic} = req.query;
    try {
        if (topic === 'payment') {
            const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });

            const paymentData = paymentResponse.data;
           
            if (paymentData.status === "approved") {
                const totalAmount = paymentData.transaction_amount;
                const cartId = paymentData.external_reference;
                
                // Creo la orden en la base de datos
             const order = await Order.create({
                    orderDate: new Date(),
                    shippingAddress: address,
                    totalAmount: totalAmount,
                    CartId: cartId
                });

            // Actualizo el stock del producto que voy a comprar en la base de datos
              const cartDetails = await CartDetail.findAll({ where: { CartId: cartId } });

            for (const cartDetail of cartDetails) {
                    const product = await Product.findByPk(cartDetail.ProductId);
                    if (product) {
                    product.stock -= cartDetail.quantity;
                       await product.save();
                    }
             }

            //Cambio el estado del carrito a "Inactivo", luego de que se haya actualizado el stock de los productos en la base de datos
               await Promise.all(cartDetails);
              if(cartId){
                    Cart.update(
                        { status: "Inactivo" },
                        { where: { id: cartId } }
                    );
                }
                console.log({message:"Order created and inventory updated successfully.", 
                    Order:order});
            }
        }

        res.status(204).send("Notification received");
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).send("Error processing notification");
    }
};
