import { Router } from "express";
import usersRouter from "./users";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);

export default indexRouter;
