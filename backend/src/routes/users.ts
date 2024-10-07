import { Router } from "express";
import UsersController from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);
usersRouter.post("/", UsersController.create);

export default usersRouter;
