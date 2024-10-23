import User from "../models/users";
import Cart from "../models/cart";
import { cartData } from "../types/type";
import CartDetail from "../models/cartDetail";
import Product from "../models/products";
import Category from "../models/categories";


class CartService{
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


    static async getCartDetail(data :cartData){
        try {
            const cartVerify = await Cart.findOne({
                where:{
                    UserId: data.id,
                    status: "Activo"
                }
            });
            if(!cartVerify){
                return {success:false, message:'El usuario no tiene un carrito activo' }
            }

            const cartDetail = await CartDetail.findAll({
                where:{
                    CartId: (cartVerify as any).id
                },
                attributes: {exclude: ['CartId', 'createdAt', 'updatedAt','id']}
            })

            const products = await Product.findAll({
                where:{
                    id: cartDetail.map((product) => (product as any).ProductId)
                },
                include:{
                    model: Category,
                    attributes:["id","name"],
                    through:{attributes:[]}
                }
            });

            const result = cartDetail.map(detail => {
                const productData = products.find(product => (product as any).id === (detail as any).ProductId); 
                return {
                    ...(productData ? productData.toJSON() : {}),
                    quantity: (detail as any).quantity 
                };
            });

            return { success: true, products: result };

        } catch (error) {
            
        }
    };
}


export default CartService;