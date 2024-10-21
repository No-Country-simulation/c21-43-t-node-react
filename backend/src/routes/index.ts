import { Router } from "express";
import usersRouter from "./users";
import categoryRouter from "./category";
import productRouter from "./product";
import orderRouter from "./order";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/category", categoryRouter);
indexRouter.use("/products",productRouter);
indexRouter.use("/orders",orderRouter);

export default indexRouter;
