import { NextFunction, Request, Response } from "express";
import UsersService from "../services/users";

class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UsersService.getAll();
      res.status(200).json({data: users });
    } catch (error) {
      throw error;
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UsersService.create(req.body);
        res.status(201).json({message: "Usuario creado", data: user });
    } catch (error) {
        next(error);
    }
}
}

export default UsersController;
