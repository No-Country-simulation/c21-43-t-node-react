import { Router } from "express";
import UsersController from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);
usersRouter.post("/", UsersController.create);
usersRouter.patch("/:id", UsersController.update);
usersRouter.delete("/:id", UsersController.delete);

export default usersRouter;
