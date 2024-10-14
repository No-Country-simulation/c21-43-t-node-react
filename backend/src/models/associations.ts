import User from "./users";
import Cart from "./cart";

User.hasOne(Cart);
Cart.belongsTo(User);
