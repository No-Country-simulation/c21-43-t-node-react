import { Router } from "express";
import usersRouter from "./users";
import categoryRouter from "./category";
import productRouter from "./product";
import orderRouter from "./order";
import cartRouter from "./cart";
import authRouter from "./auth";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/category", categoryRouter);
indexRouter.use("/products", productRouter);
indexRouter.use("/orders", orderRouter);
indexRouter.use("/cart", cartRouter);

export default indexRouter;
