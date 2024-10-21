import User from "./users";
import Cart from "./cart";
import Review from "./reviews";
import Product from "./products";
import CartDetail from "./cartDetail";
import Order from "./orders";
import Category from "./categories";

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);


Cart.belongsToMany(Product,{through:CartDetail}); //Un carrito puede tener muchos Productos
Product.belongsToMany(Cart,{through:CartDetail}); //Un producto puede estar en muchos carritos


Cart.hasMany(CartDetail);
CartDetail.belongsTo(Cart);


Order.hasOne(Cart);
Cart.belongsTo(Order);

Product.belongsToMany(Category,{through: "ProductCategory"});
Category.belongsToMany(Product,{through: "ProductCategory"});


export { User, Cart, Product, Review, Order, CartDetail, Category };
