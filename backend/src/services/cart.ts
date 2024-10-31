import User from "../models/users";
import Cart from "../models/cart";
import { cartData } from "../types/type";
import CartDetail from "../models/cartDetail";
import Product from "../models/products";
import Category from "../models/categories";


class CartService{
    static async addToCart(data:cartData,productId:string,quantity: number ){
        try {
            const userCart = await Cart.findOne({
                where:{
                    UserId:data.userId,
                    status:"Activo"
                }
            })
            console.log("Adding product to cart: ", userCart);
            if(!userCart){
                return {
                    success:false,
                    message:"El usuario no tiene un carrito activo"
                }
            }
            const verifyCartDetail = await CartDetail.findOne({
                where:{
                    CartId: (userCart as any).id,
                    ProductId: productId
                }
            });
            //Si el producto ya existe en el carrito, actualizo la cantidad
            if(verifyCartDetail){
                await verifyCartDetail.update({quantity});
            }else{
                await CartDetail.create({
                    CartId:(userCart as any).id,
                    ProductId:productId,
                    quantity,
                })
            }
            return {
                success: true,
                message: "Producto agregado al carrito correctamente."
            };
        } catch (error) {
            throw new Error(`Error al agregar producto al carrito ${error}`)
        }
    };



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


    static async getCartDetail(userId:string){
        try {
            const cartVerify = await Cart.findOne({
                where:{
                    UserId: userId,
                    status: "Activo"
                }
            });
            if(!cartVerify){
                return {success:false, message:'El usuario no tiene un carrito activo' }
            }

            //cartDetail va a ser la lista con todos los detalles de productos en el carrito.
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
            throw new Error(`Error al obtener los detalles del carrito ${error}`)
            
        }
    };

    static async deleteProductToCart(userId:string, productId:string){
        try {
            const userCart = await Cart.findOne({
                where:{
                    UserId: userId,
                    status:"Activo"
                }
            });
            if(!userCart){
                    return {success:false, message:'El usuario no tiene un carrito activo.'}
            }
            const cartDetail = await CartDetail.findOne({
                where:{
                    CartId: (userCart as any).id,
                    ProductId:productId,
                }
            });
            if(!cartDetail){
                return{success:false,message:'No se encontrÃ³ el detalle del carrito para el producto especificado'}
            }

            await cartDetail.destroy();
            return{success: true, message: 'Producto eliminado del carrito correctamente.'}
        } catch (error) {
            throw new Error(`Error al eliminar el producto del carrito ${error}`)
        }
    };
}


export default CartService;
