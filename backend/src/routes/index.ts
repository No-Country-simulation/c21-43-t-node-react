import { Router } from "express";
import usersRouter from "./users";
import categoryRouter from "./category";
import productRouter from "./product";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/category", categoryRouter);
indexRouter.use("/products",productRouter)


export default indexRouter;
