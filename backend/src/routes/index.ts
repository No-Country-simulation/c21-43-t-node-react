import { Router } from "express";
import usersRouter from "./users";
import productsRouter from "./products";
import StockRouter from "./stock";
import CategoryRouter from "./category";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use('/products', productsRouter);
indexRouter.use('/stock', StockRouter)
indexRouter.use('/category', CategoryRouter)
export default indexRouter;
