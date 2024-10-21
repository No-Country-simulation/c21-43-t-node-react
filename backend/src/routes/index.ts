import { Router } from "express";
import usersRouter from "./users";
import authRouter from "./auth";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/auth", authRouter);
// indexRouter.use('/products', productsRouter);
// indexRouter.use('/stock', StockRouter)
// indexRouter.use('/category', CategoryRouter)

export default indexRouter;
