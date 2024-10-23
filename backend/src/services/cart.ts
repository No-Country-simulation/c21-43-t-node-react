import User from "../models/users";
import Cart from "../models/cart";
import { cartData } from "../types/type";
import CartDetail from "../models/cartDetail";


class CartService{
    
    static async getProductsActiveCart(){};


    static async CreateCart(data:cartData){
        try {
            const userExist = await User.findByPk(data.userId)
            if(userExist === null){
                return {message: 'Usuario no registrado'}
            }else{
                const activeCart = await Cart.findOne({
                    where:{
                        UserId: data.userId,
                        status: 'Activo',
                    }
                });

                if(activeCart){
                    return {success:true,message:'Carrito activo encontrado.', cart: activeCart}
                }

                const newCart = await Cart.create({
                    UserId: data.userId,
                    status: 'Activo',
                });
                return { success: true, message: 'Nuevo carrito activo creado.', cart: newCart };
            }
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error}`);
        }
    } 
}


export default CartService;